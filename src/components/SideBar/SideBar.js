import React, { Component } from 'react';
import StickyBox from 'react-sticky-box'; 
// import Delay from 'react-delay'
import './SideBar.scss'
import  'bootstrap/dist/css/bootstrap.css';
import StripeForm from '../PaymentForm/StripeForm';
import Icon from '../Icons/Icon'
import ICONS from '../Icons/constants'
// import { Link } from 'react-router-dom'
// import ListView from '../ListView/ListView'
// import Imager from '../Imager/Imager'
// import MicrolinkCard from 'react-microlink'
export default class SideBar2 extends Component {
    render(){
      return(
     
            <StickyBox className="sideBar" style={{  paddingTop: 45, border: '5px outset',  width: 215, borderColor: 'lightpink' }} >
           
                <div className="sideItem">

                    <ul style={{listStyleType: 'none'}}>

                        <li ><a href="#Pictures" ><Icon className="listItem" icon={ICONS.INSTAGRAM} size={95} mode={"contain"} color={"goldenrod"}/></a></li>
                        <li><a href="#Billing"><Icon className="listItem" icon={ICONS.CREDITCARD} size={95} mode={"contain"} color={"lightblue"} /></a></li>
                        <li><a href="#Settings"><Icon className="listItem" icon={ICONS.SETTINGS} size={95} mode={"contain"} color={"blue"}/></a></li>
                        <li><a href="#ListView"><Icon className="listItem" icon={ICONS.THLIST2} size={95} mode={"contain"} color={"turquoise"}/></a></li>
                        <li><a href="#GridView"><Icon className="listItem" icon={ICONS.GRID} size={95} mode={"contain"} color={"rgb(151, 54, 241)"}/></a></li>
                      
                    </ul>
                    <h5 style={{paddingTop: '45px', paddingBottom: '75px', color: 'grey'}}><b>Upgrade to Pro Subscription  For Only $9.99!</b></h5>
                    <br/>
                    
                    <StripeForm />
                </div>
               
               
            </StickyBox>
           
       
      );
    }
}