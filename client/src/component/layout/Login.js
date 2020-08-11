import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "./apiAuth";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  //const {user}= isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    let data = `email=${email}&password=${password}`;
    signin(data).then((data) => {
      // console.log(data);
      if (data.msg && data.msg !== "login success") {
        setValues({
          ...values,
          error: data.msg,
          redirectToReferrer: false,
          loading: false,
        });
      } else if (data.user) {
        console.log(data);
        authenticate(data.user, () => {
          setValues({
            ...values,
            error: "",
            redirectToReferrer: true,
            loading: false,
          });
        });
      } else {
        setValues({
          ...values,
          error: "Login failed, User not exists",
          redirectToReferrer: false,
          loading: false,
        });
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (isAuthenticated()) {
        return <Redirect to="/app/dashboard" />;
      } else {
        return <Redirect to="/app/login" />;
      }
    } else {
      return <Redirect to="/app/login" />;
    }
  };

  return (
    <div className="m-4">
      <div className="container">
        <div className="container w-75">
          <div className="card cloudy-knoxville-gradient">
            <h4 className="card-header info-color white-text text-center py-3">
              <strong>Log In</strong>
            </h4>
            {showError()}
            {showLoading()}
            {redirectUser()}
            <div className="card-body px-lg-5 pt-0">
              <form
                className="text-center pt-4"
                style={{ color: "#757575" }}
                onSubmit={clickSubmit}
              >
                <div className="md-form">
                  <input
                    type="email"
                    required
                    id="materialLoginFormEmail"
                    className="form-control"
                    onChange={handleChange("email")}
                    value={email}
                  />
                  <label htmlFor="materialLoginFormEmail">Email</label>
                </div>

                <div className="md-form">
                  <input
                    type="password"
                    required
                    id="materialLoginFormPassword"
                    className="form-control"
                    onChange={handleChange("password")}
                    value={password}
                  />
                  <label htmlFor="materialLoginFormPassword">Password</label>
                </div>
                <button
                  className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                  type="submit"
                >
                  Log in
                </button>
                <p>
                  Not a member?
                  <Link to="/app/register"> Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
