import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import  { auth }  from '../rebaseConfig';
import * as routes from '../../constants/routes';
import TestFooter from '../TestFooter/TestFooter'
const PasswordForgetPage = () =>
  <div style={{marginTop: 50}}>
   
    <PasswordForgetForm />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div className="App" style={{paddingTop:55, paddingBottom: 460}}>
      
      
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
      <div style={{marginTop: 490, width: '100%', position: 'absolute'}}>
          <TestFooter/>
          </div>
        </div>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
