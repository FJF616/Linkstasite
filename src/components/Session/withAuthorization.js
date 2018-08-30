import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
// import InstagramLogin from '../../util/InstagramLogin';
import { firebase } from '../rebaseConfig';
import * as routes from '../constants/routes';
import HeaderNonAuth from '../Header/HeaderNonAuth'
// import InstagramConsumer from '../Session/InstagramProvider'
const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
    
        if (!condition(authUser)) {
          this.props.history.push(routes.GUEST_PAGE);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser 
    
                  ? <Component />
                  : <HeaderNonAuth/>}
           
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;