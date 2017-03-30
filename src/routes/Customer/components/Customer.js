import React from 'react'
import './Customer.scss';

class Customer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCustomers()
  }

  addCustomer() {
    this.props.addCustomer(156, 'Customer Test', 'customer@teste.com');
  }

  deleteCustomer() {
    this.props.deleteCustomer(156);
  }

  updateCustomer() {
    this.props.updateCustomer(156, 'Ana Clara de Moraes');
  }

  render() {
    let customers = this.props.customers;

    const mappedCustomers = customers.data.map((customer, index) => <div key={index} className='customer-item'>{customer.name}</div> );

    return (
      <div>
        <h2>Customers:</h2>
        <button className='btn btn-default' onClick={this.addCustomer.bind(this)}>
          Add Customer
        </button>
        <button className='btn btn-default' onClick={this.deleteCustomer.bind(this)}>
          Delete Customer
        </button>
        <button className='btn btn-default' onClick={this.updateCustomer.bind(this)}>
          Update Customer
        </button>

        <div className="customer-container">{ mappedCustomers }</div>

      </div>
    )
  }

}

Customer.propTypes = {
  fetchCustomers : React.PropTypes.func.isRequired,
}

export default Customer
