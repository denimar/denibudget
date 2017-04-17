import commonConstant from '../../../../common/common.constant'
import axios from 'axios';

class BudgetService {

  /**
   * function used to get budgets for select element
   */
  static getBudgetsForSelects(selectElem, callback) {

    const url = commonConstant.ENDPOINT.BUDGET;

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
