import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import AlertMessage from "../layout/AlertMessage";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  //Local State
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  //context
  const { loginUser } = useContext(AuthContext);

  const { username, password } = loginForm;

  const onChangeLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({
          type: "danger",
          message: loginData.message,
        });

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="username"
            placeholder="UserName"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Button variant="success" size="lg" type="submit">
          Login
        </Button>
      </Form>

      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="infor" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
