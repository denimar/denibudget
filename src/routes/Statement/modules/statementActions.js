import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchStatement = (accountId) => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.ACCOUNT + '/statement/' + accountId + '/2017-04-22/2017-04-22';

      dispatch({type: 'FETCH_STATEMENT'});

      axios.get(url)
      .then((response) => {
        dispatch({
          type    : 'FETCH_STATEMENT_FULFILLED',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_STATEMENT_REJECTED",
          payload: err
        })
      });

  }
}
