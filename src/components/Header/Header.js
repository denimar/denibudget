import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import { Translate } from 'react-redux-i18n';
import wplexLogo from '../../images/wplex-logo.png';
import tripManagerLogo from '../../images/trip-manager-logo.png';
import GoThreeBars from 'react-icons/lib/go/three-bars';

// let headerElem = (
//   <div className="main-header">
//   </div>
// );


let headerElem = (

  <div className="main-header">

    <GoThreeBars className="header-hamburger-menu" color='#006699' size=" 22" />
    <img className="wplex-logo" src={ wplexLogo } />
    <img className="trip-manager-logo" src={ tripManagerLogo } />
    <div className="trip-manager-title">Trip Manager</div>

    <div className="navigation">
      <IndexLink to='/account' activeClassName="route-active"><Translate value="tabs.accounts"/></IndexLink>
      <IndexLink to='/vehicle/examples' activeClassName="route-active"><Translate value="tabs.vehicle"/></IndexLink>
      <IndexLink to='/trip/examples' activeClassName="route-active"><Translate value="tabs.trip"/></IndexLink>
      <IndexLink to='/trips/examples' activeClassName="route-active"><Translate value="tabs.trips"/></IndexLink>
      <IndexLink to='/itinerary/examples' activeClassName="route-active"><Translate value="tabs.itinerary"/></IndexLink>
      <IndexLink to='/itineraries/examples' activeClassName="route-active"><Translate value="tabs.itineraries"/></IndexLink>
    </div>

  </div>
);


//let inLoginPage = location.pathname == '/' || location.pathname == '/login';

//export const Header = () => inLoginPage ? null : headerElem

//if (location.pathname === '/') {
//  location.pathname = '/budget';
//}

export const Header = () => headerElem

export default Header
