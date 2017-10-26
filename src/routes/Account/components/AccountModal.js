import moment from 'moment'
import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import 'bootstrap/dist/css/bootstrap.css'
import './AccountModal.scss'
import DateInput from '../../../components/DateInput';
import { Translate } from 'react-redux-i18n';

class AccountModal extends React.Component {

  promiseModalSuccess = null;

  constructor(props) {
    super(props);
    this.state = {showModal: false, form: {}};
  }

  onShow = function() {
    //
  }

  close = function() {
    this.setState({ showModal: false });
  }

  save = function() {
    this.setState({ showModal: false });
    this.promiseModalSuccess(this.state.form);
  }

  open = function(account) {
    let me = this;
    return new Promise(function(success) {
      let state = {
        showModal: true,
        form: {},
        openingBalance: 0
      }
      if (account) {
        state.form['_id'] = account._id;
        state.form['name'] = account.name;
        const startDate = moment(account.startDate);
        state.form['startDate'] = startDate.toDate();
        state.form['openingBalance'] = account.openingBalance;
      }
      me.setState(state);
      me.promiseModalSuccess = success;
    });
  };

  nameInputOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {name: e.target.value})})
  }

  startDateInputOnChange = function(date) {
    this.setState({form: Object.assign(this.state.form, {startDate: date})})
  }

  openingBalanceOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {openingBalance: Number.parseFloat(e)})});

  }

  render() {

    return (
      <Modal className="account-modal-container" show={this.state.showModal} onHide={this.close.bind(this)} onShow={this.onShow.bind(this)} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title><Translate value="account.modal.title" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                <Translate value="account.modal.name" />
              </Col>
              <Col sm={8}>
                <FormControl ref="nameInput" type="text" value={this.state.form.name} onChange={this.nameInputOnChange.bind(this)} placeholder="Name" autoFocus />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                <Translate value="account.modal.startDate" />
              </Col>
              <Col sm={8}>
                <DateInput
                  className="form-control"
                  value={ this.state.form.startDate }
                  onChange={ this.startDateInputOnChange.bind(this) }
                />

              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={4}>
                <Translate value="account.modal.openingBalance" />
              </Col>
              <Col sm={3}>
                <CurrencyInput ref="openingBalanceInput" className="form-control" value={this.state.form.openingBalance} onChange={this.openingBalanceOnChange.bind(this)} />
              </Col>
            </FormGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.save.bind(this)}><Translate value="account.modal.buttons.save" /></Button>
          <Button bsStyle="warning" onClick={this.close.bind(this)}><Translate value="account.modal.buttons.cancel" /></Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports = AccountModal;
