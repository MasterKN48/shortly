import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Home from './component/layout/Home';
import Login from './component/layout/Login';
import Register from './component/layout/Register';
import Footer from './component/layout/Footer';
import PrivateRoute from './component/private/PrivateRoute';
import Dashboard from './component/layout/Dashboard';
const Routes=()=>(
         <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
         </Switch>
)

function App() {
  return (
      <BrowserRouter>
        <div id="dd">
          <Navbar />
          <Routes/>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
