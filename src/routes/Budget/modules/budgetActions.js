import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchBudgets = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.BUDGET;

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

export const fetchBudgetDetails = (budget) => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.BUDGET_DETAIL;

      dispatch({type: 'FETCH_BUDGET_DETAILS'});

      axios.get(url)
        .then((response) => {
          dispatch({
            type : 'FETCH_BUDGET_DETAILS_FULFILLED',
            payload : response.data,
            budget: budget
          })
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_BUDGET_DETAILS_REJECTED",
            payload: err
          })
        });

  }
}

export const addBudget = (budgetToAdd) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.BUDGET + '/add'
    axios.post(url, budgetToAdd)
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

export const updBudget = (budgetToUpd) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.BUDGET + '/upd';
    axios.post(url, budgetToUpd)
      .then((response) => {
        dispatch({
          type : 'UPD_BUDGET',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "UPD_BUDGET_ERROR",
          payload: err
        })
      });

  }
}
