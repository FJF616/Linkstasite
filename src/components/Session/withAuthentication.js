import React from 'react';
import AuthUserContext from './AuthUserContext';
// import InstagramLogin from '../../util/InstagramLogin';
// import InstagramProvider from '../Session/InstagramProvider'

import { firebase }  from '../rebaseConfig';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.removeListener = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }
    componentWillUnmount() {
      this.removeListener()
    }
    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
           
            <Component />
           
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;