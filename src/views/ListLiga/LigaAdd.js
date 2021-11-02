import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const LigaAdd = (props) => {
  return (
    <div className="content">
      <Row>
        <Col>
          <Link to="/admin/liga" className="btn btn-link p-2">
            <i className="nc-icon nc-minimal-left mr-1"></i>
            Kembali
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader tag="h4">Tambah Liga</CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
});
const mapStateToDispatch = (dispatch) => ({
});
export default connect(mapStateToProps, mapStateToDispatch)(LigaAdd);
