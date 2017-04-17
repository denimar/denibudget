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
import BudgetService from '../../Budget/modules/BudgetService'

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
    me.refs.TransactionModal.open(this.state.form.currentBudget)
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
    let form = Object.assign({}, this.state.form, {currentBudget: budget, currentBudgetItemsSum: budgetItemsSum});
    this.setState({form: form});
  }

  getBudgetTransactionsItemsElem(budgetItem) {
    let budgetTransactionsElemArray = [];
    if (budgetItem.transactions) {
      budgetItem.transactions.forEach(budgetTransactionItem => {
        budgetTransactionsElemArray.push((
          <div className="description-and-value">
            <FaArrowRight style={{marginTop: '3px', marginRight: '5px'}} />

            <div className="date">
              {Moment(new Date(budgetTransactionItem.date)).format("MMMM, DD")}
            </div>
            <div className="account">
              {budgetTransactionItem.account.name}
            </div>
            <div className="description">
              {budgetTransactionItem.description}
            </div>
            <div className="value">
              {routine.formatNumber(budgetTransactionItem.value)}
            </div>
          </div>
        ))
      })
    }
    return (
      <div className="budget-transactions-container">
        { budgetTransactionsElemArray }
      </div>
    );
  }

  getBudgetTransactionsGraph(budgetItem) {
    let budgetTransactionsGraphBarArray = [];
    let transactions;
    if (budgetItem.budgetItemId) {
      budgetTransactionsGraphBarArray.push((
        <div className="comparative-chart-bar-item">
          <span className="comparative-chart-bar-estimated"></span>
          <span className="comparative-chart-bar-value">{ routine.formatNumber(budgetItem.value) }</span>
        </div>
      ));
      transactions = budgetItem.transactions
    } else {
      transactions = [budgetItem];
    }
    if (transactions.length > 0) {
      let sumBudgetItemTransactions = 0;
      transactions.forEach(trans => {
        sumBudgetItemTransactions += trans.value;
      })

      budgetTransactionsGraphBarArray.push((
        <div className="comparative-chart-bar-item">
          <span className="comparative-chart-bar-actual"></span>
          <span className="comparative-chart-bar-value">{ routine.formatNumber(sumBudgetItemTransactions) }</span>
        </div>
      ));
    }
    return (
      <div className="comparative-chart-container">
        <div className="comparative-chart-bar">
          { budgetTransactionsGraphBarArray }
        </div>
      </div>
    );
  }

  render() {

    const header = (
      <div className="page-header-elements">
        <div className="page-header-content">
          <span className="label-budget">Budget :</span>
          <Select.Async
            className="select-budget"
            loadOptions={ BudgetService.getBudgetsForSelects }
            labelKey="description"
            valueKey="_id"
            clearable={false}
            value={ this.state.form.currentBudget ? this.state.form.currentBudget._id : null }
            onChange={ this.currentBudgetInputChange.bind(this) }
          />
        </div>
        <PageHeaderCrud
          newRecordButtonClick={this.newTransactionModal.bind(this)}
        />
      </div>
    );

    let allItems = [];

    //Set the budget items
    if (this.state.form && this.state.form.currentBudget && this.state.form.currentBudget.details) {
      this.state.form.currentBudget.details.forEach(budgetItem => {
        let itemToAdd = {
          budgetItemId: budgetItem._id,
          description: budgetItem.description,
          type: budgetItem.type,
          category: budgetItem.category,
          value: budgetItem.value,
          transactions: []
        };
        this.props.transactions.data.forEach(transactionItem => {
          if (transactionItem.budgetItem === budgetItem._id) {
            itemToAdd.transactions.push(transactionItem);
          }
        })
        allItems.push(itemToAdd);
      });
    }

    //Set the unforecasted transactions items
    this.props.transactions.data.forEach(transactionItem => {
      if (!transactionItem.budgetItem) {
        allItems.push(transactionItem);
      }
    });

    const body = (
      <div className="transaction-items">
        {
          allItems.map((transaction, index) => {
            return <div key={index} className={'transaction-item ' + transaction.type.toLowerCase()}>
                     <div className="category-and-description">
                       <span className="category">{ transaction.category.path }</span>
                       <span className="description">{ transaction.description }</span>
                     </div>
                     { this.getBudgetTransactionsGraph(transaction) }
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
