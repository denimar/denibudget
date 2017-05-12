import commonConstant from '../../../../common/common.constant'
import axios from 'axios';
import Moment from 'moment';
import routine from '../../../../common/common.routine';

class AccountService {

  /**
   * function used to get accounts for select element
   */
  static getAccountsForSelects(selectElem, callbackFn) {
    return new Promise((success, error) => {
      const url = commonConstant.ENDPOINT.ACCOUNT;

      axios.get(url)
        .then((response) => {
          success({options: response.data})
          callbackFn(response.data);
        })
        .catch((err) => {
          error(err);
        });
    });
  }

  static getAccountBalance(accountId, date) {
    return new Promise((success, error) => {
      let url = commonConstant.ENDPOINT.ACCOUNT + '/balance/' + accountId;

      if (date) {
        const formatedDate = Moment(date).format('YYYY-MM-DD');
        url += '/' + formatedDate;
      }

      axios.get(url)
        .then((response) => {
          success(response.data.currentBalance);
        })
        .catch((err) => {
          error(err)
        });
    });
  }

  static getTransfers() {
    return new Promise((success, error) => {
      const url = commonConstant.ENDPOINT.ACCOUNT + '/transfer';

      axios.get(url)
        .then((response) => {
          success(response.data)
        })
        .catch((err) => {
          error(err);
        });
    });
  }

  static transferBetweenAccounts(date, accountFrom, accountTo, value) {
    return new Promise((success, error) => {
      const url = commonConstant.ENDPOINT.ACCOUNT + '/transfer/add'
      const transfer = {
        date: routine.formatDate(date, 'YYYY-MM-DD'),
        from: accountFrom,
        to: accountTo,
        value: value
      };
      axios.post(url, transfer)
        .then((response) => {
          success(response.data);
        })
        .catch((err) => {
          error(err);
        });
    });
  }

  static delTransfer(id) {
    return new Promise((success, error) => {
      const url = commonConstant.ENDPOINT.ACCOUNT + '/transfer/del/' + id;
      axios.delete(url)
        .then((response) => {
          success(response.data);
        })
        .catch((err) => {
          error(err);
        });
    });
  }

}

export default AccountService;
