import commonConstant from '../../../../common/common.constant'
import axios from 'axios';
import AjaxRoutine from '../../../util/AjaxRoutine';

class BudgetService {

  static fetchBudgets() {
    const url = commonConstant.ENDPOINT.BUDGET;
    return new Promise((resolve, reject) => {
      AjaxRoutine.get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * function used to get budgets for select element
   */
  static getBudgetsForSelects(selectElem, callbackFn) {

    return new Promise((resolve, reject) => {
      const url = commonConstant.ENDPOINT.BUDGET;

      AjaxRoutine.get(url)
        .then(response => {
          resolve({options: response.data})
          callbackFn(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  }

  static getBudgetBalance(budget) {
    let incomes = 0;
    let expenses = 0;
    let details = budget.details || [];
    details.forEach(item => item.type === 'C' ? incomes += item.value : expenses += item.value);
    return {
      incomes: incomes,
      expenses: expenses,
      balance: incomes - expenses
    };
  }

}

export default BudgetService;
