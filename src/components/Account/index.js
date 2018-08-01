import React from 'react';
import AuthUserContext from '../Session/AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget/index';
import PasswordChangeForm from '../PasswordChange/index';
import withAuthorization from '../Session/withAuthorization';
const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div className="App">
        <h1>Account: {authUser.email}</h1> 
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(AccountPage);