import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import InstagramLogin from '../../util/InstagramLogin';
import { firebase, auth } from '../rebaseConfig';
import * as routes from '../../constants/routes';
import InstagramConsumer from '../Session/InstagramProvider'
const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
          // if(authUser && authUser.uid) return;
          // if (authUser) {
          //   this.instagramtokenRef = firebase.db.ref('/instagramAccesstoken/' + authUser.id )

          // }
       
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser 
          
               
              
                  ?  <Component />
                  :  null}
           
         
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;