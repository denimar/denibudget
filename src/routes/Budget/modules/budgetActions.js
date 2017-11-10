import axios from "axios";
const commonConstant = require('../../../../common/common.constant');
import BudgetService from './BudgetService';

export const fetchBudgets = () => {
  return (dispatch, getState) => {
      dispatch({type: 'FETCH_BUDGETS'});
      BudgetService.fetchBudgets()
        .then(responseData => {
          dispatch({
            type : 'FETCH_BUDGETS_FULFILLED',
            payload : responseData
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
