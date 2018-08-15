import React from 'react'
// import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const CreditCard= () => (
  <Styles>
  
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        reset,
        submitting,
        pristine,
        values,
        active
      }) => {
        return (
          <form style={{marginTop: '25px', height: '795px', border: '5px ridge', borderColor: 'pink'}} onSubmit={handleSubmit}>
          <h3> Save Payment Info </h3>
          <Card
               number={values.number || ''}
               name={values.name || ''}
               expiry={values.expiry || ''}
               cvc={values.cvc || ''}
               focused={active}
            />
            <div>

              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
           
       
        <h3>Upgrade to Pro Subscription and receive access to full Instagram gallery and unlimited clicks on affiliate links!</h3>
          </form>
        )
      }}
    />
  </Styles>
)
export default CreditCard;