import React, { Component } from 'react';
import CreditCard from '../PaymentForm/CreditCard'
// import './billing.scss';
import { withRouter } from 'react-router-dom';
import withAuthorization from '../Session/withAuthorization';
import ProSideBar from '../SideBar/ProSideBar' 
import Header from '../Header/Header'
import { base } from '../rebaseConfig/firebase'
import StripeForm from '../PaymentForm/StripeForm'
import Imager from '../Imager/Imager';
class BillingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billing:'',
      plan:'',
      
  }
}
  submit = () => {
    base.syncState('billing', {
      context: this,
      state: 'billing'
    })
  }
  handleChoice = (e) => {
   
    const target = e.target;
    const value = target.value;
    this.setState({
      plan: value
    })
   
  }
  checkChoice() {
    return (this.state.plan === 'complexplan' ? '$9.99' : '$5.99')
  }
    render() {
      return (
        <div className="App" >
        <Header/>
        <ProSideBar/>

        <div   >
          <title>Linkstasite Subscription</title>
          <style dangerouslySetInnerHTML={{__html: "\n      select, input { display: block; }\n      input[type=radio] { display: inline; }\n    " }} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <div style={{ border: '6px ridge', borderColor: 'pink', padding: 15, margin: 25}} >
            <label htmlFor="plan">Plan</label>
            <select   >
             
              <option onSelect={this.handleChoice} value="complexplan">Pro Plan</option>
            </select>
            <label htmlFor="plan-quantity">Quantity</label>
            <input type="text"  id="plan-quantity" defaultValue={1} />
          
            <label htmlFor="country">Country</label>
            <select id="country" data-recurly="country">
              <option value="US">United States</option>
              <option value="GB">Great Britain</option>
            </select>
           
         
           
            <input type="radio" defaultValue="USD" name="currency" data-recurly="currency" id="currency-USD" defaultChecked />
            <label htmlFor="currency-USD">USD</label>
          
            <input value={this.state.plan === 'simplepan'? '$5.99' : '$9.99'}  />
            <p>
              Due now
            </p>
            <ul>
              <li>
                Discount: 
                <span data-recurly="currency_symbol" />
                <span data-recurly="discount_now" />
              </li>
              <li>
                Subtotal: 
                <span data-recurly="currency_symbol" />
                <span data-recurly="subtotal_now" />
              </li>
              <li>
                Tax:
                <span data-recurly="currency_symbol" />
                <span data-recurly="taxes_now" />
              </li>
              <li>----</li>
              <li>
                Total:
                <span value="$" />
                <span value="9.99" />
              </li>
            </ul>
          

            <StripeForm disabled={true}/>
            <Imager style={{ position:'bottom', marginTop: 75}} src={`https://stripe.com/img/v3/payments/shared/social.png`}  width={225} height={225} mode={'fit'} /> 

            <div />
          </div>
        </div>
        <CreditCard/>
        </div>
      );
    }
    
  };


  const authCondition = (authUser) => !!authUser;


export default withAuthorization(authCondition)(withRouter(BillingPage));