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
          rejectFn(err);
        });
    });
  }

}

export default AjaxRoutine;
