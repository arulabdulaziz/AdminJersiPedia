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

const ListJersey = (props) => {
  const [jerseys, setJerseys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorJerseys, setErrorJerseys] = useState("");
  useEffect(() => {
    getAllJersey();
  }, []);
  const getAllJersey = () => {
    setLoading(true);
    FIREBASE.database()
      .ref("jerseys")
      .once("value", (querySnapShot) => {
        let value = querySnapShot.val() ? querySnapShot.val() : null;
        if (!value) value = [];
        else {
          value = Object.keys(value).map((e) => ({
            ...value[e],
            uid: e,
            loading: false,
          }));
        }
        // console.log(value, "<<< value jerseys");
        // dispatchSuccess(dispatch, GET_LIST_LIGA, value);
        setJerseys(value);
      })
      .catch((err) => {
        console.log("Error: ", JSON.stringify(err));
        // dispatchError(dispatch, GET_LIST_LIGA, JSON.stringify(err), []);
        setErrorJerseys(JSON.stringify(err));
      })
      .finally((_) => {
        setLoading(false);
      });
  };
  const deleteJersey = async (jersey) => {
    try {
      const willDeleted = await swal({
        title: "Apakah Anda Yakin?",
        text: "Anda akan menghapus jersey ini?",
        dangerMode: true,
        icon: "warning",
        buttons: true,
      });
      if (!willDeleted) return;
      setJerseys(
        jerseys.map((e) => {
          if (e.uid == jersey.uid) e.loading = true;
          return e;
        })
      );
      await FIREBASE.storage().refFromURL(jersey.image).delete();
      await FIREBASE.database().ref("jerseys").child(jersey.uid).remove();
      setJerseys(jerseys.filter((e) => e.uid != jersey.uid));
    } catch (error) {
      let errorMessage = error;
      if (error.message) errorMessage = error.message;
      swal({
        icon: "error",
        text: errorMessage,
        title: "Error",
      });
    }
  };
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">List Jersey</CardTitle>
              <Link
                to="/admin/jersey-add"
                className="btn btn-primary float-right"
              >
                Tambah Jersey
              </Link>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <th>Gambar</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Berat</th>
                  <th>Tipe</th>
                  <th></th>
                </thead>
                <tbody>
                  {jerseys.length != 0 ? (
                    jerseys.map((jersey) => (
                      <tr key={jersey.uid}>
                        <td>
                          <img
                            src={jersey.image[0]}
                            width="100"
                            alt={jersey.name}
                          />
                        </td>
                        <td>{jersey.name}</td>
                        <td>Rp. {numberWithCommas(jersey.price)},-</td>
                        <td>{jersey.weight} kg</td>
                        <td>
                          {jersey.loading ? (
                            <div className="">
                              <Spinner color="primary" className=""></Spinner>
                            </div>
                          ) : (
                            <>
                              <Link
                                className="mx-1 mb-1 mb-md-0 btn btn-primary"
                                to={"/admin/jersey-edit/" + jersey.uid}
                              >
                                <i className="nc-icon nc-ruler-pencil mr-1"></i>
                                Edit
                              </Link>
                              <Button
                                className="mx-1 mb-1 mb-md-0"
                                color="danger"
                                onClick={() => deleteJersey(jersey)}
                              >
                                <i className="nc-icon nc-basket mr-1"></i>
                                Hapus
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : loading ? (
                    <tr>
                      <td colSpan="6" align="center">
                        <Spinner color="primary" />
                      </td>
                    </tr>
                  ) : errorJerseys ? (
                    <tr>
                      <td colSpan="6" align="center">
                        {errorJerseys}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="3" align="center">
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

const mapStateToProps = (state) => ({});
const mapStateToDispatch = (dispatch) => ({});
export default connect(mapStateToProps, mapStateToDispatch)(ListJersey);
