import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  FormGroup,
  Button,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import Logo from "../../assets/img/main-logo.svg";
import FIREBASE from "config/FIREBASE";
import swal from "sweetalert";
const Unfinish = (props) => {
  const [params, setParams] = useState({
    order_id: "",
    transaction_status: "",
  });
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");
    if (order_id && transaction_status) {
      setParams({
        order_id,
        transaction_status,
      });
    }
  }, []);
  const toHistory = () => {};
  return (
    <>
      <Row
        className="justify-content-center align-items-center m-0 p-0"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Col md="4">
          <Card>
            <img
              src={Logo}
              className="d-block w-50 img-fluid"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            <CardHeader tag="h4" className="text-center">
              Maaf Transaksi Anda Gagal Silahkan Dicoba Lagi
            </CardHeader>
            <CardBody className="text-center">
              <p>ORDER ID : {params.order_id}</p>
              <p>STATUS TRANSAKSI : {params.transaction_status}</p>

              <Button color="primary" type="submit">
                Lanjutkan
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect()(Unfinish);
