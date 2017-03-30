import { connect } from 'react-redux'
import { fetchBills, addBill, delBill, showModal } from '../modules/billActions'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Bill from './Bill'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchBills : () => fetchBills(),
  addBill : (bill) => addBill(bill),
  delBill : (id) => delBill(id)
}

const mapStateToProps = (state) => ({
  bills : state.bills
})


export default connect(mapStateToProps, mapDispatchToProps)(Bill)
