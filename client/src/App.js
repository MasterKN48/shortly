import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import NotFound from "./component/assets/404.webp";
import Footer from "./component/layout/Footer";

const Home = lazy(() => import("./component/layout/Home"));
const Login = lazy(() => import("./component/layout/Login"));
const Register = lazy(() => import("./component/layout/Register"));

const PrivateRoute = lazy(() => import("./component/private/PrivateRoute"));
const Dashboard = lazy(() => import("./component/layout/Dashboard"));

const NoMatchPage = () => {
  return (
    <div id="error">
      <img src={NotFound} alt="404" style={{ height: "90vh" }} />
    </div>
  );
};

const Routes = () => (
  <Suspense
    fallback={
      <div align="center" className="mt-4">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    }
  >
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/app/login" component={Login} />
      <Route path="/app/register" component={Register} />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <Route component={NoMatchPage} />
    </Switch>
  </Suspense>
);

function App() {
  return (
    <BrowserRouter>
      <div className="heavy-rain-gradient">
        <div className="main">
          <Navbar />
          <Routes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
