import React from 'react';
import shortenLink from './bitly'
function handleChange(e) {
    const target = e.target;
    let value = target.value;
    this.setState ({
        url: value 
    })
}

export  const UrlShortenerField = ({ url }) => {
   
    return (
        <span><input onChange={() => handleChange} placeholder="enter url" type="url" name="url"/><button onClick={() => shortenLink(url)}></button> </span>
    );
}