import  React  from  'react' ; 
import  StripeCheckout  from  'react-stripe-checkout' ;
import './StripeForm.scss';
class  StripeForm  extends  React.Component  { 
  onToken ( token )  { 
    console.log ( token ); 
  } 
  render ()  { 
    return  ( 
      <div  className="payment-form"> 
        <StripeCheckout 
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