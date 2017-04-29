import { connect } from 'react-redux'
import { fetchTransactions, addTransaction, updTransaction, delTransaction, showModal } from '../modules/transactionActions'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Transaction from './Transaction'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchTransactions : () => fetchTransactions(),
  addTransaction : (transaction) => addTransaction(transaction),
  updTransaction : (transaction) => updTransaction(transaction),
  delTransaction : (id) => delTransaction(id)
}

// const mapStateToProps = (state) => ({
//   transactions : state.transactions
// })
const mapStateToProps = (state) => {
  return {
    transactions : state.transactions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
