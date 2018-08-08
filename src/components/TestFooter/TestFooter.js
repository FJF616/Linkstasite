import React from 'react'; 
import './TestFooter.scss'


const TestFooter = () => {
    return (
        <div className="test-footer">
            <span>
                <p>Linkstasite</p>
                <div className="col-md-4 footer-about">
                <h4>About the company</h4>
                <p>Linkstasite aims to help you make the most out of your Instagram account, whether its gaining exposure, directing traffic and analytics, or advertising and driving up your revenue. &nbsp;The concept is simple, select pictures from your
                gallery, add an affiliate link and title to them, and then place your linkstasite profile url on your actual Instagram account.&nbsp;</p>
                <div className="social-links social-icons"><a  style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-facebook" /></a><a style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-twitter" /></a><a  style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-linkedin" /></a>
                <a  style={{backgroundColor: 'rgb(84, 149, 190)'}}><i className="fa fa-github" /></a></div>
              </div>
            </span>
        </div>
    )
}

export default TestFooter