import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const addStatement = () => {
  return (dispatch, getState) => {
    dispatch({
      type    : 'ADD_STATEMENT',
      payload : {
        id: 1
      }
    })
  }
}
