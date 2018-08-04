import React, { Component } from 'react';
import StickyBox from 'react-sticky-box'; 
// import Delay from 'react-delay'
import './SideBar.scss'
import  'bootstrap/dist/css/bootstrap.css';
import StripeForm from '../PaymentForm/StripeForm';
import Icon from '../Icons/Icon'
import ICONS from '../Icons/constants';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom'
import { base } from '../rebaseConfig/firebase';
// import ListView from '../ListView/ListView'
// import Imager from '../Imager/Imager'
// import MicrolinkCard from 'react-microlink'
export default class SideBar2 extends Component {
    constructor() {
        super();
        this.state = {
        view: ''
    }
    this.gridView.bind(this);
    this.listView.bind(this);
}
    listView() {
        this.setState({
            view: 'listView'
        })
    }

    gridView() {
        this.setState({
            view: 'gridView'
        })
    }
    // hydrateStateWithLocalStorage() {
    //     for (let key in this.state) {
    //         if (localStorage.hasOwnProperty(key)) {
    //             let value = localStorage.getItem(key);

    //             try {
    //                 value = JSON.parse(value);
    //             } catch (e) {
    //                 this.setState({ [key]: value });
    //             }
    //         }
    //     }
    // }
    // componentDidMount() {
    //    this.hydrateStateWithLocalStorage();
    //    window.addEventListener(
    //        "beforeunload",
    //        this.saveStateToLocalStorage.bind(this)
    //    );
    // }

    // componentWillUnmount() {
    //     window.removeEventListener(
    //         "beforeunload",
    //         this.saveStateToLocalStorage.bind(this)
    //     );
    //     this.saveStateToLocalStorage();
    // }

   
    // saveStateToLocalStorage() {
    //     for (let key in this.state) {
    //         localStorage.setItem(key, JSON.stringify(this.state[key]));
    //     }
    // }

    // updateInput(key, value) {
    //     this.setState({ [key]: value });
    //     localStorage.setItem(key, value);
    // }


    
    
    
    render(){
      return(
     
            <StickyBox className="sideBar" style={{  paddingTop: 45, border: '5px outset',  width: 215, borderColor: 'lightpink' }} >

                <div className="sideItem">

                    <ul className="sidelist" style={{listStyleType: 'none'}}>

                        <li ><Link to={routes.LANDING} ><Icon className="listItem" icon={ICONS.INSTAGRAM} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li><Link to={routes.BILLING}><Icon className="listItem" icon={ICONS.CREDITCARD} size={95} mode={"contain"} color={"white"} /></Link></li>
                        <li><Link to={routes.ACCOUNT}><Icon className="listItem" icon={ICONS.SETTINGS} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li ><Link  to={routes.LIST_VIEW}><Icon className="listItem" icon={ICONS.THLIST2} size={95} mode={"contain"} color={"white"}/></Link></li>
                        <li  ><Link to={routes.GRID_VIEW}><Icon className="listItem" icon={ICONS.GRID} size={95} mode={"contain"} color={"white"}/></Link></li> 
                       {/* <li><a href="https://instagram.com/accounts/logout/" width="0" height="0" title="logout" >Logout of Instagram</a></li>*/}
                    </ul>
                    <h6 style={{paddingTop: '65px', paddingBottom: '100px', color: 'grey'}}><b>Upgrade to Pro Subscription  For Only $9.99!</b></h6>
                    <br/>
                    

                    <StripeForm />
                </div>
               

            </StickyBox>
           
       
      );
    }
}