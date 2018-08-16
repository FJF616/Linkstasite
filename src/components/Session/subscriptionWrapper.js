import React from 'react';
import SubscriptionContext from './SubscriptionContext';
import { base } from '../rebaseConfig/firebase';


const subscriptionWrapper = ( Component ) => {

class WithSubscriptionProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stripe: {},
            // subscription:'',
           
        };
    }
    checkSub = async () => {
            try{
                const { stripe } = this.state;
                if ( stripe ) {
                    stripe.hasOwnProperty('proSubscription' ) 
                    ? base.post('subscription', {
                        data: { status: 'pro' },
                        then(err) {
                            if(!err) {
                                this.stripeRef();
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
        
        } catch ( error ) {
            throw error;
            }
        if (!this.state.subscription && !typeof this.state.stripe === undefined) {
            await base.fetch('stripe', {
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
        }
    }
    componentWillMount() {
        this.stripeRef = base.syncState('stripe', {
            context: this,
            state:'stripe'
        //     then(data) {
        //         this.setState({
        //             stripe: data,
        //     })
        // }
    })
        if (!this.state.subscription) {
           base.fetch('subscription', {
              context: this,
              then(data) {
                  if( data.length ) {
                  this.setState({ subscription: data });
              }
            }
          })
    //   } else {
    //       if ( this.state.subscription.hasOwnProperty('pro')) {
    //         this.setState({ subscription: 'pro'}); 
    //     } else {
    //         this.setState({ subscription: 'trial' });
    //     }
    //   }
    }
}
    // componentDidlMount() {
    //     if (!Object.keys(this.state.stripe).length === 0 && this.state.stripe.constructor === Object) {
    //         this.checkSub();
    //    }
       

        // this.stripeRefs = base.listenTo('stripe', {
        //     context: this,
        //     state: 'stripe',
        //     then(stripeData) {
        //         console.log('updating profile with stripe data', stripeData);
        //         this.setState({ 
        //             stripe: stripeData, 
        //             subscription: 'pro'
        //         });
        //     },
        //     onFailure(error) {
        //         console.log('error during stripe processing', error);
        //     }
        // });
    // } 

    componentWillUnmount() {
        base.removeBinding(this.stripeRef);
        // base.removeBinding(this.stripeRefs)
    }
    render() {
        return(

            <SubscriptionContext.Provider value={this.state}>
                <SubscriptionContext.Consumer>
                {  stripe => <Component {...this.props.children} stripeData={ stripe } /> }
                </SubscriptionContext.Consumer>       
            </SubscriptionContext.Provider>
        );
    }
}
return WithSubscriptionProvider;
}
export default subscriptionWrapper;