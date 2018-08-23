import React, { Component } from 'react';
import StickyBox from 'react-sticky-box'; 
import './SideBar.scss'
import  'bootstrap/dist/css/bootstrap.css';
import StripeForm from '../PaymentForm/StripeForm';
import Icon from '../Icons/Icon'
import ICONS from '../Icons/constants';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
// import { base } from '../rebaseConfig/firebase';
import Imager from '../Imager/Imager';
// import MergeGalleries from '../../util/MergeGalleries';
// import { url } from 'inspector';
// import { Blink } from 'react-blink';
import Delay from 'react-delay';
// import withSubscription from '../Session/withSubscription';
// import InstagramLogin from '../../util/InstagramLogin';
// import { InstagramLoginButton } from 'react-social-login-buttons';
// import  InstagramPhotoPicker  from '../PhotoPicker'

import subscriptionWrapper from '../Session/subscriptionWrapper';
 class SideBar2 extends Component {
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
        this.forceUpdate()
    }
    render(){
      return(
            <StickyBox className="sideBar" style={{ marginLeft: 35, paddingTop: 45, border: '5px outset',  width: 215, borderColor: 'lightpink' }} >
                <div className="sideItem">              
                    <ul className="sidelist" style={{listStyleType: 'none'}}>
                        <li ><Link to={routes.LANDING} ><Icon className="listItem" icon={ICONS.INSTAGRAM} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li ><Link  to={routes.LIST_VIEW}><Icon className="listItem" icon={ICONS.THLIST2} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li  ><Link to={routes.GRID_VIEW}><Icon className="listItem" icon={ICONS.GRID} size={95} mode={"contain"} color={"white"}/></Link></li> 
                        <li  ><Link to={routes.ABOUT}><Icon className="listItem" icon={ICONS.ABOUT} size={95} mode={"contain"} color={"white"}/></Link></li> 

                    </ul>
                    {
                        (this.state &&  this.state.subscription === 'trial' )  
                        ? <Delay wait={20}>
                        <div >
                            <h6 style={{paddingTop: '5px', paddingBottom: '10px', color: 'blue',}}><b>Upgrade to Pro Subscription  For Only $9.99!</b></h6>
                            <div>
                            <Imager style={{marginLeft: -13, position:'bottom'}} src={`https://fitsmallbusiness.com/wp-content/uploads/2017/05/stripe-payment-logo_1.png`}  width={160} height={160} mode={'fit'} /> 
                            <StripeForm />
                            </div>                           
                        </div>
                        </Delay>     
                        :null
                        }  
                       
                        
                    </div>
             </StickyBox>    
            )
        }
    }
export default subscriptionWrapper(SideBar2);