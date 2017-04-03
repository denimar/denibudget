import React from 'react'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog'

import './Budget.scss';
import routine from '../../../../common/common.routine';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import BudgetModal from './BudgetModal';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import Moment from 'moment';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'

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

  render() {

    const header = (
      <PageHeaderCrud
        newRecordButtonClick={this.newBudgetModal.bind(this)}
      />
    );

    const body = (
      <div className="budget-items">
        {
          this.props.budgets.data.map((budget, index) => {
            return <div key={index} className={'budget-item ' + budget.type.toLowerCase()}>
                     <div className="category">
                       {budget.category.path}
                     </div>
                     <div className="item">
                       <FaArrowRight style={{marginTop: '3px', marginRight: '5px'}} />
                       <div className="date">
                         {Moment(new Date(budget.date)).format("L")}
                       </div>
                       <div className="description">
                         {budget.description}
                       </div>
                       <div className='type'>
                         {budget.type}
                       </div>
                       <div className="value">
                         {routine.formatNumber(budget.value)}
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

      <div className="budget-viewport">
        <BudgetModal ref='BudgetModal'/>

        <Dialog ref='dialog'/>

        <PageBody header={header} body={body} />
      </div>

    )
  }
}

export default Budget
