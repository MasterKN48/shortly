import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "./apiAuth";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setValues({ ...values, error: false });
    let data = `name=${name}&email=${email}&password=${password}`;
    signup(data).then((res) => {
      if (res.response !== undefined && res.response.data.errors) {
        setValues({
          ...values,
          error: res.response.data.errors,
          success: false,
        });
        setSubmitting(false);
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
        setSubmitting(false);
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/app/login">Signin</Link>
    </div>
  );
  return (
    <div className="m-4">
      <div className="container">
        <div className="container w-75">
          <div className="card cloudy-knoxville-gradient">
            <h4 className="card-header info-color white-text text-center py-3">
              <strong>Sign up</strong>
            </h4>
            {showError()}
            {showSuccess()}
            <div className="card-body px-lg-5 pt-0">
              <form
                className="text-center pt-4"
                style={{ color: "#757575" }}
                onSubmit={clickSubmit}
              >
                <div className="form">
                  <div className="md-form">
                    <input
                      type="text"
                      required
                      onChange={handleChange("name")}
                      value={name}
                      id="materialRegisterFormLastName"
                      className="form-control"
                    />
                    <label htmlFor="materialRegisterFormLastName">
                      Full Name
                    </label>
                  </div>
                </div>

                <div className="md-form mt-2">
                  <input
                    type="email"
                    required
                    onChange={handleChange("email")}
                    value={email}
                    id="materialRegisterFormEmail"
                    className="form-control"
                  />
                  <label htmlFor="materialRegisterFormEmail">E-mail</label>
                </div>

                <div className="md-form mt-2">
                  <input
                    type="password"
                    required
                    onChange={handleChange("password")}
                    value={password}
                    id="materialRegisterFormPassword"
                    className="form-control"
                    aria-describedby="materialRegisterFormPasswordHelpBlock"
                  />
                  <label htmlFor="materialRegisterFormPassword">Password</label>
                  <small
                    id="materialRegisterFormPasswordHelpBlock"
                    className="form-text text-muted mb-4"
                  >
                    At least 8 characters includes 1 digit, 1 special characters
                  </small>
                </div>

                <button
                  disabled={submitting}
                  className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                  type="submit"
                >
                  Register
                </button>
                <p>
                  Already Register?
                  <Link to="/app/login"> Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
