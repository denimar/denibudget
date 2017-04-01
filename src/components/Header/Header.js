import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (

  <div className="main-header">

    <div className="navigation">
      <IndexLink to='/bill' activeClassName="route-active"> Bills </IndexLink>
      <IndexLink to='/statement' activeClassName="route-active"> Statements </IndexLink>      
      <IndexLink to='/account' activeClassName="route-active"> Accounts </IndexLink>
      <IndexLink to='/category' activeClassName="route-active"> Categories </IndexLink>
      <IndexLink to='/customer' activeClassName="route-active"> Customers </IndexLink>
      <IndexLink to='/counter' activeClassName="route-active"> Counter </IndexLink>
    </div>

  </div>

)

export default Header
