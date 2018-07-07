import React, { Component } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/font-awesome.min.css';
// import DropDown from '../DropDownButton/DropDown';
import './assets/css/Pretty-Header.css'
export default class NewHeader extends Component {
    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
          <nav className="navbar navbar-light navbar-expand-md custom-header" style={{backgroundColor: 'rgb(124,65,135)'}}>
            <div className="container-fluid"><a className="navbar-brand" href="#" style={{backgroundColor: 'rgb(124,65,139)'}}>Linksta<span style={{color: 'rgb(64,137,223)'}}>Site</span> </a><button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
              <div className="collapse navbar-collapse" id="navbar-collapse">
                <ul className="nav navbar-nav links">
                  <li className="nav-item" role="presentation"><a className="nav-link" href="#" style={{backgroundColor: 'rgb(124,65,135)'}}>Home</a></li>
                  <li className="nav-item" role="presentation"><a className="nav-link" href="#" style={{backgroundColor: 'rgb(124,65,135)'}}>MyAccount</a></li>
                  <li className="nav-item" role="presentation"><a className="nav-link" href="#" style={{backgroundColor: 'rgb(124, 65, 135)'}}> Gallery</a></li>
     
                </ul>
              
                <ul className="nav navbar-nav ml-auto">
                  <li className="dropdown"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false"  style={{backgroundColor: 'rgb(52,36,65)'}}> <img src="assets/img/avatar.jpg" className="dropdown-image" /></a>
                    <div className="dropdown-menu dropdown-menu-right" role="menu"><a className="dropdown-item" role="presentation" href="#">Settings </a><a className="dropdown-item" role="presentation" href="#">Payments </a><a className="dropdown-item" role="presentation" href="#">Logout </a></div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        
        </div>
      );
    }
  };