import React, {useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import {signin, google,authenticate,isAuthenticated} from './apiAuth';
const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    //const {user}= isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const signInwithGoogle=()=>{
        google().then(data =>{
            if(data.user){
                console.log(data);
                authenticate(data.user,()=>{
                    setValues({
                        ...values,
                        error:'',
                        redirectToReferrer: true,
                        loading: false
                    })
                })
            }
        }).catch(err =>{
            console.log(err);
            setValues({...values,error:err.msg,redirectToReferrer:false, loading: false });
        })
    }
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        let data=`email=${email}&password=${password}`;
        signin(data).then(data => {
           // console.log(data);
            if(data.user){
                console.log(data);
                authenticate(data.user,
                    ()=>{
                        setValues({
                            ...values,
                            error:'',
                            redirectToReferrer: true,
                            loading: false
                        })
                    })
            }
        })
        .catch(err =>{
            console.log(data.msg);
            setValues({...values,error:data.msg,redirectToReferrer:false, loading: false });
        })
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
            if(isAuthenticated()){
                return <Redirect to="/dashboard" />;
            }
            else{
                return <Redirect to='/login' />
            }
        }else{
            return <Redirect to='/login' />
        }
    };
    return (
      <div className="container" style={{marginTop:'1vh',padding:'5vw'}}>
        <div className='container'>
           <div className="card cloudy-knoxville-gradient">
            <h5 className="card-header info-color white-text text-center py-4">
            <strong>Log In</strong>
            </h5>
            {showError()}
            {showLoading()}
            {redirectUser()}
            <div className="card-body px-lg-5 pt-0">
            <form className="text-center" style={{color: '#757575'}} onSubmit={clickSubmit}>
                <div className="md-form">
                <input
                    type="email"
                    id="materialLoginFormEmail"
                    className="form-control"
                    onChange={handleChange('email')}
                    value={email}
                />
                <label htmlFor="materialLoginFormEmail">Email</label>
                </div>
                <div className="md-form">
                <input
                    type="password"
                    id="materialLoginFormPassword"
                    className="form-control"
                    onChange={handleChange('password')}
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
                <Link to='/register'>Register</Link>
                </p>
            </form>
            <p>or sign in with:</p>
                <a className="btn btn-flat btn-lg" href="http://localhost:5000/api/auth/google"><i className="google icon"></i></a>
                <i className="facebook f icon"></i>
                <i className="github icon"></i>
            </div>
        </div>
        </div>
      </div>
    );
}

export default Login
