import React from 'react';
import './Login.scss';
import { I18n, Translate } from 'react-redux-i18n';
import TiUserOutline from 'react-icons/lib/ti/user-outline';
import LoginService from '../modules/LoginService';
import AuthenticationRoutine from '../../../util/AuthenticationRoutine';
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'flex';

    this.clearForm();
  }

  clearForm() {
    let loginForm = document.querySelector('#login-form');
    let nickNameInput = loginForm.querySelector('input[name=userName]');
    nickNameInput.value = null;

    setTimeout(() => {
      nickNameInput.focus();
    }, 500);

    let passwordInput = loginForm.querySelector('input[name=password]');
    passwordInput.value = null;
  }

  loginButtonClick() {
    let loginForm = document.querySelector('#login-form');
    let nickName = loginForm.querySelector('input[name=userName]').value;
    let password = loginForm.querySelector('input[name=password]').value;

    LoginService
      .authenticate(nickName, password)
      .then((response) => {
        if (response.success) {
          window.location = "/budget";
        } else {
          this.refs.dialog.show({
            title: 'Login',
            body: I18n.t('login.authentication.failureMsg'),
            actions: [
              Dialog.DefaultAction('Ok', () => {
                this.clearForm();
              })
            ]
          })
        }
      });
  }

  render() {
    return (
      <div className="login-viewport">
        <Dialog ref='dialog'/>
        <div className="login-container" style={{display: "none"}}>
          <div className="login-box">
            <div className="login-title">Login - Budget</div>
            <div className="login-image">
              <TiUserOutline size="64" />
            </div>

            <form id="login-form">
              <div className="login-field">
                <select className="login-field-input">
                  <option value="oficial">Base Oficial on MapLab</option>
                  <option value="teste">Base Teste on MapLab</option>
                </select>
              </div>
              <div className="login-field">
                <input type="text" name="userName" className="login-field-input" placeholder={I18n.t('login.user')} />
              </div>
              <div className="login-field">
                <input type="password" name="password" className="login-field-input" placeholder={I18n.t('login.password')} />
              </div>
            </form>

            <div className="login-button" onClick = {this.loginButtonClick.bind(this)}>
              <Translate value="login.buttonText" />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Login;
