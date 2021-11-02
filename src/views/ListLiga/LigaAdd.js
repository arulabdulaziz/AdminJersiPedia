import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
const LigaAdd = (props) => {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader tag="h4">Tambah Liga</CardHeader>
            <CardBody>
            </CardBody>
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
