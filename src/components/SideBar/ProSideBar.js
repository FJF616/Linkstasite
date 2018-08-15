import React, { Component } from 'react';
import StickyBox from 'react-sticky-box'; 
import './SideBar.scss';
import  'bootstrap/dist/css/bootstrap.css';
// import StripeForm from '../PaymentForm/StripeForm';
import Icon from '../Icons/Icon'
import ICONS from '../Icons/constants';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom'
// import { Blink } from 'react-blink';
export default class ProSidBar extends Component {
    constructor() {
        super();
        this.state = {
        view: ''
    }
    this.gridView.bind(this);
    this.listView.bind(this);
}
    listView() {
        this.setState({
            view: 'listView'
        })
    }

    gridView() {
        this.setState({
            view: 'gridView'
        })
    }

    render(){
      return(
         
            <StickyBox className="sideBar" style={{  paddingTop: 45, border: '5px outset',  width: 215, borderColor: 'lightpink' }} >
                <div className="sideItem">
                    <ul className="sidelist" style={{listStyleType: 'none'}}>
                        <li ><Link to={routes.LANDING} ><Icon className="listItem" icon={ICONS.INSTAGRAM} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li><Link to={routes.BILLING_PAGE}><Icon className="listItem" icon={ICONS.CREDITCARD} size={95} mode={"contain"} color={"white"} /></Link></li>
                        <li><Link to={routes.ACCOUNT}><Icon className="listItem" icon={ICONS.SETTINGS} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li ><Link  to={routes.LIST_VIEW}><Icon className="listItem" icon={ICONS.THLIST2} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li  ><Link to={routes.GRID_VIEW}><Icon className="listItem" icon={ICONS.GRID} size={95} mode={"contain"} color={"white"}/></Link></li> 
                       {/* <li><a href="https://instagram.com/accounts/logout/" width="0" height="0" title="logout" >Logout of Instagram</a></li>*/}
                    </ul>
                    <br/>
                    <h6> You may Purchase a proscubscription through Stripe checkout or save your payment info for automatic payments</h6>

                </div>
            </StickyBox>
          
      );
    }
}