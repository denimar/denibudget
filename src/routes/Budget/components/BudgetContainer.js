import { connect } from 'react-redux'
import { fetchBudgets, fetchBudgetDetails, addBudget, addBudgetItem, delBudget, delBudgetItem, updBudget } from '../modules/budgetActions'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Budget from './Budget'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchBudgets : () => fetchBudgets(),
  fetchBudgetDetails : (budget) => fetchBudgetDetails(budget),
  addBudget : (budgetToAdd) => addBudget(budgetToAdd),
  addBudgetItem : (budget, budgetItemToAdd) => addBudgetItem(budget, budgetItemToAdd),
  delBudget : (id) => delBudget(id),
  delBudgetItem : (budget, budgetItemToDel) => delBudgetItem(budget, budgetItemToDel),
  updBudget : (budgetToUpd) => updBudget(budgetToUpd),
}

const mapStateToProps = (state) => ({
  budgets : state.budgets
})


export default connect(mapStateToProps, mapDispatchToProps)(Budget)
