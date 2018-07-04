import React from 'react';
import './Header.scss';
import  'bootstrap/dist/css/bootstrap.css';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthentication from '../Session/withAuthentication';
import Imager from '../Imager/Imager'
// import instaUser from '../../util/instaUser'
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
// import MicrolinkCard from 'react-microlink'
import { Card, Col, Row } from 'reactstrap';
import AvatarEditor from 'react-avatar-editor'
// import { Link } from 'react-router-dom';
// import { auth } from '../firebase';
class Header extends React.Component {
  render () {
    return (
     
      <div className="header">
      <nav style={{backgroundColor: 'rgba(86, 59, 136, 95%)', height: 95, }} className="navbar navbar-expand-lg  fixed-top">
      
      <div className="collapse navbar-collapse" id="navbarResponsive">
     


      <ol class="breadcrumb" aria-label="Left Align">
      <li class="breadcrumb-item active" aria-current="page">Home</li>

        <li class="breadcrumb-item"><a href="#">Account Settings</a></li>
        <li class="breadcrumb-item"><a href="#">Billing</a></li>
        <li class="breadcrumb-item active" aria-current="page">Pictures</li>
      </ol>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
         
          <div className="container">
         
            <ul className="navbar-nav ml-auto float float-right" style={{paddingTop: 65}} >
            {/*
            <li>  <button style={{backgroundColor: 'purple', margin: 10}}><Icon icon={ICONS.THLIST} size={22} color={"aliceblue"} style={{paddingTop: '5px'}} /></button>
            <button style={{backgroundColor: 'purple', marginRight: 5}}><Icon icon={ICONS.TH} size={22} color={"aliceblue"} style={{paddingTop: '5px'}} /></button></li>
            */}
            
            <li className="nav-item active">
                <a className="nav-link" href="#" style={{marginRight: 1}}><Icon   icon={ICONS.HOME} size={65} mode={"contain"} color={"white"}/>
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              
           
              <li className="nav-item">
                <a className="nav-link" href="#"><Icon   icon={ICONS.INTERNET} size={125} mode={"contain"} color={"white"}/></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ marginLeft: '-55px'}} href="#"><Icon   icon={ICONS.MAIL} size={125} mode={"contain"} color={"white"}/></a>
              </li>
              <li className="nav-item">
              <a className="nav-link" style={{ marginLeft: '-55px'}} href="#"><Icon icon={ICONS.LOGOUT} size={125} mode={"contain"} color={"white"}/></a>
           
              </li>
          
             
              
            </ul>
           
          </div>
          <div>
          <Card className="profile">
          <Row className="profile__container">
              <AvatarEditor className="avatar__img"
              image={this.props.medias['1']}
              width={55}
              height={55}
              border={6}
              color={[185, 253, 255, 0.074]} // RGBA
              scale={1.75}
              rotate={0}
              />  
             <div >
             <h5> <p><b className="userId" >{this.props.medias['2']}</b></p></h5> 
                 
              </div>                 
          </Row>
        </Card>
        </div>
       
      </div>
      </nav> 
      </div>
    
    );
  }
}



export default compose(withAuthentication(Header));
