import React from 'react'
import {Link} from 'react-router-dom';
import {isAuthenticated} from './apiAuth';
import Brand from './Brand.png';
const Home = () => {
    return (
      <div
        className="view jarallax"
        style={{backgroundImage: "url('https://masterkn48.apps19.com/images/b2.jpg')",backgroundRepeat:'no-repeat',backgroundSize: 'cover',backgroundPosition: "center center"}}
      >
        <div className="mask d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 white-text text-center">
                <img className="rounded mx-auto d-block" src={Brand} alt="shortly" style={{height:'74px',width:'84px'}}/>
                <h1
                  className="display-3 mb-0 pt-md-5 pt-5 white-text font-weight-bold wow fadeInDown"
                  data-wow-delay="0.3s"
                >
                  <Link className="indigo-text font-weight-bold" to="/home">Shortly</Link>
                </h1>
                <h5
                  className="text-uppercase pt-md-5 pt-sm-2 pt-5 pb-md-5 pb-sm-3 pb-5 white-text font-weight-bold wow fadeInDown"
                  data-wow-delay="0.3s"
                >
                  Website Link Shortner
                </h5>
                { !isAuthenticated() && (
                  <div className="wow fadeInDown" data-wow-delay="0.3s">
                  <Link className="btn btn-primary btn-rounded btn-lg"  to="/login"><i className="sign-in icon"></i>Login</Link>
                  <Link className="btn btn-success btn-rounded btn-lg"  to="/register"><i className="sign-out icon"></i>Register</Link>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home