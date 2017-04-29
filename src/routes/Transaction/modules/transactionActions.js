import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchTransactions = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.TRANSACTION

      dispatch({type: 'FETCH_TRANSACTIONS'});

      axios.get(url)
        .then((response) => {
          dispatch({
            type    : 'FETCH_TRANSACTIONS_FULFILLED',
            payload : response.data
          })
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_TRANSACTIONS_REJECTED",
            payload: err
          })
        });

  }
}

export const addTransaction = (transaction) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.TRANSACTION + '/add'
    //transaction.date = transaction.date.toISOString();
    axios.post(url, transaction)
      .then((response) => {
        dispatch({
          type : 'ADD_TRANSACTION',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "ADD_TRANSACTION_ERROR",
          payload: err
        })
      });

  }
}

export const updTransaction = (transaction) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.TRANSACTION + '/upd'
    axios.post(url, transaction)
      .then((response) => {
        dispatch({
          type : 'UPD_TRANSACTION',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "UPD_TRANSACTION_ERROR",
          payload: err
        })
      });

  }
}

export const delTransaction = (id) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.TRANSACTION + '/del/' + id;
    axios.delete(url)
      .then((response) => {
        dispatch({
          type : 'DEL_TRANSACTION',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "DEL_TRANSACTION_ERROR",
          payload: err
        })
      });

  }
}
