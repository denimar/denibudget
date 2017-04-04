const budgetRepository = require('./budget.repository');

module.exports = {

  getBudgets: (req, res) => {
    budgetRepository.getBudgets().then((budgets) => {
      res.end(JSON.stringify(budgets, null, 2));
    });
  },

  addBudget: (req, res) => {
    budgetRepository.add(req.body).then((addedBudget) => {
      res.end(JSON.stringify(addedBudget, null, 2));
    });
  },

  addBudgetItem: (req, res) => {
    const budget = req.body.budget;
    const budgetItemToAdd = req.body.budgetItemToAdd;
    budgetRepository.addItem(budget, budgetItemToAdd).then((addedBudgetItem) => {
      res.end(JSON.stringify(addedBudgetItem, null, 2));
    });
  },

  delBudget: (req, res) => {
    let id = req.params.id;

    budgetRepository.del(id).then((deletedBudget) => {
      res.end(JSON.stringify(deletedBudget, null, 2));
    });
  }

}
