require('es6-promise').polyfill();
import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchBills = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.BILL

      dispatch({type: 'FETCH_BILLS'});

      axios.get(url)
        .then((response) => {
          dispatch({
            type    : 'FETCH_BILLS_FULFILLED',
            payload : response.data
          })
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_BILLS_REJECTED",
            payload: err
          })
        });

  }
}

export const addBill = (bill) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.BILL + '/add'
    //bill.date = bill.date.toISOString();
    axios.post(url, bill)
      .then((response) => {
        dispatch({
          type : 'ADD_BILL',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "ADD_BILL_ERROR",
          payload: err
        })
      });

  }
}

export const delBill = (id) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.BILL + '/del/' + id;
    axios.delete(url)
      .then((response) => {
        dispatch({
          type : 'DEL_BILL',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "DEL_BILL_ERROR",
          payload: err
        })
      });

  }
}

// export const delBill = (id) => {
//
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//
//       const url = commonConstant.ENDPOINT.BILL + '/del/' + id
//       fetch(url, {
//         method: 'DELETE',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       }).then(function(response) {
//         return response.json()
//       }).then(function(json) {
//         dispatch({
//           type    : DEL_BILL,
//           payload : json
//         })
//         resolve()
//       }).catch(function(ex) {
//         console.log('parsing failed', ex)
//       })
//
//     })
//   }
//
// }
