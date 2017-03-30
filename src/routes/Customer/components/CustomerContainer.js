import { connect } from 'react-redux'
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from '../modules/customerActions'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Customer from './Customer'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  fetchCustomers : () => fetchCustomers(),
  addCustomer    : (id, name, email) => addCustomer(id, name, email),
  updateCustomer : (id, name) => updateCustomer(id, name),
  deleteCustomer : (id) => deleteCustomer(id),
}

const mapStateToProps = (state) => ({
  customers : state.customers
})


export default connect(mapStateToProps, mapDispatchToProps)(Customer)
