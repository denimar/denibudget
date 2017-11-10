import axios from 'axios';
import AuthenticationRoutine from './AuthenticationRoutine';

class AjaxRoutine {

  static get(url) {
    let requestConfig = {
      //baseURL: 'https://some-domain.com/api/',
      //timeout: 1000,
      headers: {
        'x-access-token': AuthenticationRoutine.getConnectedUserToken()
      }
    };

    return new Promise((resolveFn, rejectFn) => {
      axios.get(url, requestConfig)
        .then(response => {
          resolveFn(response);
        })
        .catch((err) => {
          let responseError = err.response || {data: {}};

          if (responseError.data.class == 'TokenExpiredError' || responseError.data.class == 'NoTokenProvideError') {
            window.location = "/login";
          } else {
            rejectFn(err);
          }
        });
    });
  }

}

export default AjaxRoutine;
