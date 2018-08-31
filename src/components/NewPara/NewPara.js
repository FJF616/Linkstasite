import React, { Component } from 'react';
import './NewPara.css';
import TestFooter from '../TestFooter/TestFooter';
import Imager from '../Imager/Imager';
// import MicrolinkCard from 'react-microlink';
export default class NewPara extends Component {
    render () {
      return (
        <div>

          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>LinkstaSite</title>
         
          <div>
            <div className="parallax">
              <div id="group1" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                <Imager style={{position: 'relative'}} src={('../images/linkstasitepic.PNG')} height={245} width={245} mode={'contain'}/>
                  <div className="title">

                    <p><h1><b>Make the most out of your experiences...</b></h1></p>
                   

                  </div>
                </div>
              </div>
              <div id="group2" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title" style={{color: 'aquamarine'}}>
                    <p><h2><b>Your Images</b></h2></p>
               

                  </div>
                </div>
                <div className="parallax-layer scroll-level-back">
                  <div className="title" style={{color: 'aliceblue'}}>
                    <p><h2><b>Your Experiences..</b></h2></p>
                  </div>
                </div>
              </div>
              <div id="group3" className="parallax-group">
                <div className="parallax-layer scroll-level-fore">
                  <div className="title" style={{color: 'plum'}}>
                    <p><h1><b>New Links</b></h1></p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-base">
                  <div className="title"style={{color: 'purple'}} >
                    <p><h2><b>New Opportunities</b></h2></p>
                  </div>
                </div>
              </div>
              <div id="group4" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title" style={{color: 'goldenrod'}}>
                    <p><h1><b>Why not.....</b></h1></p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-back">
                  <div className="title" style={{color: 'lime'}}>
                    <p><h1><b>Bring it all together?</b></h1></p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-deep">
                  <div className="title" style={{color: 'paleturquoise'}}>
                    <p><h1><b>Let All Your Experience</b></h1></p>
                  </div>
                </div>
              </div>
              <div id="group5" className="parallax-group">
                <div className="parallax-layer scroll-level-fore">
                  <div className="title" style={{color: 'skyblue'}}>
                    <p><h1><b>Create All New Opportunities</b></h1></p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-base">
                  <div className="title" style={{color: 'orange'}}>
                    <p><h1><b>Let Your Experiences</b></h1></p>
                  </div>
                </div>
              </div>
              <div id="group6" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title" style={{color: 'white'}}>
                    <p><h1><b>Bring New Opportunities</b></h1></p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-back">
                  <div className="title" style={{color: 'gold'}}>
                    <p><h2><b>It's Up To You....</b></h2></p>
                  </div>
                </div>
              </div>
              <div id="group7" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title" style={{color: 'purple'}}>
                    <p><h1><b>How Many Opportunities Will You Create?</b></h1></p>
                    
                    
                 
                   </div>
                  
                </div>
               
              </div>
            </div>
          
          </div>
          <TestFooter/>
        </div>
      );
    }
  };