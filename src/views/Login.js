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
import Logo from "../assets/img/main-logo.svg";
import FIREBASE from "../config/FIREBASE";
import swal from "sweetalert";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    try {
      setLoading(true);
      const auth = await FIREBASE.auth().signInWithEmailAndPassword(
        email,
        password
      );
      // console.log(auth.user.Aa)
      const admin = await FIREBASE.database()
        .ref("admins/" + auth.user.uid)
        .once("value");
      if (admin.val()) {
        localStorage.setItem("admin", JSON.stringify(admin.val()));
        localStorage.setItem("access_token", auth.user.Aa);
        props.history.replace("/admin/dashboard");
      } else {
        throw { message: "Maaf Anda Bukan Admin", code: 401 };
      }
    } catch (error) {
      let errorMessage = JSON.stringify(error);
      if (error.message) errorMessage = error.message;
      swal({
        text: errorMessage,
        icon: "error",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };
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
              Login
            </CardHeader>
            <CardBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button
                  type="submit"
                  color="primary"
                  className="w-100"
                  disabled={loading}
                >
                  {loading && (
                    <Spinner color="white" className="mr-2" size="sm"></Spinner>
                  )}
                  <span>Login</span>
                </Button>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect()(Login);
