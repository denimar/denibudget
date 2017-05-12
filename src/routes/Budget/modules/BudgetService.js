import commonConstant from '../../../../common/common.constant'
import axios from 'axios';

class BudgetService {

  /**
   * function used to get budgets for select element
   */
  static getBudgetsForSelects(selectElem, callbackFn) {

    return new Promise((success, error) => {
      const url = commonConstant.ENDPOINT.BUDGET;

      axios.get(url)
        .then((response) => {
          success({options: response.data})
          callbackFn(response.data);
        })
        .catch((err) => {
          error(err);
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
