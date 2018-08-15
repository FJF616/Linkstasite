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
            // subscription:'',
            stripe:''
        }
    //   componentWillMount() {
    //       if (!this.state.subscription.length) {
    //         base.fetch('subscription', {
    //             context: this,
    //             then(data) {
    //                 this.setState({ subscription: data });
    //             }
    //         })
    //     } else {
    //         if ( this.state.subscription.hasOwnProperty('pro')) {
    //           this.setState({ subscription: 'pro'}); 
    //       } else {
    //           this.setState({ subscription: 'trial' });
    //       }
    //     }
    //   }
     checkSub() {
        if(Object.keys(this.state.stripe).length === 0 && this.state.stripe.constructor === Object) {  
        base.fetch('stripe', {
            context: this,
            then(data) {
                this.setState({ stripe: data })
                const { stripe } = this.state;
                if (typeof stripe!== undefined) {
                    base.push('subscription', {
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
            ? base.push('subscription', {
                data: { status: 'pro' },
                then(err) {
                    if(!err) {
                        console.log('subscription status: pro');
                    }
                }
            }) 
            : base.push('subscription', {
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
    componentDidMount() {
        if (!Object.keys(this.state.stripe).length === 0 && this.state.stripe.constructor === Object) {
             this.checkSub();
        } else{
            this.stripeRef = base.syncState('stripe', {
                context: this,
                state:'stripe'
            })
        }
          
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