import BudgetRepository from './budget.repository';
const budgetRepository = new BudgetRepository();

class BudgetService {

  getBudgets(req, res) {
    budgetRepository.getBudgets()
      .then((budgets) => {
        res.end(JSON.stringify(budgets, null, 2));
      });
  }

  addBudget(req, res) {
    budgetRepository.add(req.body)
      .then((addedBudget) => {
        res.end(JSON.stringify(addedBudget, null, 2));
      });
  }

  delBudget(req, res) {
    let id = req.params.id;

    budgetRepository.del(id)
      .then((deletedBudget) => {
        res.end(JSON.stringify(deletedBudget, null, 2));
      });
  }

  updBudget(req, res) {
    budgetRepository.upd(req.body)
      .then((updatedBudget) => {
        res.end(JSON.stringify(updatedBudget, null, 2));
      });
  }

  getHowMuchMoneyAtTheEnd(req, res) {
    budgetRepository.getHowMuchMoneyAtTheEnd()
      .then(howMuchMoney => {
        res.end(JSON.stringify(howMuchMoney, null, 2));
      });
  }

}

export default BudgetService;
