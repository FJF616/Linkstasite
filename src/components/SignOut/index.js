import React, { Component } from 'react';
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
import { auth } from '../rebaseConfig';
import { base } from '../rebaseConfig/firebase';
// import InstagramLogin from '../../util/InstagramLogin'

   
class SignOutButton extends Component {
    state = { authenticated : ''}

    componentWillMount() {
        this.authenticatedRef = base.syncState('authenticated', {
            context: this,
            state: 'authenticated'
        });
    }

    changeAuth = () => {
        this.setState({ authenticated: false });
    }

    componentWillUnmount() {
        base.removeBinding(this.authenticatedRef);
    }
    
    render() {
        return (
            <div onClick={this.changeAuth} style={{backgroundColor: 'transparent'}}>
                <a onClick={auth.doSignOut}  href="http://instagram.com/accounts/logout/" style={{cursor: 'pointer'}}>
                <Icon icon={ICONS.LOGOUT} size={125} mode={"contain"} color={"goldenrod"}/></a> 
            </div>
        );
    }
}
export default SignOutButton;
