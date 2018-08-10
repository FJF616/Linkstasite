import React, { Component } from 'react';
import './SignIn.scss'
export default class SignIn extends Component {
    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <div className="login-card"><img src="url(./avatar__2x.png)" className="profile-img-card" alt="1"/>
            <p className="profile-name-card"> </p>
            <form className="form-signin"><span className="reauth-email"> </span><input className="form-control" type="email" required placeholder="Email address" autofocus id="inputEmail" /><input className="form-control" type="password" required placeholder="Password" id="inputPassword" />
              <div className="checkbox">
                <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-3" /></div>
              </div><button className="btn btn-primary btn-block btn-lg btn-signin" type="submit">Sign in</button></form><a  className="forgot-password">Forgot your password?</a></div>
        </div>
      );
    }
  }