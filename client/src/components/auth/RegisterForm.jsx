import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AlertMessage from "../layout/AlertMessage";

import { AuthContext } from "../../context/AuthContext";

const RegisterForm = () => {
  //Local State
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  //context
  const { registerUser } = useContext(AuthContext);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({
          type: "danger",
          message: registerData.message,
        });

        setTimeout(() => {
          setAlert(null);
        }, 3000);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="UserName"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" size="lg" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Are you have an account?
        <Link to="/login">
          <Button variant="infor" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
