import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import { Translate } from 'react-redux-i18n';

let headerElem = (
  <div className="main-header">

    <div className="navigation">
      <IndexLink to='/budget' activeClassName="route-active"><Translate value="tabs.budgets"/></IndexLink>
      <IndexLink to='/transaction' activeClassName="route-active"><Translate value="tabs.transactions"/></IndexLink>
      <IndexLink to='/statement' activeClassName="route-active"><Translate value="tabs.statements"/></IndexLink>
      <IndexLink to='/account' activeClassName="route-active"><Translate value="tabs.accounts"/></IndexLink>
      <IndexLink to='/category' activeClassName="route-active"><Translate value="tabs.categories"/></IndexLink>
    </div>

  </div>
);

let inLoginPage = location.pathname == '/' || location.pathname == '/login';

export const Header = () => inLoginPage ? null : headerElem

export default Header
