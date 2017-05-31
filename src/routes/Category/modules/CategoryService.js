import axios from 'axios';
import commonConstant from '../../../../common/common.constant'

class CategoryService {

  /**
   * function used to get budgets for select element
   */
  static getCategoriesForSelects(selectElem, callback) {
    const url = commonConstant.ENDPOINT.CATEGORY_LIST + '/false'

    axios.get(url)
      .then((response) => {

        callback(null, {
          options: response.data,
          complete: true
        });

      })
      .catch((err) => {
        console.warn(err);
      });
  }

  static getCategoryById(categoryId) {
    return new Promise((success, error) => {
      const url = commonConstant.ENDPOINT.CATEGORY + '/' + categoryId

      axios.get(url)
        .then((response) => {
          success(response.data);
        })
        .catch((err) => {
          error(err);
        });
    })
  }

}

export default CategoryService;
