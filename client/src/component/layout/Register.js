import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {signup} from './apiAuth';
const Register = () => {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });
    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        let data=`name=${name}&email=${email}&password=${password}`;
        signup(data).then(data => {
            if (data.errors) {
                setValues({ ...values, error: data.errors, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
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

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/login">Signin</Link>
        </div>
    );
    return (
        <div className="container" style={{marginTop:'1vh',padding:'5vw'}}>
            <div className="container">
                <div className="card cloudy-knoxville-gradient">
                <h5 className="card-header info-color white-text text-center py-4">
                    <strong>Sign up</strong>
                </h5>
                {showError()}
                {showSuccess()}
                <div className="card-body px-lg-5 pt-0">
                    <form className="text-center" style={{color: '#757575'}} onSubmit={clickSubmit}>
                        <div className="form">
                                <div className="md-form">
                                    <input type="text" required onChange={handleChange("name")} value={name} id="materialRegisterFormLastName" className="form-control"/>
                                    <label htmlFor="materialRegisterFormLastName">Full Name</label>
                                </div>
                        </div>
                        <div className="md-form mt-0">
                            <input type="email" required onChange={handleChange("email")} value={email} id="materialRegisterFormEmail" className="form-control"/>
                            <label htmlFor="materialRegisterFormEmail">E-mail</label>
                        </div>
                        <div className="md-form">
                            <input type="password" required onChange={handleChange("password")} value={password} id="materialRegisterFormPassword" className="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock" />
                            <label htmlFor="materialRegisterFormPassword">Password</label>
                            <small id="materialRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
                                At least 8 characters and 1 digit
                            </small>
                        </div>

                        <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Register</button>
                        <p>or sign up with:</p>
                        <i className="google icon"></i>
                        <i className="facebook f icon"></i>
                        <i className="github icon"></i>
                        <hr/>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register
