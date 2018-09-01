
    

import React, { Component } from 'react';
import StickyBox from 'react-sticky-box'; 
import './SideBar.scss'
import  'bootstrap/dist/css/bootstrap.css';
// import StripeForm from '../PaymentForm/StripeForm';
import Icon from '../Icons/Icon'
import ICONS from '../Icons/constants';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
// import { base } from '../rebaseConfig/firebase';
// import Imager from '../Imager/Imager';
// import MergeGalleries from '../../util/MergeGalleries';
// import { url } from 'inspector';
// import { Blink } from 'react-blink';
// import Delay from 'react-delay';
// import withSubscription from '../Session/withSubscription';
// import InstagramLogin from '../../util/InstagramLogin';
// import { InstagramLoginButton } from 'react-social-login-buttons';
// import  InstagramPhotoPicker  from '../PhotoPicker'

import subscriptionWrapper from '../Session/subscriptionWrapper';
 class ProSideBar extends Component {
    constructor() {
        super();
        this.state = {
            subscription:'trial'
        }
    }
    // showDialog = () => {
    //     this.instaDialog.showDialog();
    //    }
    // fetchProGallery()  {
    //         InstagramLogin.getProGallery().then(proGallery => this.setState({ proGallery }))    
    //     }  
    /***
     * 
     * check account status and set state to pro if stripe payment info is found
     */
      checkStatus = async () => {
        const { stripeData } = this.props;
        const proStatus =  await ((stripeData || {}).stripe || {}).proSubscription;
        this.setState({ subscription: proStatus ? 'pro' : 'trial' }) 
    }
      
    componentDidMount() {
        this.checkStatus()
       
    }
    render(){
      return(
            <StickyBox className="sideBar" style={{ marginLeft: 35, paddingTop: 45, border: '5px outset',  width: 215, borderColor: 'lightpink' }} >
                

                    <div className="sideItem">    
                    <h6 style={{color: 'aliceblue', position: 'top'}}><b> You may Purchase a Pro scubscription through Stripe checkout or save your payment info for automatic payments</b></h6><br/><br/>
                    <ul className="sidelist" style={{listStyleType: 'none'}}>
                        <li ><Link to={routes.LANDING} ><Icon className="listItem" icon={ICONS.INSTAGRAM} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li ><Link  to={routes.LIST_VIEW}><Icon className="listItem" icon={ICONS.THLIST2} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li  ><Link to={routes.GRID_VIEW}><Icon className="listItem" icon={ICONS.GRID} size={95} mode={"contain"} color={"white"}/></Link></li> 
                        <li  ><Link to={routes.ABOUT}><Icon className="listItem" icon={ICONS.ABOUT} size={95} mode={"contain"} color={"white"}/></Link></li> 

                    </ul>

                       
                        
                    </div>
             </StickyBox>    
            )
        }
    }
export default subscriptionWrapper(ProSideBar);