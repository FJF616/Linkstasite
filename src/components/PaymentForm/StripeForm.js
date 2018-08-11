import  React  from  'react' ; 
import  StripeCheckout  from  'react-stripe-checkout' ;
import './StripeForm.scss';
import { base } from '../rebaseConfig/firebase';
// import    InstagramProvider  from '../Session/InstagramProvider';
// import InstagramConsumer from '../Session/InstagramProvider'
class  StripeForm  extends  React.Component  { 
  constructor(props) {
    super(props);
   this.state = {
      stripe:'',
      disableButton:false
  }
}
  componentWillMount(){
    this.stripeRef = base.syncState('stripe', {
      context: this,
      state: 'stripe'
    })
  } 
  componentWillUnmount() {
    base.removeBinding(this.stripeRef);
  }

  onToken ( token )  { 
    console.log ( token )
    
    base.update('stripe', {
      data: { token, proSubcription: true },
      then(err) {
        if(!err) {
          console.log('stripe data enterd into firebase');
          
        }
      }
    })
   
  } 
  render ()  { 
    return  ( 
          <div  className="payment-form"> 
            <StripeCheckout 
              disabled={this.state.disableButton}
              token={this.onToken} 
              stripeKey="pk_test_H7uewnjg2jKXWSlnvBfFmxzo" 
              image="https://stripe.com/img/documentation/checkout/marketplace.png" 
              name="Pro Subscription" 
              panelLabel="Pro Subscription" 
              amount={999} 
              currency="USD"
            /> 
          </div>
     ); 
  } 
}

export  default  StripeForm ;