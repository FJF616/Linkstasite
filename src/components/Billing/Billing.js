import React, { Component } from 'react';
import './billing.scss';
import withAuthentication from '../Session/withAuthentication';

 class Billing extends Component {
    render() {
      return (
        <div>
          <title>Recurly.js Example: Advanced Pricing</title>
          <link href="/js/favicon.png" rel="shortcut icon" type="image/png" />
          <link href="https://js.recurly.com/v4/recurly.css" rel="stylesheet" type="text/css" />
          <link href="//fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
          <style dangerouslySetInnerHTML={{__html: "\n      select, input { display: block; }\n      input[type=radio] { display: inline; }\n    " }} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <form method="post" action="/api/subscriptions/new">
            <label htmlFor="plan">Plan</label>
            <select id="plan" data-recurly="plan">
              <option value="simpleplan" selected>Simple Plan</option>
              <option value="complexplan">Complex Plan</option>
            </select>
            <label htmlFor="plan-quantity">Quantity</label>
            <input type="text" data-recurly="plan_quantity" id="plan-quantity" defaultValue={2} />
            <label htmlFor="number">Card Number</label>
            <div data-recurly="number" id="number" />
            <label htmlFor="month">Month</label>
            <div data-recurly="month" id="month" />
            <label htmlFor="year">Year</label>
            <div data-recurly="year" id="year" />
            <label htmlFor="cvv">CVV</label>
            <div data-recurly="cvv" id="cvv" />
            <label htmlFor="first_name">First Name</label>
            <input type="text" data-recurly="first_name" id="first_name" name="first-name" />
            <label htmlFor="last_name">Last Name</label>
            <input type="text" data-recurly="last_name" id="last_name" name="last-name" />
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
      );
    }
  };

  export default withAuthentication(Billing);