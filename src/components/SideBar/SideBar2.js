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
// import InstagramLogin from '../../util/InstagramLogin';
// import { InstagramLoginButton } from 'react-social-login-buttons';
export default class SideBar2 extends Component {
    constructor() {
        super();
        this.state = {
        
    }
    this.gridView.bind(this);
    this.listView.bind(this);
    }

    checkSub = () => {
        if(!this.props.subscriptionStatus) {
        base.fetch('stripe', {
            context: this,
            then(data) {
                this.setState({ stripe: data })
                const { stripe } = this.state;
                if (typeof stripe!== undefined) {
                    base.update('subscription', {
                        data: { status: 'pro' },
                        then(err) {
                            if(!err) {
                                console.log('subscription status: pro');
                            }
                        }
                    }) 
                }
            }
        })
    } else {
        const { stripe } = this.state;
        if ( stripe ) {
            stripe.hasOwnProperty('proSubscription' ) 
            ? base.post('subscription', {
                data: { status: 'pro' },
                then(err) {
                    if(!err) {
                        console.log('subscription status: pro');
                    }
                }
            }) 
            : base.post('subscription', {
                data: { status: 'trial' },
                then(err) {
                    if(!err) {
                        console.log('subscription status: trial')
                    }
                }
            })
        }
    }
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
    componentDidMount() {
       this.checkSub();
        
    }
  
    render(){
      
      return(
         
            <StickyBox className="sideBar" style={{  paddingTop: 45, border: '5px outset',  width: 215, borderColor: 'lightpink' }} >
                <div className="sideItem">              
                <Delay wait={600}>
                    <ul className="sidelist" style={{listStyleType: 'none'}}>
                        <li ><Link to={routes.LANDING} ><Icon className="listItem" icon={ICONS.INSTAGRAM} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li><Link to={routes.BILLING}><Icon className="listItem" icon={ICONS.CREDITCARD} size={95} mode={"contain"} color={"white"} /></Link></li>
                        <li><Link to={routes.ACCOUNT}><Icon className="listItem" icon={ICONS.SETTINGS} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li ><Link  to={routes.LIST_VIEW}><Icon className="listItem" icon={ICONS.THLIST2} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li  ><Link to={routes.GRID_VIEW}><Icon className="listItem" icon={ICONS.GRID} size={95} mode={"contain"} color={"white"}/></Link></li> 
                       {/* <li><a href="https://instagram.com/accounts/logout/" width="0" height="0" title="logout" >Logout of Instagram</a></li>*/}
                    </ul>
                    </Delay> 
                    {!(this.props.accountStatus === 'pro')  
                        ?
                        <div >
                            <h6 style={{paddingTop: '5px', paddingBottom: '10px', color: 'blue',}}><b>Upgrade to Pro Subscription  For Only $9.99!</b></h6>
                            <div>
                            <Imager style={{marginLeft: -13, position:'bottom'}} src={`https://fitsmallbusiness.com/wp-content/uploads/2017/05/stripe-payment-logo_1.png`}  width={160} height={160} mode={'fit'} /> 
                            <StripeForm />
                            </div>                           
                        </div>
                        :
                        null
                        }                     
                </div>
            </StickyBox>
          
      );
    }
}