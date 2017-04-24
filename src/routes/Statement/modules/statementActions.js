import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchStatement = (accountId, startDate, endDate) => {
  return (dispatch, getState) => {
      const startDateStr = startDate.format('YYYY-MM-DD');
      const endDateStr = endDate.format('YYYY-MM-DD');

      const url = commonConstant.ENDPOINT.ACCOUNT + '/statement/' + accountId + '/' + startDateStr + '/' + endDateStr;

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
