import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchBudgets = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.BUDGET

      dispatch({type: 'FETCH_BUDGETS'});

      axios.get(url)
        .then((response) => {
          dispatch({
            type    : 'FETCH_BUDGETS_FULFILLED',
            payload : response.data
          })
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_BUDGETS_REJECTED",
            payload: err
          })
        });

  }
}

export const addBudget = (budget) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.BUDGET + '/add'
    axios.post(url, budget)
      .then((response) => {
        dispatch({
          type : 'ADD_BUDGET',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "ADD_BUDGET_ERROR",
          payload: err
        })
      });

  }
}

export const delBudget = (id) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.BUDGET + '/del/' + id;
    axios.delete(url)
      .then((response) => {
        dispatch({
          type : 'DEL_BUDGET',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "DEL_BUDGET_ERROR",
          payload: err
        })
      });

  }
}
