import React from 'react';
// import SubscriptionProvider from './SubscriptionProvider';
import SubscriptionConsumer from './SubscriptionWrapper';
import { withRouter } from 'react-router-dom';
import { base } from '../rebaseConfig/firebase';
// import SideBar2 from '../SideBar/ProSideBar';

/**
 * 
 * 
 * 
 * 
 * HOC to store stripe and subscription info for sidebar, sidebar will use props from this HOC to render two different views based on the
 * subscription status.  when status is trial mode, the sidebar will show stripe payment logo and stripe checkout payment button.  
 * when the status is "pro", these two components will not be rendered
 */
const withSubscription = (Component)  => {
    class WithSubscription extends React.Component {
        state = {
            subscription:'',
            stripe:{},
            synced:'',
        }
        checkStripe() {
            const { stripe } = this.state;
            if (Object.keys(stripe).length === 0 && stripe.constructor === Object) {  
                this.stripeRef = base.syncState('stripe', {
                    context: this,
                    state: 'stripe'
                })
                .then(state => { 
                    this.setState({ 
                        synced: true 
                    })
                })
                .catch(err => { 
                    console.log('error syncing with stripe database', err) 
                });
                } else {
                    stripe.hasOwnProperty('proSubscription' ) 
                      ? base.push('subscription', {
                            data: { status: 'pro' },
                        })
                        .then(() => { 
                            console.log('subscription status: pro')
                        })
                        .catch(err => { 
                            console.log('error updating subscription status in firebase', err)
                        })           
                      : base.push('subscription', {
                            data: { status: 'trial' },
                        })
                        .then(() => { 
                            console.log('subscription status: trial')
                        })
                        .catch(err => { 
                            console.log('error updating subscription status in firebase', err)
                        })           
                    }
                }
       
        checkSub() {
            const { subscription } = this.state;
            if (!subscription.length) {
                base.fetch('subscription', {
                    context: this,
                })
                .then(data => {
                    this.setState({ 
                        subscription: data 
                    });
                    this.checkStripe();
                }) 
                .catch(err => {
                    console.log('error fetching subscription data from firebase', err);
                });       
                } else {
                    if ( subscription.hasOwnProperty('pro')) {
                        this.setState({ 
                            subscription: 'pro'
                        }); 
                    } else {
                        this.setState({ 
                            subscription: 'trial'
                         });
                    }
                }
            }

    /**
     * 
     * 
     * 
     * 
     * check the stripe subscription status by checking if stripe user info exists in firebase
     * update the subscription status to 'pro' in local state if it exists, if not set a flag 
     * in firebase as 'trial' for reference in future logins
     */
     
        
    componentDidMount() {
        this.checkSub();
      }

    componentWillUnmount() {
        base.removeBinding(this.stripeRef);
    }
    
      render() {
          return (
             
                <SubscriptionConsumer>
                { stripe => <Component {...this.props.children} stripe={ stripe } /> }
                </SubscriptionConsumer>
              
          );
       }   
    }
    return withRouter(WithSubscription);
}
export default withSubscription;