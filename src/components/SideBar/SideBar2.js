import React, { Component } from 'react';
import StickyBox from 'react-sticky-box'; 
// import Delay from 'react-delay'
import './SideBar.scss'
import  'bootstrap/dist/css/bootstrap.css';
import StripeForm from '../PaymentForm/StripeForm';
import Icon from '../Icons/Icon'
import ICONS from '../Icons/constants'
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom'
import { base } from '../rebaseConfig/firebase';
// import ListView from '../ListView/ListView'
// import Imager from '../Imager/Imager'
// import MicrolinkCard from 'react-microlink'
export default class SideBar2 extends Component {
    state = {
        listView: ''
    }
    switchView() {
        this.setState({
            listView: !this.props.listView
        })
    }
    render(){
      return(
     
            <StickyBox className="sideBar" style={{  paddingTop: 45, border: '5px outset',  width: 215, borderColor: 'lightpink' }} >

                <div className="sideItem">

                    <ul style={{listStyleType: 'none'}}>

                        <li ><Link to={routes.INSTAGRAM_FEED} ><Icon className="listItem" icon={ICONS.INSTAGRAM} size={95} mode={"contain"} color={"gray"}/></Link></li>
                        <li><Link to={routes.BILLING}><Icon className="listItem" icon={ICONS.CREDITCARD} size={95} mode={"contain"} color={"gray"} /></Link></li>
                        <li><Link to={routes.ACCOUNT}><Icon className="listItem" icon={ICONS.SETTINGS} size={95} mode={"contain"} color={"gray"}/></Link></li>
                        <li><Link to={routes.LIST_VIEW}><Icon className="listItem" icon={ICONS.THLIST2} size={95} mode={"contain"} color={"gray"}/></Link></li>
                        <li><Link to={routes.GRID_VIEW}><Icon className="listItem" icon={ICONS.GRID} size={95} mode={"contain"} color={"gray"}/></Link></li> 
                       {/* <li><a href="https://instagram.com/accounts/logout/" width="0" height="0" title="logout" >Logout of Instagram</a></li>*/}
                    </ul>
                    <h6 style={{paddingTop: '65px', paddingBottom: '100px', color: 'grey'}}><b>Upgrade to Pro Subscription  For Only $9.99!</b></h6>
                    <br/>
                    

                    <StripeForm />
                </div>
               

            </StickyBox>
           
       
      );
    }
}