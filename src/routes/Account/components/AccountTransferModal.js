import React from 'react'
import { Modal, Button, OverlayTrigger, Tooltip, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import moment from 'moment'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CurrencyInput from 'react-currency-input';
import DateInput from '../../../components/DateInput'
import FaCheck from 'react-icons/lib/fa/check';
import { CRUD_ACTION_BUTTON_DELETE } from '../../../constants'
import Dialog from 'react-bootstrap-dialog'
import './AccountTransferModal.scss'
import AccountService from '../modules/AccountService'
import routine from '../../../../common/common.routine';
import { Translate } from 'react-redux-i18n';

class AccountTransferModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false, form: {}, transfers: []};
  }

  close = function() {
    this.setState({ showModal: false });
  }

  open = function(accounts, refreshFunction) {
    this.accounts = accounts;
    this.refreshFunction = refreshFunction;
    this.fetchTransfers();

    let me = this;

    const momentToday = new moment().startOf('day');

    return new Promise(function(success) {
      let state = {
        showModal: true,
        form: {
          date: momentToday.toDate()
        }
      }
      me.setState(state);
    });
  };

  transfer() {
    const momentDate = moment(this.state.form.date).startOf('day');
    AccountService.transferBetweenAccounts(momentDate.toISOString(), this.state.form.accountFrom._id, this.state.form.accountTo._id, this.state.form.value)
      .then(addedTransfer => {
        this.fetchTransfers();
        this.clearForm();
        this.refreshFunction();
      })

  }

  clearForm() {
    const date = this.state.form.date; //keep the date
    this.setState({
      form: {
        date: date,
        accountFrom: null,
        accountTo: null,
        value: 0,
      }
    });
    this.refs.fromDate.focus();
  }

  dateInputOnChange = function(date) {
    this.setState({form: Object.assign(this.state.form, {date: date})})
  }

  accountFromInputChange(item) {
    let form = Object.assign({}, this.state.form, { accountFrom: item });
    this.setState({form: form});
  }

  accountToInputChange(item) {
    let form = Object.assign({}, this.state.form, { accountTo: item });
    this.setState({form: form});
  }

  valueInputChange(e) {
    let thousandSeparator = (1111).toLocaleString().replace(/1/g, ''); //workaround TODO:fix it
    let regExp = new RegExp('\\' + thousandSeparator, 'g');
    let strNumber = e.replace(regExp, '');
    this.setState({form: Object.assign(this.state.form, {value: Number.parseFloat(strNumber)})});
  }

  fetchTransfers() {
    let me = this;
    AccountService.getTransfers()
      .then(transfers => {
        me.setState({
          transfers: transfers
        });
      })
  }

  canTransfer() {
    let canTransfer = (this.state.form.date && this.state.form.accountFrom && this.state.form.accountTo && this.state.form.value);
    return (canTransfer && this.state.form.accountFrom._id !== this.state.form.accountTo._id);
  }

  deleteTransferClick(transferId) {
    this.refs.dialog.show({
      body: 'Confirm Transfer Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          AccountService.delTransfer(transferId)
            .then(deletedTransfer => {
              for (let i = 0 ; i < this.state.transfers.length ; i++) {
                let transfer = this.state.transfers[i];
                if (transfer._id === transferId) {
                  this.state.transfers.splice(i, 1);
                  break;
                }
              }
              this.forceUpdate();
              this.refreshFunction();
            })
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  render() {
    return (
      <Modal className="account-transfer-modal-container" show={this.state.showModal} onHide={this.close.bind(this)} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title><Translate value="account.transferModal.title" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                <Translate value="account.transferModal.date" />
              </Col>
              <Col sm={10}>
                <DateInput
                  className="form-control"
                  value={ this.state.form.date }
                  onChange={ this.dateInputOnChange.bind(this) }
                />

              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                <Translate value="account.transferModal.from" />
              </Col>
              <Col sm={10}>
                <Select
                  autofocus
                  ref="fromDate"
                  labelKey="name"
                  valueKey="_id"
                  options={ this.accounts }
                  value={ this.state.form.accountFrom }
                  onChange={ this.accountFromInputChange.bind(this) }
                />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                <Translate value="account.transferModal.to" />
              </Col>
              <Col sm={10}>
                <Select
                  labelKey="name"
                  valueKey="_id"
                  options={ this.accounts }
                  value={ this.state.form.accountTo }
                  onChange={ this.accountToInputChange.bind(this) }
                />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                <Translate value="account.transferModal.value" />
              </Col>
              <Col sm={3}>
                <CurrencyInput
                  className="form-control"
                  value={ this.state.form.value }
                  onChange={ this.valueInputChange.bind(this) }
                />
              </Col>
              <Col sm={3}>
                <Button bsStyle="success" disabled={ !this.canTransfer() } onClick={ this.transfer.bind(this) }><FaCheck /><span className="transfer-button-text"><Translate value="account.transferModal.applyTransfer" /></span></Button>
              </Col>
            </FormGroup>

          </Form>

          <div className="data-grid">
            <div className="data-grid-header">
              <span className="data-grid-header-field column-date"><Translate value="account.transferModal.date" /></span>
              <span className="data-grid-header-field column-from"><Translate value="account.transferModal.from" /></span>
              <span className="data-grid-header-field column-to"><Translate value="account.transferModal.to" /></span>
              <span className="data-grid-header-field column-value"><Translate value="account.transferModal.value" /></span>
            </div>
            <div className="data-grid-body">
              {
                this.state.transfers.map(transfer => {
                  return (
                    <div key={ transfer._id } className="data-grid-row">
                      <span className="data-grid-field column-date">{ routine.formatDate(transfer.date, 'MM/DD/YYYY') }</span>
                      <span className="data-grid-field column-from">{ transfer.from.name }</span>
                      <span className="data-grid-field column-to">{ transfer.to.name }</span>
                      <span className="data-grid-field column-value">{ routine.formatNumber(transfer.value) }</span>
                      <OverlayTrigger placement="top" overlay={(
                          <Tooltip id="btnActionButtonDelTransferTooltip">Remove this transfer item.</Tooltip>
                        )}>
                        <span className="action-button-delete-transfer" onClick={this.deleteTransferClick.bind(this, transfer._id)} >
                          { (CRUD_ACTION_BUTTON_DELETE) }
                        </span>
                      </OverlayTrigger>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={this.close.bind(this)}><Translate value="account.transferModal.buttons.close" /></Button>
        </Modal.Footer>

        <Dialog ref='dialog'/>
      </Modal>
    )
  }

}

module.exports = AccountTransferModal;
