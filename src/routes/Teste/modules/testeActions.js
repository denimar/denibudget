require('es6-promise').polyfill();
import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const addTeste = () => {
  return (dispatch, getState) => {
    dispatch({
      type    : 'ADD_TESTE',
      payload : {
        id: 1
      }
    })
  }
}
