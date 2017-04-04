import React from 'react'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog'

import './Budget.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import BudgetModal from './BudgetModal';

import FaPlus from 'react-icons/lib/fa/plus';
import FaMinus from 'react-icons/lib/fa/minus';
import Moment from 'moment';
import routine from '../../../../common/common.routine';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT, CRUD_ACTION_BUTTON_ADD_DETAIL } from '../../../constants'

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

  newBudgetModal() {
    let me = this;
    me.refs.BudgetModal.open()
      .then(budgetToAdd => {
        me.props.addBudget(budgetToAdd);
      });
  }

  expandButtonClick(budget) {
    budget.expanded = !budget.expanded;
    this.forceUpdate();
  }

  render() {
    let budgets = this.props.budgets;

    const mappedBudgets = budgets.data.map((budget, index) => {
      let startDate = Moment(budget.startDate);
      let endDate = Moment(budget.endDate);
      let detailEl = null;
      let expandButton;
      if (budget.expanded) {

        let noItems = (<div className="budget-detail-no-items"></div>)
        let details = budget.details ? budget.details.map(detail => (
          <div className={ 'budget-detail-item ' + detail.type.toLowerCase() }>
            <div className="budget-detail-field description">{ detail.description }</div>
            <div className="budget-detail-field type">{ detail.type }</div>
            <div className="budget-detail-field value">{ routine.formatNumber(detail.value) }</div>
            <div className="action-buttons">
              <span>
                {(CRUD_ACTION_BUTTON_DELETE)}
              </span>
              <span>
                {(CRUD_ACTION_BUTTON_EDIT)}
              </span>
            </div>
          </div>
        )) : noItems;

        detailEl = (
          <div className="budget-detail-container">
            { details }
          </div>
        );
        expandButton = <FaMinus style={{marginTop: '-2px', marginRight: '8px'}} />
      } else {
        expandButton = <FaPlus style={{marginTop: '-2px', marginRight: '8px'}} />
      }

      return (
        <div className="budget-item-container" key={index}>

          <div className="budget-item">
            <div className="budget-description">
              <span className="expand-button" onClick={this.expandButtonClick.bind(this, budget)}>
                {expandButton}
              </span>
              {budget.description}
            </div>
            <div className="budget-start-date">{startDate.format('MM/DD/YYYY HH:MM')}</div>
            <div className="budget-end-date">{endDate.format('MM/DD/YYYY HH:MM')}</div>
            <div className="action-buttons">
              <span>
                {(CRUD_ACTION_BUTTON_EDIT)}
              </span>
              <span>
                {(CRUD_ACTION_BUTTON_DELETE)}
              </span>
              <span>
                {(CRUD_ACTION_BUTTON_ADD_DETAIL)}
              </span>
            </div>
          </div>

          {detailEl}

        </div>
      )
    });

    const header = (
      <PageHeaderCrud
        newRecordButtonClick={this.newBudgetModal.bind(this)}
      />
    );

    const body = (
      <div className="budget-container">
        <div className="column-headers">
          <div className="column-header budget-description">Name</div>
          <div className="column-header budget-start-date">Start Date</div>
          <div className="column-header budget-end-date">End Date</div>
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

        <Dialog ref='dialog'/>

        <PageBody header={header} body={body} />
      </div>

    )
  }
}

export default Budget
