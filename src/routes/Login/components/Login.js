import React from 'react';
import './Login.scss';
import { I18n, Translate } from 'react-redux-i18n';
import TiUserOutline from 'react-icons/lib/ti/user-outline';
import LoginService from '../modules/LoginService';
import AuthenticationRoutine from '../../../util/AuthenticationRoutine';
import 'bootstrap/dist/css/bootstrap.css'

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'flex';

    this.clearForm();
  }

  getFormValues() {
    let loginForm = document.querySelector('#login-form');
    let database = loginForm.querySelector('select[name=database]').value;
    let nickName = loginForm.querySelector('input[name=userName]').value;
    let password = loginForm.querySelector('input[name=password]').value;
    return {
      database: database,
      nickName: nickName,
      password: password
    }
  }

  clearForm() {
    let loginForm = document.querySelector('#login-form');
    let nickNameInput = loginForm.querySelector('input[name=userName]');
    nickNameInput.value = null;
    let passwordInput = loginForm.querySelector('input[name=password]');
    passwordInput.value = null;

    nickNameInput.focus();
  }

  checkDisableLoginButton() {
    let form = this.getFormValues();
    let loginButton = document.querySelector('#login-button');
    loginButton.classList.remove('disabled');
    if (!(form.nickName && form.password)) {
      loginButton.classList.add('disabled');
    }
  }

  showMessage(message) {
    let loginMessages = document.querySelector('#login-messages');
    loginMessages.innerHTML = message;
    loginMessages.style.display = 'block';
  }

  onChangeInputs() {
    this.checkDisableLoginButton();
  }

  onKeydownInputs(event) {
    if (event.keyCode === 13) {
      let loginButton = document.querySelector('#login-button');
      let isLoginButtonDisable = loginButton.classList.contains('disabled');
      if (!isLoginButtonDisable) {
        this.loginButtonClick.call(this);
      }
    }
  }

  loginButtonClick() {
    let form = this.getFormValues();

    LoginService
      .authenticate(form.database, form.nickName, form.password)
      .then((response) => {
        if (response.success) {
          window.location = "/budget";
        } else {
          this.showMessage(I18n.t('login.authentication.failureMsg'));
          this.clearForm();
        }
      });
  }

  render() {
    return (
      <div className="login-viewport">
        <div className="login-container" style={{display: "none"}}>
          <div className="login-box-and-messages">
            <div className="login-box">
              <div className="login-title">Login - Budget</div>
              <div className="login-image">
                <TiUserOutline size="64" />
              </div>

              <form id="login-form">
                <div className="login-field">
                  <select name="database" className="login-field-input">
                    <option value="oficial">Base Oficial on MapLab</option>
                    <option value="demo">Base Teste on MapLab</option>
                  </select>
                </div>
                <div className="login-field">
                  <input type="text" name="userName" className="login-field-input" onChange={this.onChangeInputs.bind(this)} onKeyDown={this.onKeydownInputs.bind(this)} placeholder={I18n.t('login.user')} />
                </div>
                <div className="login-field">
                  <input type="password" name="password" className="login-field-input" onChange={this.onChangeInputs.bind(this)} onKeyDown={this.onKeydownInputs.bind(this)} placeholder={I18n.t('login.password')} />
                </div>
              </form>

              <div id="login-button" className="login-button disabled" onClick = {this.loginButtonClick.bind(this)}>
                <Translate value="login.buttonText" />
              </div>
            </div>
            <div id="login-messages" style={{display: 'none'}} className="login-messages" />
          </div>
        </div>
      </div>
    )
  }

}

export default Login;
