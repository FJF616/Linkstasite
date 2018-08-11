import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SignIn.scss'
import 'bootstrap/dist/css/bootstrap.css';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import  {  auth } from '../rebaseConfig';
import * as routes from '../constants/routes';
import TestFooter from '../TestFooter/TestFooter';
// import Imager from '../Imager/Imager'
const SignInPage = ({ history }) =>
  <div>
    
    <SignInForm history={history} />
    <TestFooter/>
   
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="App" style={{marginTop: -35, paddingBottom: 65}}>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
      
      <div className="login-card"><h1>SignIn</h1>
      
      <p className="profile-name-card"> </p>
        <form className="form-signin" onSubmit={this.onSubmit}>
        
        <span className="reauth-email"> </span>
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          className="form-control" 
          type="email" 
          required 
          placeholder="Email address" 
          autofocus id="inputEmail"
        />
        <input
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          className="form-control" 
          type="password" 
          required 
          placeholder="Password" 
          id="inputPassword"
        />
        <button disabled={isInvalid} className="btn btn-primary btn-block btn-lg btn-signin" type="submit">
          Sign In
        </button>
        <br/>
        { error && <p>{error.message}</p> }
      </form><PasswordForgetLink /><SignUpLink /></div>
    </div>
      
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};