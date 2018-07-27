import React, { Component } from 'react';
import CreditCard from '../PaymentForm/CreditCard'
// import './billing.scss';
import { withRouter } from 'react-router-dom';
import withAuthorization from '../Session/withAuthorization';
import SideBar2 from '../SideBar/SideBar2' 
import Header from '../Header/Header'
class Billing extends Component {
    render() {
      return (
        <div className="App" >
        <Header/>
        <SideBar2/>
       
        <div  className="billing" >
          <title>Recurly.js Example: Advanced Pricing</title>
          <style dangerouslySetInnerHTML={{__html: "\n      select, input { display: block; }\n      input[type=radio] { display: inline; }\n    " }} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <form method="post" action="/api/subscriptions/new" style={{ border: '6px ridge', borderColor: 'pink', padding: 15, margin: 30}} >
            <label htmlFor="plan">Plan</label>
            <select id="plan" data-recurly="plan">
              <option value="simpleplan" selected>Simple Plan</option>
              <option value="complexplan">Pro Plan</option>
            </select>
            <label htmlFor="plan-quantity">Quantity</label>
            <input type="text" data-recurly="plan_quantity" id="plan-quantity" defaultValue={2} />
          
            <label htmlFor="country">Country</label>
            <select id="country" data-recurly="country">
              <option value="US">United States</option>
              <option value="GB">Great Britain</option>
            </select>
            <label htmlFor="postal_code">Postal Code</label>
            <input type="text" data-recurly="postal_code" id="postal_code" />
         
            <p id="addons-title">Add-ons</p>
            <p id="addons" />
            <p>Coupon</p>
            <input type="text" data-recurly="coupon" defaultValue="test" />
            <input type="radio" defaultValue="USD" name="currency" data-recurly="currency" id="currency-USD" defaultChecked />
            <label htmlFor="currency-USD">USD</label>
            <CreditCard/>
            <input type="hidden" data-recurly="token" name="recurly-token" />
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
                <span data-recurly="currency_symbol" />
                <span data-recurly="total_now" />
              </li>
            </ul>
            <p>
              Due later
            </p>
            <ul>
              <li>
                Discount:
                <span data-recurly="currency_symbol" />
                <span data-recurly="discount_next" />
              </li>
              <li>
                Subtotal:
                <span data-recurly="currency_symbol" />
                <span data-recurly="subtotal_next" />
              </li>
              <li>
                Tax:
                <span data-recurly="currency_symbol" />
                <span data-recurly="taxes_next" />
              </li>
              <li>----</li>
              <li>
                Total:
                <span data-recurly="currency_symbol" />
                <span data-recurly="total_next" />
              </li>
            </ul>
            <button id="subscribe">Subscribe</button>
            <div id="errors" />
          </form>
        </div>
        </div>
      );
    }
  };


  const authCondition = (authUser) => !!authUser;


export default withAuthorization(authCondition)(withRouter(Billing));