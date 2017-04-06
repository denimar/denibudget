import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog'

import './Budget.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import BudgetModal from './BudgetModal';
import BudgetItemModal from './BudgetItemModal';

import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';
import Moment from 'moment';
import routine from '../../../../common/common.routine';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT, CRUD_ACTION_BUTTON_ADD_DETAIL } from '../../../constants'

import BudgetService from '../modules/BudgetService'

class Budget extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchBudgets();
  }

  onDeleteClick(id) {
    this.refs.dialog.show({
      body: 'Confirm Budget Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delBudget(id);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  budgetModal(budget) {
    let me = this;
    me.refs.BudgetModal.open(budget)
      .then(budgetReturned => {
        if (budget) {
          me.props.updBudget(Object.assign(budget, budgetReturned));
        } else {
          me.props.addBudget(budgetReturned);
        }
      });
  }

  newBudgetItemModal(budget) {
    let me = this;
    me.refs.BudgetItemModal.open()
      .then(budgetItemToAdd => {
        me.props.addBudgetItem(budget, budgetItemToAdd);
      });
  }

  delBudget(budgetId) {
    this.refs.dialog.show({
      body: 'Confirm Budget Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delBudget(budgetId);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  delBudgetItem(budget, budgetItemToDel) {
    this.refs.dialog.show({
      body: 'Confirm Budget Item Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delBudgetItem(budget, budgetItemToDel);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  expandButtonClick(budget) {
    budget.expanded = !budget.expanded;
    this.forceUpdate();
  }

  render() {
    let budgets = this.props.budgets;
    if (budgets && budgets.data && budgets.data.length > 0) {
      budgets.data[0].expanded = true;
    }

    const mappedBudgets = budgets.data.map((budget, index) => {
      let startDate = Moment(budget.startDate);
      let endDate = Moment(budget.endDate);
      let detailEl = null;
      let expandButton;

      if (budget.expanded) {
        let noItems = (<div className="budget-detail-no-items"></div>)
        let details = budget.details;
        let sortedDetails = details.sort((detail1, detail2) => {
          const string1 = detail1.type + '|' + detail1.description;
          const string2 = detail2.type + '|' + detail2.description;
          if (string1 < string2.type) return -1;
          if (string1 > string2) return 1;
          return 0;
        });
        let detailItemsEl = sortedDetails ? sortedDetails.map(detail => {
          return (
            <div className={ 'budget-detail-item ' + detail.type.toLowerCase() }>
              <div className="budget-detail-field description">{ detail.description }</div>
              <div className="budget-detail-field type">{ detail.type }</div>
              <div className="budget-detail-field value">{ routine.formatNumber(detail.value) }</div>
              <div className="action-buttons">
                <span onClick={ this.delBudgetItem.bind(this, budget, detail) }>
                  {(CRUD_ACTION_BUTTON_DELETE)}
                </span>
                <span>
                  {(CRUD_ACTION_BUTTON_EDIT)}
                </span>
              </div>
            </div>
          )
        }) : noItems;

        detailEl = (
          <div className="budget-detail-container">
            { detailItemsEl }
          </div>
        );
        expandButton = <FaMinus style={{marginTop: '-2px', marginRight: '8px'}} />
      } else {
        expandButton = <FaPlus style={{marginTop: '-2px', marginRight: '8px'}} />
      }

      const budgetBalance = BudgetService.getBudgetBalance(budget);

      return (
        <div className="budget-item-container" key={index}>

          <div className="budget-item">
            <div className="budget-description">
              <span className="expand-button" onClick={this.expandButtonClick.bind(this, budget)}>
                {expandButton}
              </span>
              {budget.description}
            </div>
            <div className="budget-period">{ startDate.format('MM/DD/YYYY') + ' - ' + endDate.format('MM/DD/YYYY') }</div>
            <div className="budget-value">{ routine.formatNumber(budgetBalance.incomes) }</div>
            <div className="budget-value">{ routine.formatNumber(budgetBalance.expenses) }</div>
            <div className={ "budget-value " + (budgetBalance.balance > 0 ? "C" : "D") }>{ routine.formatNumber(budgetBalance.balance) }</div>
            <div className="action-buttons">
              <span onClick={ this.budgetModal.bind(this, budget) }>
                {(CRUD_ACTION_BUTTON_EDIT)}
              </span>
              <span onClick={ this.delBudget.bind(this, budget._id) }>
                {(CRUD_ACTION_BUTTON_DELETE)}
              </span>
              <OverlayTrigger placement="left" overlay={(
                  <Tooltip>Add a new item in this budget.</Tooltip>
                )}>
                <span onClick={ this.newBudgetItemModal.bind(this, budget) }>
                  {(CRUD_ACTION_BUTTON_ADD_DETAIL)}
                </span>
              </OverlayTrigger>
            </div>
          </div>

          {detailEl}

        </div>
      )
    });

    const header = (
      <PageHeaderCrud
        newRecordButtonClick={this.budgetModal.bind(this, null)}
      />
    );

    const body = (
      <div className="budget-container">
        <div className="column-headers">
          <div className="column-header budget-description">Description</div>
          <div className="column-header budget-period">Period</div>
          <div className="column-header budget-value">Incomes</div>
          <div className="column-header budget-value">Expenses</div>
          <div className="column-header budget-value">Balance</div>
        </div>
        <div className="menu-items">
          <div>{mappedBudgets}</div>
        </div>
        <div className="budget-statement">
        </div>
      </div>
    );


    return (

      <div className="budget-viewport">
        <BudgetModal ref='BudgetModal'/>
        <BudgetItemModal ref='BudgetItemModal'/>

        <Dialog ref='dialog'/>

        <PageBody header={header} body={body} />
      </div>

    )
  }
}

export default Budget
