import axios from 'axios';
import commonConstant from '../../../../common/common.constant'

class LoginService {

  static authenticate(database, nickName, password) {
    return new Promise((successFn, failureFn) => {
      const url = commonConstant.ENDPOINT.LOGIN + '/authenticate';

      axios.post(url, {
        database: database,
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

}

export default LoginService;
