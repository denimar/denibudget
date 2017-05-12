import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (

  <div className="main-header">

    <div className="navigation">
      <IndexLink to='/' activeClassName="route-active"> Budgets </IndexLink>      
      <IndexLink to='/transaction' activeClassName="route-active"> Transactions </IndexLink>
      <IndexLink to='/statement' activeClassName="route-active"> Statements </IndexLink>
      <IndexLink to='/account' activeClassName="route-active"> Accounts </IndexLink>
      <IndexLink to='/category' activeClassName="route-active"> Categories </IndexLink>
    </div>

  </div>

)

export default Header
