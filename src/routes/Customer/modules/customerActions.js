import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchCustomers = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.CUSTOMER

      dispatch({type: 'FETCH_CUSTOMERS'});

      axios.get(url)
        .then((response) => {
          dispatch({
            type    : 'FETCH_CUSTOMERS_FULFILLED',
            payload : response.data
          })
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_CUSTOMERS_REJECTED",
            payload: err
          })
        });

  }
}

export const addCustomer = (id, name, email) => {
  return (dispatch, getState) => {
    dispatch({
      type    : 'ADD_CUSTOMER',
      payload : {
        id: id,
        name: name,
        email: email
      }
    })
  }
}

export const updateCustomer = (id, name) => {
  return (dispatch, getState) => {
    dispatch({
      type    : 'UPDATE_CUSTOMER',
      payload : {
        id: id,
        name: name
      }
    })
  }
}

export const deleteCustomer = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type    : 'DELETE_CUSTOMER',
      payload : {
        id: id
      }
    })
  }
}
