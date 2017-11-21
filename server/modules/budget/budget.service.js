import BudgetRepository from './budget.repository';

class BudgetService {

  constructor() {
    this.budgetRepository = new BudgetRepository();
  }

  getBudgets(req, res) {
    this.budgetRepository.getBudgets()
      .then((budgets) => {
        res.end(JSON.stringify(budgets, null, 2));
      });
  }

  addBudget(req, res) {
    this.budgetRepository.add(req.body)
      .then((addedBudget) => {
        res.end(JSON.stringify(addedBudget, null, 2));
      });
  }

  delBudget(req, res) {
    let id = req.params.id;

    this.budgetRepository.del(id)
      .then((deletedBudget) => {
        res.end(JSON.stringify(deletedBudget, null, 2));
      });
  }

  updBudget(req, res) {
    this.budgetRepository.upd(req.body)
      .then((updatedBudget) => {
        res.end(JSON.stringify(updatedBudget, null, 2));
      });
  }

  getHowMuchMoneyAtTheEnd(req, res) {
    this.budgetRepository.getHowMuchMoneyAtTheEnd()
      .then(howMuchMoney => {
        res.end(JSON.stringify(howMuchMoney, null, 2));
      });
  }

}

export default BudgetService;
