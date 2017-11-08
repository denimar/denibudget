import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const isValidLogin = (userName, password) => {
  return (dispatch, getState) => {

    // let loginData = {
    //   userName: userName,
    //   password: password
    // };
    //
    // dispatch({
    //   type : 'FETCH_LOGIN',
    //   payload : loginData
    // });
    //
    // const url = commonConstant.ENDPOINT.LOGIN;
    // axios
    //   .post(url, loginData)
    //   .then((response) => {
    //     dispatch({
    //       type : 'FETCH_LOGIN_FULFILLED',
    //       payload : response.data
    //     })
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: "FETCH_LOGIN_REJECTED",
    //       payload: err
    //     })
    //   });

  }
}
