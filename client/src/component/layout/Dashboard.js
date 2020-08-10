import React, { useState, useEffect } from "react";
import { postUrl, showList, deleteUrl } from "./apiUrl";
import { isAuthenticated } from "./apiAuth";
import Loader from "./Loader";
import moment from "moment";
const Dashboard = () => {
  const [data, setData] = useState({
    longUrl: "",
    shortUrl: "",
    date: "",
    error: "",
    success: false,
  });
  const { longUrl, success, error, shortUrl } = data;
  const [all, setAll] = useState([]);
  const [load, setLoading] = useState({
    loading: true,
  });
  const { loading } = load;
  const { id } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setData({ ...data, error: false, [name]: event.target.value });
  };
  const del = (id) => {
    if (window.confirm("Do you want to delete this URL?")) {
      deleteUrl(id)
        .then((data) => {
          //console.log(data);
          init();
        })
        .catch((err) => console.log(err));
    }
  };
  const init = () => {
    showList(id)
      .then((data) => {
        console.log(data);
        setAll([...data]);
        setLoading({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        setLoading({
          loading: true,
        });
      });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setData({ ...data, error: false, success: false });
    let urlData = `longUrl=${longUrl}&id=${id}`;
    postUrl(urlData)
      .then((data) => {
        //console.log(data);
        if (data.msg) {
          //error
          setData({
            ...data,
            success: false,
            error: data.msg,
          });
        }
        setData({
          ...data,
          shortUrl: data.shortUrl,
          longUrl: "",
          date: data.date,
          success: true,
          error: false,
        });
        init();
      })
      .catch((err) => {
        setData({
          ...data,
          success: false,
          error: data.msg,
        });
      });
  };
  useEffect(() => {
    init(); // eslint-disable-next-line
  }, []);

  const showItems = () => {
    if (loading) {
      return <Loader />;
    } else {
      return null;
    }
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
      Short Link Created! ||
      <a href={shortUrl}>{shortUrl}</a>
    </div>
  );

  return (
    <div className="m-5">
      <div className="container">
        <div className="jumbotron">
          <h4 className="leads text-center">Enter URL to Short</h4>
          <form className="container text-center" onSubmit={clickSubmit}>
            {showError()}
            <div className="md-form input-group mb-3">
              <input
                type="url"
                id="inputIconEx1"
                required
                value={longUrl}
                onChange={handleChange("longUrl")}
                className="form-control btn-rounded"
              />
              <label htmlFor="inputIconEx1">Enter Long URL</label>
              <div className="input-group-append">
                <button
                  className="btn btn-lg btn-dark btn-rounded m-0 px-3"
                  type="submit"
                  id="MaterialButton-addon2"
                >
                  Shortly
                </button>
              </div>
            </div>
          </form>
          {showSuccess()}
        </div>
      </div>
      <div className="container">
        <h4>List of Short URL</h4>
        {showItems()}
        <div className="container">
          <div className="row">
            {all.map(({ _id, longUrl, shortUrl, date }, index) => {
              return (
                <div
                  key={index}
                  className="col-md-4 col-lg-4 col-sm-6 col-xs-12 mb-3"
                >
                  <div className="card h-100">
                    <div className=" card-header elegant-color-dark white-text">
                      Short URL
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">
                        <a href={shortUrl}>{shortUrl}</a>
                      </h3>
                      <p className="card-text">
                        LongURL: <a href={longUrl}>{longUrl}</a>
                      </p>
                      <button
                        className="btn-outline-danger btn-rounded waves-effect btn-md"
                        onClick={() => {
                          del(_id);
                        }}
                      >
                        Delete
                      </button>
                      <p classame="text-muted elegant-color-dark white-text">
                        <small>{moment(date).format("LLL")}</small>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
