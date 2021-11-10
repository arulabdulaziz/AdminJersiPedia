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
} from "reactstrap";
import { connect } from "react-redux";
import Logo from "../assets/img/main-logo.svg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = () => {
    console.log({
      email,
      password,
    });
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button type="submit" color="primary" className="w-100">
                  Login
                </Button>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default connect()(Login);
