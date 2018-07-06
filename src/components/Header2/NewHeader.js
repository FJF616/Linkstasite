import React, { Component } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/font-awesome.min.css';
import './assets/css/Pretty-Footer.css';
import './assets/css/Pretty-Header.css'
export default class HeaderFooter extends Component {
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
                  <li className="nav-item" role="presentation"><a className="nav-link custom-navbar" href="#" style={{backgroundColor: 'rgb(124, 65, 135)'}}>AffiliateLinks<span className="badge badge-pill badge-primary">new</span></a></li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                  <li className="dropdown"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#" style={{backgroundColor: 'rgb(52,36,65)'}}> <img src="assets/img/avatar.jpg" className="dropdown-image" /></a>
                    <div className="dropdown-menu dropdown-menu-right" role="menu"><a className="dropdown-item" role="presentation" href="#">Settings </a><a className="dropdown-item" role="presentation" href="#">Payments </a><a className="dropdown-item" role="presentation" href="#">Logout </a></div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <footer className="d-flex d-inline-flex flex-wrap" style={{backgroundColor: 'rgb(124, 65, 135)'}}>
            <div className="row">
              <div className="col-sm-6 col-md-4 footer-navigation">
                <h3><a href="#">Linksta<span>Site</span></a></h3>
                <p className="links"><a href="#">Home</a><strong> · </strong><a href="#">Blog</a><strong> · </strong><a href="#">Pricing</a><strong> · </strong><a href="#">About</a><strong> · </strong><a href="#">Faq</a><strong> · </strong><a href="#">Contact</a></p>
                <p className="company-name">LinkstaSite © 2018</p>
              </div>
              <div className="col-sm-6 col-md-4 footer-contacts">
                <div><span className="fa fa-map-marker footer-contacts-icon" style={{backgroundColor: 'rgb(81,149,190)'}}> </span>
                  <p><span className="new-line-span">21 Revolution Street</span> San Diego, CA</p>
                </div>
                <div><i className="fa fa-phone footer-contacts-icon" />
                  <p className="footer-center-info email text-left"> +1 555 123456</p>
                </div>
                <div><i className="fa fa-envelope footer-contacts-icon" style={{backgroundColor: 'rgb(84, 149, 190)'}} />
                  <p> <a href="#" target="_blank">support@linkstasite.com</a></p>
                </div>
              </div>
              <div className="clearfix" />
              <div className="col-md-4 footer-about">
                <h4>About the company</h4>
                <p>Linkstasite aims to help you make the most out of your Instagram account, whether its gaining exposure, directing traffic and analytics, or advertising and driving up your revenue. &nbsp;The concept is simple, select pictures from your
                  gallery, add an affiliate link and title to them, and then place your linkstasite profile url on your actual Instagram account.&nbsp;</p>
                <div className="social-links social-icons"><a href="#" style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-facebook" /></a><a href="#" style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-twitter" /></a><a href="#" style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-linkedin" /></a>
                  <a href="#" style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-github" /></a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    }
  };