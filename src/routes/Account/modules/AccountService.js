import commonConstant from '../../../../common/common.constant'
import axios from 'axios';

class AccountService {

  /**
   * function used to get accounts for select element
   */
  static getAccountsForSelects(selectElem, callback) {

    const url = commonConstant.ENDPOINT.ACCOUNT;

    axios.get(url)
      .then((response) => {
        callback(null, {
          options: response.data,
          complete: true
        });
      })
      .catch((err) => {
        console.warn(err);
      });

  }


}

export default AccountService;
