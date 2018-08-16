// import React, { Component } from 'react';
import merge from 'deepmerge';
import InstagramLogin from './InstagramLogin';
import { base } from '../components/rebaseConfig/firebase';


export const fetchPro = () => {
   return InstagramLogin.getProGallery();
};
const MergeGalleries = () => {
    const extendGallery = fetchPro();
    base.fetch('gallery', {
        context: this,
    })
    .then(galleryData => {
        const mergedGallery =  merge(galleryData, extendGallery);
        // const proGalleryLocation = 
        base.push('proImageGallery', {
            data: { images: mergedGallery },
            then(err) {
                if(!err) {
                 console.log('uploaded instagram images to firebase');
                }
              }
            });

            //available immediately, you don't have to wait for the callback to be called
            // const proGalleryKey = proGalleryLocation.key;
          })
          .catch(err => {
              console.log('failed to create pro gallery, please check firebase settings', err);
          })
        } 

export default  MergeGalleries;