require('es6-promise').polyfill();
import axios from "axios";
const commonConstant = require('../../../../common/common.constant');

export const fetchCategories = () => {
  return (dispatch, getState) => {
      const url = commonConstant.ENDPOINT.CATEGORY

      dispatch({type: 'FETCH_CATEGORIES'});

      axios.get(url)
      .then((response) => {
        dispatch({
          type    : 'FETCH_CATEGORIES_FULFILLED',
          payload : response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_CATEGORIES_REJECTED",
          payload: err
        })
      });

  }
}

export const addCategory = (treeview, parentId, text, isLeaf) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.CATEGORY + '/add'
    axios.post(url, {parent: parentId, text: text})
      .then((response) => {
        let item = treeview.api.addItem(text, isLeaf);
        item.id = response.data._id;

        dispatch({
          type : 'ADD_CATEGORY',
          payload : treeview.api.getRootItem()
        })
      })
      .catch((err) => {
        dispatch({
          type: "ADD_CATEGORY_ERROR",
          payload: err
        })
      });

  }
}

export const delCategory = (treeview, id) => {
  return (dispatch, getState) => {

    const url = commonConstant.ENDPOINT.CATEGORY + '/del/' + id;
    axios.delete(url)
      .then((response) => {

        treeview.api.removeItem(id);

        dispatch({
          type : 'DEL_CATEGORY',
          payload : treeview.api.getRootItem()
        })
      })
      .catch((err) => {
        dispatch({
          type: "DEL_CATEGORY_ERROR",
          payload: err
        })
      });

  }
}
