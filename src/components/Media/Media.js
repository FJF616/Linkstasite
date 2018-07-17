import React from 'react';
import './Media.scss';
import Imager from '../Imager/Imager'


const Media = ({media}) => {
    return (
        <div className='media__image'>
         <Imager src={media.src} height={225} width={225} mode={"contain"}/>
        </div>
      );
    }

export default Media;
