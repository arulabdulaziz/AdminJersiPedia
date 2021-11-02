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
const ListLiga = (props) => {
  useEffect(() => {
    props.getListLiga();
  }, []);
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
                  {props.listLiga.length != 0 ? (
                    props.listLiga.map((liga) => (
                      <tr>
                        <td>
                          <img
                            src={liga.image}
                            width="100"
                            alt={liga.liga_name}
                          />
                        </td>
                        <td>{liga.liga_name}</td>
                        <td>
                          <Button className="mx-1 mb-1 mb-md-0" color="warning">
                            <i className="nc-icon nc-ruler-pencil mr-1"></i>
                            Edit
                          </Button>
                          <Button className="mx-1 mb-1 mb-md-0" color="danger">
                            <i className="nc-icon nc-basket mr-1"></i>
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : props.ligaLoading ? (
                    <tr>
                      <td colSpan="3" align="center">
                        <Spinner color="primary" />
                      </td>
                    </tr>
                  ) : props.ligaError ? (
                    <tr>
                      <td colSpan="3" align="center">
                        {props.ligaError}
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
  listLiga: state.ligaReducer.listLigaData,
  ligaError: state.ligaReducer.listLigaError,
  ligaLoading: state.ligaReducer.listLigaLoading,
});
const mapStateToDispatch = (dispatch) => ({
  getListLiga: () => dispatch(getListLiga()),
});
export default connect(mapStateToProps, mapStateToDispatch)(ListLiga);
