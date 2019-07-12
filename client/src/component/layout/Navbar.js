import React from 'react'
import {NavLink,withRouter} from 'react-router-dom';
import {logout,isAuthenticated} from './apiAuth';
import Brand from './Brand.png';
const Navbar = ({history}) => {
    const {name}=isAuthenticated();
    return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark scrolling-navbar">
                    <NavLink to='/' className="navbar-brand"><img src={Brand} alt="brand" style={{height:'40px',width:'40px'}}/> <strong>Shortly</strong></NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className='nav-item'>
                            <NavLink exact to='/' className="nav-link" activeClassName="line">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        { isAuthenticated() && (
                            <li className='nav-item'>
                                <NavLink exact activeClassName="line" className="nav-link" to='/dashboard'>Dashboard</NavLink>
                             </li>
                        )}
                        {isAuthenticated() === false ? (
                            <li className="nav-item ml-2">
                                    <div className="ui buttons">
                                        <NavLink to="/login"><button className="ui button">Login</button></NavLink>
                                        <div className="or" data-text="or"></div>
                                        <NavLink to="/register"><button className="ui positive button">Register</button></NavLink>
                                    </div>
                            </li>
                        ): null}
                        
                        </ul>
                        <ul className="navbar-nav ml-auto nav-flex-icons">
                        {isAuthenticated() ? (
                                <span className="navbar-text ml-auto white-text">
                                    {name}
                                </span>
                        ): null}
                        {isAuthenticated() && (
                            <li className="nav-item ml-2">
                                <span
                                    className="ui red button"
                                    style={{ cursor: "pointer", color: "#ffffff" }}
                                    onClick={() =>
                                        logout(() => {
                                            history.push("/");
                                        })
                                    }
                                >
                                    Signout
                                </span>
                            </li>
                        )}
                        </ul>
                    </div>
                </nav>
    )
}

export default withRouter(Navbar);
