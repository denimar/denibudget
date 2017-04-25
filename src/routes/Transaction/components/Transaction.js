import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
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
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import Moment from 'moment';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'
import commonConstant from '../../../../common/common.constant'
import BudgetService from '../../Budget/modules/BudgetService'

class Transaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = { form: {} };
  }

  componentWillMount() {
    if (this.props.transactions.data.length === 0) {
      this.props.fetchTransactions();
    }
  }

  removeTransactionItemClick(transactionId) {
    this.refs.dialog.show({
      body: 'Confirm Transaction Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delTransaction(transactionId);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  newTransactionModal(budgetItem) {
    let me = this;
    me.refs.TransactionModal.open(this.props.transactions.currentBudget, budgetItem)
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

  getTransactionsSum(transactionsItems) {
    let transactionsSum = 0;
    let transactions = transactionsItems || [];
    transactions.forEach(transaction => transactionsSum += transaction.value);
    return transactionsSum;
  }

  getCurrentTransactions(budget) {
    let currentTransactions = [];
    if (budget) {
      const startDate = Moment(budget.startDate).startOf('day');
      const endDate = Moment(budget.endDate).startOf('day');
      this.props.transactions.data.forEach(transactionItem => {
        const transactionDate = Moment(transactionItem.date).startOf('day');
        if (transactionDate.isBetween(startDate, endDate, 'days', '[]')) {
          currentTransactions.push(transactionItem);
        }
      })
    }
    return currentTransactions;
  }

  currentBudgetInputChange(budget) {
    const startDate = Moment(budget.startDate).startOf('day');
    const endDate = Moment(budget.endDate).startOf('day');
    let currentTransactions = this.getCurrentTransactions(budget);
    const currentBudgetItemsSum = this.getBudgetItemsSum(budget);
    const currentTransactionsSum = this.getTransactionsSum(currentTransactions);

    this.props.transactions.currentBudget = budget;
    this.props.transactions.currentTransactionsSum = currentTransactionsSum;
    this.props.transactions.currentBudgetItemsSum = currentBudgetItemsSum;
    this.forceUpdate();
  }

  getBudgetTransactionsGraph(budgetItem) {
    let budgetTransactionsGraphBarArray = [];
    let transactions;

    const greaterValue = this.props.transactions.currentTransactionsSum > this.props.transactions.currentBudgetItemsSum ? this.props.transactions.currentTransactionsSum : this.props.transactions.currentBudgetItemsSum;
    const estimatedPercentage = budgetItem.value * 100 / greaterValue;

    if (budgetItem.budgetItemId) {
      budgetTransactionsGraphBarArray.push((
        <div key={ 'estimated-' + budgetItem.budgetItemId } className="comparative-chart-bar-item">
          <span className="comparative-chart-bar-estimated" style={ {"width" : estimatedPercentage.toString() + "%"} }></span>
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

      const actualPercentage = sumBudgetItemTransactions * 100 / greaterValue;
      budgetTransactionsGraphBarArray.push((
        <div key={ 'actual-' + budgetItem.budgetItemId } className="comparative-chart-bar-item">
          <span className="comparative-chart-bar-actual" style={ {"width" : actualPercentage.toString() + "%"} }></span>
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

  getTransactionOrBudgetItem(transactionOrBudgetItem, isUnforecasted, isTransactionItem, index) {
    let onlyTransactionItem = (!isUnforecasted && isTransactionItem);
    let budgetTransactionsGraph = onlyTransactionItem ? null : this.getBudgetTransactionsGraph(transactionOrBudgetItem);
    let categoryElem = onlyTransactionItem ? null : (
      <span className="category">{ transactionOrBudgetItem.category.path }</span>
    );
    let descriptionElem = (
      <div className="transaction-items-fields">
        { onlyTransactionItem ? (
            <div>
              <FaArrowRight style={ {marginTop: '-2px', marginLeft: '15px', marginRight: '5px'} } />
              <span className="date">{ Moment(new Date(transactionOrBudgetItem.date)).format("MMMM, DD") }</span>
            </div>
          )  : null
        }
        { categoryElem }
        <div className="description">
          <span>{ transactionOrBudgetItem.description }</span>
          { (onlyTransactionItem || isUnforecasted) ? null : (
            <OverlayTrigger placement="top" overlay={(
                <Tooltip id="btnActionButtonAddTransactionTooltip">Add a transaction in this budget.</Tooltip>
              )}>
                <FaPlusCircle
                  color={ transactionOrBudgetItem.type.toLowerCase() === 'c' ? '#00cc00' : '#ff4d4d' }
                  size="20"
                  onClick={ this.newTransactionModal.bind(this, transactionOrBudgetItem) }
                />
              </OverlayTrigger>
            )
          }
        </div>
        { onlyTransactionItem ? (
            <div>
              <span className="account">{ transactionOrBudgetItem.account.name }</span>
              <span className="value">{ routine.formatNumber(transactionOrBudgetItem.value) }</span>

                <OverlayTrigger placement="top" overlay={(
                    <Tooltip id="btnActionButtonDelTransactionTooltip">Remove this transaction item.</Tooltip>
                  )}>
                  <span className="action-button-delete-transaction" onClick={ this.removeTransactionItemClick.bind(this, transactionOrBudgetItem._id) } >
                    { (CRUD_ACTION_BUTTON_DELETE) }
                  </span>
                </OverlayTrigger>

            </div>
          ) : null
        }
      </div>
    );

    return (
      <div key={ index } className={ 'budget-item ' + (isUnforecasted ? 'is-unforecasted ' : ' ') + transactionOrBudgetItem.type.toLowerCase() + (onlyTransactionItem ? ' is-only-transaction-item' : '') }>
        { descriptionElem }
        { budgetTransactionsGraph }
      </div>
    )
  }

  getBudgetTranctionItems(budgetItem) {
    let budgetTranctionItems = [];
    budgetItem.transactions.map((transactionItem, index) => {
      budgetTranctionItems.push(this.getTransactionOrBudgetItem(transactionItem, false, true, transactionItem._id));
    });
    return budgetTranctionItems;
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
            value={ this.props.transactions.currentBudget ? this.props.transactions.currentBudget._id : null }
            onChange={ this.currentBudgetInputChange.bind(this) }
            placeholder="select a budget"
          />
        </div>
        <PageHeaderCrud
          newRecordButtonClick={ this.newTransactionModal.bind(this, null) }
        />
      </div>
    );

    let budgetItems = [];

    //Set the budget items
    if (this.state.form && this.props.transactions.currentBudget && this.props.transactions.currentBudget.details) {
      this.props.transactions.currentBudget.details.forEach(budgetItem => {
        let itemToAdd = {
          budgetItemId: budgetItem._id,
          description: budgetItem.description,
          type: budgetItem.type,
          category: budgetItem.category,
          value: budgetItem.value,
          transactions: []
        };
        this.getCurrentTransactions(this.props.transactions.currentBudget).forEach(transactionItem => {
          if (transactionItem.budgetItem === budgetItem._id) {
            itemToAdd.transactions.push(transactionItem);
          }
        })
        budgetItems.push(itemToAdd);
      });
    }

    const body = (
      <div className="budgets-and-transactions-items">
        {
          budgetItems.map((budgetItem, index) => {
            const budgetTranctionItems = this.getBudgetTranctionItems(budgetItem);
            return <div key={ budgetItem.budgetItemId } className={ 'budget-item-container ' + budgetItem.type.toLowerCase() }>
                    { this.getTransactionOrBudgetItem(budgetItem, false, false, 'budget-' + budgetItem.budgetItemId) }
                    {
                      budgetTranctionItems.length > 0 ? (
                        <div className="transactions-items with-budget">
                          { budgetTranctionItems }
                        </div>
                      ) : null
                    }
                  </div>
          })
        }
        {
          this.getCurrentTransactions(this.props.transactions.currentBudget).map((transactionItem, index) => {
            if (!transactionItem.budgetItem) {
              const budgetTranctionItems = this.getTransactionOrBudgetItem(transactionItem, true, false, 'trans-' + transactionItem._id);
              return <div key={ transactionItem._id } className={ 'budget-item-container ' + transactionItem.type.toLowerCase() }>
                       <div className="transactions-items">
                         { budgetTranctionItems }
                       </div>
                     </div>
            }
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
