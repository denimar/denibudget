var cookie = require('js-cookie');

class WebRoutine {

  static getCookie(cookieName) {
    return cookie.get(cookieName);
  }
}

export default WebRoutine;
