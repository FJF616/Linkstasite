import React, { Component } from 'react';
import './NewPara.css';
import Footer from '../Footer/Footer';
import Imager from '../Imager/Imager';
// import MicrolinkCard from 'react-microlink';
export default class NewPara extends Component {
    render () {
      return (
        <div>

          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Untitled</title>
         
          <div>
            <div className="parallax">
              <div id="group1" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title">
                    <p>Base layer</p>
                    <Imager style={{position: 'relative'}} src={('../images/linkstasitepic.PNG')} height={245} width={245} mode={'contain'}/>

                  </div>
                </div>
              </div>
              <div id="group2" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title">
                    <p>Base layer</p>
               

                  </div>
                </div>
                <div className="parallax-layer scroll-level-back">
                  <div className="title">
                    <p>Background layer</p>
                  </div>
                </div>
              </div>
              <div id="group3" className="parallax-group">
                <div className="parallax-layer scroll-level-fore">
                  <div className="title">
                    <p>Foreground layer</p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-base">
                  <div className="title">
                    <p>Base layer</p>
                  </div>
                </div>
              </div>
              <div id="group4" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title">
                    <p>Base layer</p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-back">
                  <div className="title">
                    <p>Background layer</p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-deep">
                  <div className="title">
                    <p>Deep Background layer</p>
                  </div>
                </div>
              </div>
              <div id="group5" className="parallax-group">
                <div className="parallax-layer scroll-level-fore">
                  <div className="title">
                    <p>Foreground layer</p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-base">
                  <div className="title">
                    <p>Base layer</p>
                  </div>
                </div>
              </div>
              <div id="group6" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title">
                    <p>Base layer</p>
                  </div>
                </div>
                <div className="parallax-layer scroll-level-back">
                  <div className="title">
                    <p>Background layer</p>
                  </div>
                </div>
              </div>
              <div id="group7" className="parallax-group">
                <div className="parallax-layer scroll-level-base">
                  <div className="title">
                    <p>Base layer</p>

                    <Footer/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };