import React from 'react';
import './Login.scss';
import { I18n, Translate } from 'react-redux-i18n';
import TiUserOutline from 'react-icons/lib/ti/user-outline';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-viewport">
        <div className="login-container">
          <div className="login-box">
            <div className="login-title">Budget - Login</div>
            <div className="login-image">
              <TiUserOutline size="64" />
            </div>

            <div className="login-field">
              <select className="login-field-input">
                <option value="oficial">Base Oficial on MapLab</option>              
                <option value="teste">Base Teste on MapLab</option>
              </select>
            </div>
            <div className="login-field">
              <input type="text" className="login-field-input" placeholder={I18n.t('login.user')} autoFocus />
            </div>
            <div className="login-field">
              <input type="password" className="login-field-input" placeholder={I18n.t('login.password')} />
            </div>
            <div className="login-button"><Translate value="login.buttonText" /></div>
          </div>
        </div>
      </div>
    )
  }

}

export default Login;
