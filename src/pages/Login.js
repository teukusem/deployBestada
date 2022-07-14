import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";

function Login({ setToken, token }) {
  document.title = `ZidDesk | Login`;

  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState("");

  const { username, password } = formData;

  const onChange = (e) => {
    setIsError(false);
    setIsValid("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const useMutationLogin = useMutation(
    ["loginCache"],
    async ({ username, password }) => {
      const response = await axios.post(
        `http://34.101.70.83:5200/mobile/user/v1/auth/signin`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "l!nt@h-B@!k",
            Bearer: localStorage.getItem("token"),
          },
        }
      );

      return response.data;
    },
    {
      onSuccess: async (data) => {
        setToken("test");
        localStorage.setItem("token", data.data.token);
      },
      onError: (err) => {
        const { message } = err.response.data;
        setIsError(true);
        setIsValid("is-invalid");
        setErrorMessage(message);
      },
    }
  );

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    useMutationLogin.mutate(formData);
  };

  return (
    <Container>
      <div style={{ marginTop: "5vh" }}>
        <h1 className="fontJumbo mt-4">ZidDesk</h1>
        <h6>Masuk Ke ZibDesk</h6>
      </div>
      <Form className="formInput" onSubmit={(e) => handleSubmit(e)}>
        {isError && (
          <div class="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {isValid.length > 0 && (
          <p style={{ color: "red", textAlign: "center" }}>
            Silahkan masukkan Username dan Kata Sandi yang sudah terdaftar ini
            untuk masuk.
          </p>
        )}
        <h6 className="fw-bold">Username</h6>
        <Form.Control
          className={`form-control ${isValid}`}
          onChange={onChange}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="text"
          value={username}
          name="username"
        />
        <div class="invalid-feedback">Username yang Anda masukkan salah</div>
        <h6 className="fw-bold mt-2">Password</h6>
        <Form.Control
          onChange={onChange}
          value={password}
          name="password"
          type="password"
          className={`form-control ${isValid}`}
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
        <div class="invalid-feedback">Password yang Anda masukkan salah</div>
        <p className="forgotPass">Lupa password ?</p>

        <div className="d-grid mt-4">
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            className=""
            style={{
              backgroundColor: "#47ADE7",
              border: "solid",
              padding: "12px",
            }}
          >
            Masuk
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
