import axios from 'axios';
import AuthenticationRoutine from './AuthenticationRoutine';

class AjaxRoutine {

  static get(url) {
    return new Promise((resolveFn, rejectFn) => {
      axios.get(url)
        .then(response => {
          resolveFn(response);
        })
        .catch((err) => {
          let responseError = err.response || {data: {}};

          if (responseError.data.class == 'TokenExpiredError' || responseError.data.class == 'NoTokenProvidedError') {
            window.location = "/login";
          } else {
            rejectFn(err);
          }
        });
    });
  }

}

export default AjaxRoutine;
