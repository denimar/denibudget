import axios from "axios";
const commonConstant = require('../../../../common/common.constant');
import AccountService from './AccountService';

export const fetchAccounts = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.ACCOUNT

      dispatch({type: 'FETCH_ACCOUNTS'});

      axios.get(url)
      .then((response) => {
        _fillCurrentAccountBalance(response.data)
          .then(accountsData => {
            dispatch({
              type    : 'FETCH_ACCOUNTS_FULFILLED',
              payload : accountsData
            })
          })
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_ACCOUNTS_REJECTED",
          payload: err
        })
      });

  }
}

export const addAccount = (account) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.ACCOUNT + '/add'
    axios.post(url, account)
      .then((response) => {
        dispatch({
          type : 'ADD_ACCOUNT',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "ADD_ACCOUNT_ERROR",
          payload: err
        })
      });

  }
}

export const updAccount = (account) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.ACCOUNT + '/upd'
    axios.post(url, account)
      .then((response) => {
        dispatch({
          type : 'UPD_ACCOUNT',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "UPD_ACCOUNT_ERROR",
          payload: err
        })
      });

  }
}

export const delAccount = (id) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.ACCOUNT + '/del/' + id;
    axios.delete(url)
      .then((response) => {
        dispatch({
          type : 'DEL_ACCOUNT',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "DEL_ACCOUNT_ERROR",
          payload: err
        })
      });

  }
}

function _fillCurrentAccountBalance(accountsData) {
  return new Promise(function(success, reject) {
    let accountsWithBalance = accountsData;
    let allAccountsHaveBalance = (accounts) => {
      for (let i = 0 ; i < accounts.length ; i++) {
        let account = accounts[i];
        if (!account.currentBalance) {
          return false;
        }
      }
      return true;
    };

    accountsWithBalance.forEach(account => {
      AccountService.getAccountBalance(account._id)
        .then((currentBalance) => {
          account.currentBalance = currentBalance;
          if (allAccountsHaveBalance(accountsWithBalance)) {
            success(accountsWithBalance);
          }
        })
        .catch((err) => {
          reject(err)
        });
    });

  });

}
