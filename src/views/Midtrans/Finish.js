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
import FIREBASE from "../../config/FIREBASE";
import swal from "sweetalert";
const Finish = (props) => {
  const [params, setParams] = useState({
    order_id: "",
    transaction_status: "",
  });
  const [loading, setLoading] = useState(false);
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
      updateOrder();
    }
  }, []);
  const updateOrder = () => {
    const { order_id, transaction_status } = params;
    const status =
      transaction_status === "settlement" || transaction_status === "capture"
        ? "paid off"
        : transaction_status;
    setLoading(true);
    FIREBASE.database()
      .ref("histories")
      .child(order_id)
      .update({
        status: status,
      })
      .then((response) => {})
      .catch((error) => {
        const errorMessage = error.message
          ? error.message
          : JSON.stringify(error);
        swal({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      })
      .finally((_) => {
        setLoading(false);
      });
  };
  const toHistory = () => {
    window.ReactNativeWebView.postMessage("done");
  };
  return (
    <>
      <Row
        className="justify-content-center align-items-center m-0 p-0"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {loading ? (
          <Spinner color="primary" />
        ) : (
          <Col md="4">
            <Card>
              <img
                src={Logo}
                className="d-block w-50 img-fluid"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
              <CardHeader tag="h4" className="text-center">
                Selamat Transaksi Anda Selesai
              </CardHeader>
              <CardBody className="text-center">
                <p>
                  {params.transaction_status === "pending" &&
                    "Untuk Selanjutnya Harap Selesai kan Pembayaran nya jika belum bayar, dan Silahkan Update Status Pembayaran di Halaman History"}
                </p>

                <p>ORDER ID : {params.order_id}</p>
                <p>
                  STATUS TRANSAKSI :{" "}
                  {params.transaction_status === "settlement" ||
                  params.transaction_status === "capture"
                    ? "lunas"
                    : params.transaction_status}
                </p>

                <Button
                  color="primary"
                  type="submit"
                  onClick={() => toHistory()}
                >
                  Lanjutkan
                </Button>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

export default connect()(Finish);
