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
     
      disableButton:false
  }
}
  componentWillMount(){
    this.stripeRef = base.fetch('stripe', {
      context: this,
      then(stripeData) {
        //check for empty object
        if(Object.keys(stripeData).length === 0 && stripeData.constructor === Object) {
          base.update('userProfile', {
            data: { proSubscription: false }
          })
          this.setState({ proSubscription: false })
        } else {
          base.update('userProfile', {
            data: { proSubscription: true }
          })
          this.setState({ proSubscription: true })
        } 
      }
    })
    
  } 
  componentWillUnmount() {
    base.removeBinding(this.stripeRef);
  }

  onToken ( token )  { 
    console.log ( token )
    
    base.update('stripe', {
      data: { token, proSubscription: true },
      then(err) {
        console.log('could not enter stripe details into firebase!', err)
        if(!err) {
          console.log('updated stripe account info in firebase')   
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