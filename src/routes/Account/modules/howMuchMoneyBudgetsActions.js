import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchHowMuchMoneyReducerAtTheEndOfBudgets = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.BUDGET + '/how-much-money-at-the-end'

      dispatch({type: 'FETCH_HOW_MUCH_MONEY_BUDGETS'});

      axios.get(url)
      .then((response) => {
        dispatch({
          type    : 'FETCH_HOW_MUCH_MONEY_BUDGETS_FULFILLED',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_HOW_MUCH_MONEY_BUDGETS_REJECTED",
          payload: err
        })
      });

  }
}
