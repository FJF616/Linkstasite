import React from 'react';
import './Media.scss';


const Media = ({media, removeImage}) => {
    return (
        <div className='media__image'>
         <img  src={media.src} alt='1'/>
        </div>
      );
    }

export default Media;
