import React from 'react'
const BitlyAPI = require('node-bitlyapi');
const CLIENT_ID = 'f917135d477d7653ab28557b83c765d769a824c4';
const CLIENT_SECRET = 'f917135d477d7653ab28557b83c765d769a824c4';
const access_token = 'd00a795d6ce23f36ca494486da00dcabe09e539f';

const Bitly = new BitlyAPI({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
    });

Bitly.setAccessToken(access_token);


class LinkShortener extends React.Component ({
 shortenLink(url) {
     Bitly.shortenLink(`${url}`, function(err, results) {
        const shortLink = results.data;
        console.log('shortlink', shortLink);
        return shortLink;
        }).catch(err => {
            if (err && err.message) {
                console.log('error', err.message);
            };
        });
    }
    const validate = values => {
        const errors = {};
        if (!values.required) {
          errors.required = 'This field is required';
        }
        // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //   errors.email = 'Please enter a valid email';
        // }
        // if (values.number && _.isNaN(values.number)) {
        //   errors.number = 'Please enter a number';
        // }
        if (values.url && !/^https?:\/\//i.test(values.url)) {
          errors.url = 'Please enter a valid URL';
        } 
    render() {
        return(

        );
    }

})
export default LinkShortener;