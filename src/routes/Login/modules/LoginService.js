import axios from 'axios';
import commonConstant from '../../../../common/common.constant'

class LoginService {

  static authenticate(nickName, password) {
    return new Promise((successFn, failureFn) => {
      const url = commonConstant.ENDPOINT.LOGIN + '/authenticate';

      axios.post(url, {
          nickName: nickName,
          password: password
      })
      .then((response) => {
        successFn(response.data);
      })
      .catch((err) => {
        console.warn(err);
        failureFn(err);
      });
    });
  }

  static getConnectedUserToken() {
    return _getCookie('token');
  }

}

function _getCookie(cookieName) {
    let cookieNameAndIgual = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieNameAndIgual) == 0) {
            return cookie.substring(cookieNameAndIgual.length, cookie.length);
        }
    }
    return '';
}


export default LoginService;
