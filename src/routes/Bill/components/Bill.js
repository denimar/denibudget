import React from 'react'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog'

import './Bill.scss';
import routine from '../../../../common/common.routine';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import BillModal from './BillModal';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import Moment from 'moment';

class Bill extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchBills();
  }

  onDeleteClick(id) {
    this.refs.dialog.show({
      body: 'Confirm Bill Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delBill(id);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  newBillModal() {
    let me = this;
    me.refs.BillModal.open()
      .then(billToAdd => {
        me.props.addBill(billToAdd);
      });
  }

  render() {

    const header = (
      <PageHeaderCrud
        newRecordButtonClick={this.newBillModal.bind(this)}
      />
    );

    const body = (
      <div className="bill-items">
        {
          this.props.bills.data.map((bill, index) => {
            return <div key={index} className={'bill-item ' + bill.type.toLowerCase()}>
                    <div className="account">
                      {bill.account.name}
                    </div>
                     <div className="category">
                       {bill.category.path}
                     </div>
                     <div className="item">
                       <FaArrowRight style={{marginTop: '3px', marginRight: '5px'}} />
                         <div className="date">
                           {Moment(new Date(bill.date)).format("L")}
                         </div>
                         <div className="description">
                         {bill.description}
                       </div>
                       <div className='type'>
                         {bill.type}
                       </div>
                       <div className="value">
                         {routine.formatNumber(bill.value)}
                       </div>
                       <div className="action-buttons">
                         <span className="fa fa-pencil" aria-hidden="true"></span>
                         <span className="fa fa-times" aria-hidden="true" onClick={this.onDeleteClick.bind(this, bill._id)}></span>
                       </div>
                     </div>
                   </div>;
          })
        }
      </div>
    );


    return (

      <div className="bill-viewport">
        <BillModal ref='BillModal'/>

        <Dialog ref='dialog'/>

        <PageBody header={header} body={body} />
      </div>

    )
  }
}

export default Bill
