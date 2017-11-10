import WebRoutine from './WebRoutine';

class AuthenticationRoutine {

  static getConnectedUserToken() {
    return WebRoutine.getCookie('auth') || '';
  }

}

export default AuthenticationRoutine;
