import React from 'react'; 
import './TestFooter.scss'
import { Link } from 'react-router-dom'
import * as routes from '../constants/routes'

const TestFooter = () => {
    return (
        <div className="test-footer">
            <span>
                <p><h4><b>🅻🅸🅽🅺🆂🆃🅰🆂🅸🆃🅴</b></h4></p>
                <div className="col-sm-6 col-md-4 footer-navigation">
                <h3><Link to={routes.HOME }>Linksta<span>Site</span></Link></h3>
                <p className="links_c" style={{color: 'white'}}><Link to={routes.HOME} >Home</Link><strong> · </strong><a >Blog</a><strong> · </strong><a >Pricing</a><strong> · </strong><Link to={routes.ABOUT} >About</Link><strong> · </strong><a >Faq</a><strong> · </strong><a >Contact</a></p>
                <p className="company-name">LinkstaSite © 2018</p>
            </div>
                <div className="col-md-4 footer-about">

                <h4>About the company</h4>
                <p>Linkstasite aims to help you make the most out of your Instagram account, whether its gaining exposure, directing traffic and analytics, or advertising and driving up your revenue. &nbsp;The concept is simple, select pictures from your
                gallery, add an affiliate link and title to them, and then place your linkstasite profile url on your actual Instagram account.&nbsp;</p>
                <div className="social-links social-icons"><a  style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-facebook" /></a><a style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-twitter" /></a><a  href="https://www.instagram.com/linkstasite/" style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-instagram" /></a>
                <a  style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-github" /></a></div>
              </div>
            </span>
        </div>
    )
}

export default TestFooter