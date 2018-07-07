import React, { Component } from 'react';
import './Pretty-Footer.css';
export default class Footer extends Component {
    render() {
        return (
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
        );
    }

}