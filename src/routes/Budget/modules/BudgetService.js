class BudgetService {

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
