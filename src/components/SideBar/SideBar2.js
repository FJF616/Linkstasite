import React, { Component } from 'react';
import StickyBox from 'react-sticky-box'; 
import './SideBar.scss'
import  'bootstrap/dist/css/bootstrap.css';
import StripeForm from '../PaymentForm/StripeForm';
import Icon from '../Icons/Icon'
import ICONS from '../Icons/constants';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import { base } from '../rebaseConfig/firebase';
import Imager from '../Imager/Imager';
// import { url } from 'inspector';
// import { Blink } from 'react-blink';
import Delay from 'react-delay';
// import withSubscription from '../Session/withSubscription';
// import InstagramLogin from '../../util/InstagramLogin';
// import { InstagramLoginButton } from 'react-social-login-buttons';
import subscriptionWrapper from '../Session/subscriptionWrapper';
 class SideBar2 extends Component {
    constructor() {
        super();
        this.state = {
        subscription:'trial'
       
    }
    // this.gridView.bind(this);
    // this.listView.bind(this);
    // this.checkStatus = this.checkStatus.bind(this);
    }

    /***
     * 
     * check account status and set state to pro if stripe payment info is found
     */
      checkStatus = async () => {
        const { stripeData } = this.props;
        const proStatus =  await ((stripeData || {}).stripe || {}).proSubscription;
        this.setState({ subscription: proStatus ? 'pro' : 'trial' }) 
    }
        //     else {
        // const userProfileStatus = base.fetch('userProfile', {
        //     context: this,
        // })
        // .then(data => {
        //     data.hasOwnProperty('prosubScription') 
        //         ? data.proSubscription === true 
        //             ? this.setState({ subscription: 'pro'}) 
        //             : this.setState({ subscription: 'trial'})
        //         : this.setState({ subscription:  proStatus === true ? 'pro' : 'trial'})
        //     return;
        // })
        // .catch(error => {
        //     console.log('error fetching subscription status', error);
        // });
        // return userProfileStatus;
        // }
    // }
   
    // listView() {
    //     this.setState({
    //         view: 'listView'
    //     })
    // }

    // gridView() {
    //     this.setState({
    //         view: 'gridView'
    //     })
    // }
    componentDidMount() {
        this.checkStatus()
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
                    {
                        (this.state &&  this.state.subscription === 'trial' )  
                        ? <Delay wait={50}>
                        <div >
                            <h6 style={{paddingTop: '5px', paddingBottom: '10px', color: 'blue',}}><b>Upgrade to Pro Subscription  For Only $9.99!</b></h6>
                            <div>
                            <Imager style={{marginLeft: -13, position:'bottom'}} src={`https://fitsmallbusiness.com/wp-content/uploads/2017/05/stripe-payment-logo_1.png`}  width={160} height={160} mode={'fit'} /> 
                            <StripeForm />
                            </div>                           
                        </div>
                        </Delay>     
                        :<div style={{marginLeft: 35, cursor:'pointer'}}>
                        <Icon   className="listItem" icon={ICONS.REFRESH} size={125} mode={"contain"} color={"white"}/>
                        </div>
                        }  
                                      
                    </div>
             </StickyBox>    
            )
        }
    }
export default subscriptionWrapper(SideBar2);