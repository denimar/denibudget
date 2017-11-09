import React from 'react';
import './Login.scss';
import { I18n, Translate } from 'react-redux-i18n';
import TiUserOutline from 'react-icons/lib/ti/user-outline';
import LoginService from '../modules/LoginService';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'flex';
  }

  loginButtonClick() {
    LoginService
      .authenticate('denimar', '123')
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="login-viewport">
        <div className="login-container" style={{display: "none"}}>
          <div className="login-box">
            <div className="login-title">Login - Budget</div>
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
            <div className="login-button" onClick = {this.loginButtonClick}>
              <Translate value="login.buttonText" />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Login;
