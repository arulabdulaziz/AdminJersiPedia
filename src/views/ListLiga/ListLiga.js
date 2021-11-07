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
import { getListLiga } from "store/actions";
import swal from "sweetalert";
import FIREBASE from "../../config/FIREBASE";

const ListLiga = (props) => {
  const [ligas, setLigas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorLigas, setErrorLigas] = useState("");
  useEffect(() => {
    // props.getListLiga();
    getAllLiga();
  }, []);
  const getAllLiga = () => {
    setLoading(true);
    FIREBASE.database()
      .ref("ligas")
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
        // console.log(value, "<<< value ligas");
        // dispatchSuccess(dispatch, GET_LIST_LIGA, value);
        setLigas(value);
      })
      .catch((err) => {
        console.log("Error: ", JSON.stringify(err));
        // dispatchError(dispatch, GET_LIST_LIGA, JSON.stringify(err), []);
        setErrorLigas(JSON.stringify(err));
      })
      .finally((_) => {
        setLoading(false);
      });
  };
  const deleteLiga = async (liga) => {
    try {
      const willDeleted = await swal({
        title: "Apakah Anda Yakin?",
        text: "Anda akan menghapus liga ini?",
        dangerMode: true,
        icon: "warning",
        buttons: true,
      });
      if (!willDeleted) return;
      setLigas(
        ligas.map((e) => {
          if (e.uid == liga.uid) e.loading = true;
          return e;
        })
      );
      await FIREBASE.storage().refFromURL(liga.image).delete();
      await FIREBASE.database().ref("ligas").child(liga.uid).remove();
      setLigas(ligas.filter((e) => e.uid != liga.uid));
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
              <CardTitle tag="h4">List Liga</CardTitle>
              <Link
                to="/admin/liga-add"
                className="btn btn-primary float-right"
              >
                Tambah Liga
              </Link>
            </CardHeader>
            <CardBody>
              <Table>
                <thead>
                  <th>Logo</th>
                  <th>Nama Liga</th>
                  <th></th>
                </thead>
                <tbody>
                  {ligas.length != 0 ? (
                    ligas.map((liga) => (
                      <tr key={liga.uid}>
                        <td>
                          <img
                            src={liga.image}
                            width="100"
                            alt={liga.liga_name}
                          />
                        </td>
                        <td>{liga.liga_name}</td>
                        <td>
                          {liga.loading ? (
                            <div className="">
                              <Spinner color="primary" className=""></Spinner>
                            </div>
                          ) : (
                            <>
                              <Link
                                className="mx-1 mb-1 mb-md-0 btn btn-primary"
                                to={"/admin/liga-edit/" + liga.uid}
                              >
                                <i className="nc-icon nc-ruler-pencil mr-1"></i>
                                Edit
                              </Link>
                              <Button
                                className="mx-1 mb-1 mb-md-0"
                                color="danger"
                                onClick={() => deleteLiga(liga)}
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
                      <td colSpan="3" align="center">
                        <Spinner color="primary" />
                      </td>
                    </tr>
                  ) : errorLigas ? (
                    <tr>
                      <td colSpan="3" align="center">
                        {errorLigas}
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

const mapStateToProps = (state) => ({
  // listLiga: state.ligaReducer.listLigaData,
  // ligaError: state.ligaReducer.listLigaError,
  // ligaLoading: state.ligaReducer.listLigaLoading,
});
const mapStateToDispatch = (dispatch) => ({
  // getListLiga: () => dispatch(getListLiga()),
});
export default connect(mapStateToProps, mapStateToDispatch)(ListLiga);
