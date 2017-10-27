import axios from "axios";
const commonConstant = require('../../../../common/common.constant');
import AccountService from './AccountService';

export const fetchAccounts = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.ACCOUNT

      dispatch({type: 'FETCH_ACCOUNTS'});

      axios.get(url)
      .then((response) => {
          dispatch({
            type    : 'FETCH_ACCOUNTS_FULFILLED',
            payload : response.data
          });
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
