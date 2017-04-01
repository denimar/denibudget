import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchAccounts = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.ACCOUNT

      dispatch({type: 'FETCH_ACCOUNTS'});

      axios.get(url)
      .then((response) => {
        dispatch({
          type    : 'FETCH_ACCOUNTS_FULFILLED',
          payload : response.data
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
