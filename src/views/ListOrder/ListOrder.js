import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Spinner,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import FIREBASE from "../../config/FIREBASE";
import { numberWithCommas } from "utils";
const ListOrder = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorOrders, setErrorOrders] = useState("fgddcd");
  useEffect(() => {
    // props.getListLiga();
    getAllOrder();
  }, []);
  const getAllOrder = () => {
    setLoading(true);
    FIREBASE.database()
      .ref("histories")
      .once("value", (querySnapShot) => {
        setErrorOrders("");
        let value = querySnapShot.val() ? querySnapShot.val() : null;
        if (!value) value = [];
        else {
          value = Object.keys(value).map((e) => {
            value[e].orders = Object.keys(value[e].orders).map((e2) => ({
              ...value[e].orders[e2],
              uid: e2,
            }));
            return {
              ...value[e],
              uid: e,
              loading: false,
            };
          });
        }
        console.log(value);
        // console.log(value, "<<< value ligas");
        // dispatchSuccess(dispatch, GET_LIST_LIGA, value);
        setOrders(value);
      })
      .catch((err) => {
        console.log("Error: ", JSON.stringify(err));
        // dispatchError(dispatch, GET_LIST_LIGA, JSON.stringify(err), []);
        setErrorOrders(JSON.stringify(err));
      })
      .finally((_) => {
        setLoading(false);
      });
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">List Liga</CardTitle>
              <button
                disabled={loading}
                onClick={() => getAllOrder()}
                className="btn btn-primary float-right"
              >
                <i className="nc-icon nc-refresh-69 mr-1"></i>Reload
              </button>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <th>Tanggal & Order ID</th>
                  <th>Pesanan</th>
                  <th>Status</th>
                  <th>Total Harga</th>
                  <th>Aksi</th>
                </thead>
                <tbody>
                  {orders.length != 0 ? (
                    orders.map((e) => (
                      <tr key={e.uid}>
                        <td>
                          <p>{e.date}</p>
                          <p>({e.order_id})</p>
                        </td>
                        <td>
                          {e.orders.map((e2) => (
                            <Row key={e2.uid}>
                              <Col md={2}>
                                <img
                                  src={e2.product.image[0]}
                                  width="200"
                                  alt={e2.product.name}
                                />
                              </Col>

                              <Col md={5}>
                                <p>{e2.product.name}</p>
                                <p>Rp. {numberWithCommas(e2.product.price)}</p>
                              </Col>

                              <Col md={5}>
                                <p>Pesan : {e2.total_order}</p>
                                <p>
                                  Total Harga : Rp.{" "}
                                  {numberWithCommas(e2.total_price)}
                                </p>
                              </Col>
                            </Row>
                          ))}
                        </td>
                        <td>{e.status}</td>
                        <td>
                          <p>
                            Total Harga: Rp.{numberWithCommas(+e.total_price)}
                          </p>
                          <p>Ongkir: Rp.{numberWithCommas(+e.shipping_cost)}</p>
                          <p>
                            <b>
                              Total: Rp.
                              {numberWithCommas(
                                +e.shipping_cost + +e.total_price
                              )}
                            </b>
                          </p>
                        </td>
                        <td>
                          {e.status === "pending" && (
                            <a
                              href={e.url}
                              target="_blank"
                              className="btn btn-primary"
                              disabled={loading}
                            >
                              <i className="nc-icon nc-tap-01 mr-1"></i>Midtrans
                            </a>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : loading ? (
                    <tr>
                      <td colSpan="5" align="center">
                        <Spinner color="primary" />
                      </td>
                    </tr>
                  ) : errorOrders ? (
                    <tr>
                      <td colSpan="5" align="center">
                        {errorOrders}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="5" align="center">
                        Belum Ada Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // listLiga: state.ligaReducer.listLigaData,
  // ligaError: state.ligaReducer.listLigaError,
  // ligaLoading: state.ligaReducer.listLigaLoading,
});
const mapStateToDispatch = (dispatch) => ({
  // getListLiga: () => dispatch(getListLiga()),
});
export default connect(mapStateToProps, mapStateToDispatch)(ListOrder);
