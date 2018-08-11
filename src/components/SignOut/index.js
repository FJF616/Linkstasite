import React from 'react';
import ICONS from '../Icons/constants'
import Icon from '../Icons/Icon'
import { auth } from '../rebaseConfig';
// import InstagramLogin from '../../util/InstagramLogin'

const SignOutButton = () =>
<a onClick={auth.doSignOut}  href="http://instagram.com/accounts/logout/" style={{cursor: 'pointer'}}>
<Icon icon={ICONS.LOGOUT} size={125} mode={"contain"} color={"goldenrod"}/></a>

export default SignOutButton;
