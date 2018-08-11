import React, { Component } from 'react';
import SubscriptionContext from './SubscriptionContext';
import { base } from '../rebaseConfig/firebase';


export const SubscriptionConsumer =  SubscriptionContext.Consumer;
export default class SubscriptionProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stripe: {},
            proTheme: false,
        };
    }
    componentWillMount() {
        base.fetch('stripe', {
            context: this
        })
        .then(data => {
            this.setState({
                data,
                proTheme: true
            });
        })
        .catch(error => {
            console.log('user has not upgraded to pro subscription yet.', error);
        }); 
    }

    componentDidMount () {
        this.stripeRef = base.listenTo('stripe', {
            context: this,
            state: 'stripe',
            then(stripeData) {
                console.log('updating profile with stripe data', stripeData);
                this.setState({ 
                    stripeData, 
                    proTheme: true
                });
            },
            onFailure(error) {
                console.log('error during stripe processing', error);
            }
        });
    } 

    componentWillUnmount() {
        base.removeBinding(this.stripeRef);
    }
    render() {
        return(

            <SubscriptionContext.Provider value={this.state}>
                {this.props.children}
            </SubscriptionContext.Provider>
        );
    }
}