import React, { Component } from 'react';
import './Account.css';


export default class AccountSettings extends Component {
    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Untitled</title>
       
          <div className="container profile profile-view" id="profile">
            <div className="row">
              <div className="col-md-12 alert-col relative">
                <div className="alert alert-info absolue center" role="alert"><button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><span>Profile save with success</span></div>
              </div>
            </div>
            <form>
              <div className="form-row profile-row">
                <div className="col-md-4 relative">
                  <div className="avatar">
                    <div className="avatar-bg center" />
                  </div><input type="file" className="form-control" name="avatar-file" /></div>
                <div className="col-md-8">
                  <h1>Profile </h1>
                  <hr />
                  <div className="form-row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>Firstname </label><input className="form-control" type="text" name="firstname" /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>Lastname </label><input className="form-control" type="text" name="lastname" /></div>
                    </div>
                  </div>
                  <div className="form-group"><label>Email </label><input className="form-control" type="email" autoComplete="off" required name="email" /></div>
                  <div className="form-row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>Password </label><input className="form-control" type="password" name="password" autoComplete="off" required /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>Confirm Password</label><input className="form-control" type="password" name="confirmpass" autoComplete="off" required /></div>
                    </div>
                  </div>
                  <hr />
                  <div className="form-row">
                    <div className="col-md-12 content-right"><button className="btn btn-primary form-btn" type="submit">SAVE </button><button className="btn btn-danger form-btn" type="reset">CANCEL </button></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };