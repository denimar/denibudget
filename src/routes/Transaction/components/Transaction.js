import React from 'react'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';

import './Transaction.scss';
import routine from '../../../../common/common.routine';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import TransactionModal from './TransactionModal';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import Moment from 'moment';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'
import commonConstant from '../../../../common/common.constant'

let getBudgets = (input, callback) => {

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

class Transaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {form: {}};
  }

  componentWillMount() {
    this.props.fetchTransactions();
  }

  onDeleteClick(id) {
    this.refs.dialog.show({
      body: 'Confirm Transaction Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delTransaction(id);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  newTransactionModal() {
    let me = this;
    me.refs.TransactionModal.open()
      .then(transactionToAdd => {
        me.props.addTransaction(transactionToAdd);
      });
  }

  getBudgetItemsSum(budget) {
    let budgetItemsSum = 0;
    let details = budget.details || [];
    details.forEach(item => budgetItemsSum += item.value);
    return budgetItemsSum;
  }

  currentBudgetInputChange(budget) {
    let budgetItemsSum = this.getBudgetItemsSum(budget);
    let form = Object.assign({}, this.state.form, {currentBudget: budget ? budget._id : null, currentBudgetItemsSum: budgetItemsSum});
    this.setState({form: form});
  }

  render() {

    const header = (
      <div className="page-header-elements">
        <div className="page-header-content">
          <span className="label-budget">Budget :</span>
          <Select.Async
            className="select-budget"
            loadOptions={getBudgets}
            labelKey="description"
            valueKey="_id"
            clearable={false}
            value={this.state.form.currentBudget}
            onChange={this.currentBudgetInputChange.bind(this)}
          />
        </div>
        <PageHeaderCrud
          newRecordButtonClick={this.newTransactionModal.bind(this)}
        />
      </div>
    );

    const body = (
      <div className="transaction-items">
        {
          this.props.transactions.data.map((transaction, index) => {
            return <div key={index} className={'transaction-item ' + transaction.type.toLowerCase()}>
                    <div className="account">
                      {transaction.account.name}
                    </div>
                     <div className="category">
                       {transaction.category.path}
                     </div>
                     <div className="item">
                       <FaArrowRight style={{marginTop: '3px', marginRight: '5px'}} />
                       <div className="date">
                         {Moment(new Date(transaction.date)).format("L")}
                       </div>
                       <div className="description">
                         {transaction.description}
                       </div>
                       <div className='type'>
                         {transaction.type}
                       </div>
                       <div className="value">
                         {routine.formatNumber(transaction.value)}
                       </div>
                       <div className="action-buttons">
                         <span>
                           {(CRUD_ACTION_BUTTON_DELETE)}
                         </span>
                         {(CRUD_ACTION_BUTTON_EDIT)}
                       </div>
                     </div>
                   </div>;
          })
        }
      </div>
    );


    return (

      <div className="transaction-viewport">
        <TransactionModal ref='TransactionModal'/>

        <Dialog ref='dialog'/>

        <PageBody header={header} body={body} />
      </div>

    )
  }
}

export default Transaction
