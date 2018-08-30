import React, { Component } from 'react';
import { base } from '../rebaseConfig/firebase'
import './Account.css';
import AuthUserContext from '../Session/AuthUserContext';
import withAuthorization from '../Session/withAuthorization';
import SideBar2 from '../SideBar/SideBar2'
import AvatarEditor from 'react-avatar-editor'
import Header from '../Header/Header'
// import PasswordForgetForm from '../PasswordForget/index'
// import PasswordChangeForm from '../PasswordChange/index'

 class AccountSettings extends Component { 
   state = {
     userProfile: []
   }
     handleChange = (e) => {
       const target =  e.target;
       const value = target.value;
       const name = target.name;
       this.setState ({
         userProfile: {
            [name]: value
         }
       })
       
     }
     componentDidMount() {
       base.syncState('userProfile', {
         context: this,
         state: 'userProfile'
       });
     }
     render() {
       return (
        <AuthUserContext.Consumer>
        {authUser =>
         
          <div className="App" >
         
          <Header/>
          <SideBar2/>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
       
          <div className="container profile profile-view" id="profile" >
            <div className="row">
              <div className="col-md-12 alert-col relative">
                <div className="alert alert-info absolue center" role="alert"><button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><span>Profile save with success</span></div>
              </div>
            </div>
            <form>
              <div className="form-row profile-row">
                <div className="col-md-4 relative">
                <AvatarEditor style={{borderRadius: '50%', marginLeft:'calc(50% - 100px)'}} className="avatar__img"
                image={this.state.userProfile.profilePic}
                width={55}
                height={55}
                border={45}
                color={[185, 253, 255, 0.074]} // RGBA
                scale={3}
                rotate={1}
                /> 
                <h5>  Instagram Profile: {this.state.userProfile.userName}</h5>
                <p>  Instagram ID: {this.state.userProfile.instagramUserID}</p>
                  {/*<div className="avatar">
        <div className="avatar-bg center" />*/}
                  {/*</div>*/}<input type="file" className="form-control" name="avatar-file" /></div>
                <div className="col-md-8">
                  <h1>Profile: {authUser.email}</h1>
                  
                  <hr />
                  <div className="form-row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>First name </label><input placeholder={this.state.userProfile.firstname} onChange={this.handleChange} className="form-control" type="text" name="firstname" /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>Last name </label><input placeholder={this.state.userProfile.lastname} onChange={this.handleChange} className="form-control" type="text" name="lastname" /></div>
                    </div>
                  </div>
                  <div className="form-group"><label>Email </label><input placeholder={this.state.userProfile.email} onChange={this.handleChange} className="form-control" type="email" autoComplete="off" required name="email" /></div>
                  <div className="form-row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>Password </label><input onChange={this.handleChange} className="form-control" type="password" name="password" autoComplete="off" required /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group"><label>Confirm Password</label><input onChange={this.handleChange} className="form-control" type="password" name="confirmpass" autoComplete="off" required /></div>
                    </div>
                  </div>
                  <hr />
                  <div className="form-row">
                    <div className="col-md-12 content-right"><button className="btn btn-primary form-btn" type="submit">SAVE </button><button className="btn btn-danger form-btn" type="reset">CANCEL </button></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      
        }
     
        </AuthUserContext.Consumer>
      )
    } 
  }
  

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(AccountSettings);