import React, { Component } from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/fonts/font-awesome.min.css';
// import DropDown from '../DropDownButton/DropDown';
import './assets/css/Pretty-Header.css'
import AvatarEditor from 'react-avatar-editor';
import InstagramConsumer from '../Session/InstagramProvider'
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
export default class NewHeader extends Component {
    render() {
      return (
       
        <div className="custom-header">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
          <nav className="navbar navbar-light navbar-expand-md custom-header" style={{backgroundColor: 'rgb(124,65,135)'}}>
            <div className="container-fluid"><a className="navbar-brand" href="#" style={{backgroundColor: 'rgb(124,65,139)'}}>Linksta<span style={{color: 'rgb(64,137,223)'}}>Site</span> </a><button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
              <div className="collapse navbar-collapse" id="navbar-collapse">
                <ul className="nav navbar-nav links">
                  <li className="nav-item" role="presentation"><Link to={routes.HOME} style={{backgroundColor: 'rgb(124,65,135)', margin: '5px'}}>Home</Link></li>
                  <li className="nav-item" role="presentation"><Link to={routes.ACCOUNT} style={{backgroundColor: 'rgb(124,65,135)', margin: '5px' }}>MyAccount</Link></li>
                  <li className="nav-item" role="presentation"><Link to={routes.HOME} style={{backgroundColor: 'rgb(124, 65, 135)', margin: '5px'}}> Gallery</Link></li>
     
                </ul>
              
             
               
                <AvatarEditor className="badge" 
               
               
              image={'../images/ins4.jpg'}
              width={55}
              height={55}
              border={6}
              color={[185, 253, 255, 0.074]} // RGBA
              scale={1.25}
              rotate={1}
          
           
            /> 
            
          
           
              </div>
            </div>
          </nav>
        
        </div>
      
      );
    }
  };