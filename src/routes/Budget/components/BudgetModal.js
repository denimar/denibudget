import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import moment from 'moment'
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import commonConstant from '../../../../common/common.constant'
import DateInput from '../../../components/DateInput'
import './BudgetModal.scss'
import { I18n, Translate } from 'react-redux-i18n';

class BudgetModal extends React.Component {

  promiseModalSuccess = null;

  constructor(props) {
    super(props);
    this.state = {showModal: false, form: {details: []}};
  }

  onShow = function() {
    // this.setState({
    //   form: {
    //   }
    // });
  }

  close = function() {
    this.setState({ showModal: false });
  }

  save = function() {
    this.setState({ showModal: false });
    this.promiseModalSuccess(this.state.form);
  }

  // open = function() {
  //   let vm = this;
  //   return new Promise(function(success) {
  //     vm.setState({ showModal: true });
  //     vm.promiseModalSuccess = success;
  //   });
  // };
  open = function(budget) {
    let me = this;
    return new Promise(function(success) {
      let state = {
        showModal: true,
        form: {}
      };
      if (budget) {
        state.form['description'] = budget.description;
        const startDate = moment(budget.startDate);
        state.form['startDate'] = startDate.toDate();
        const endDate = moment(budget.endDate);
        state.form['endDate'] = endDate.toDate();
      }
      me.setState(state);
      me.promiseModalSuccess = success;
    });
  };

  descriptionInputOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {description: e.target.value})})
  }
  startDateInputOnChange = function(date) {
    this.setState({form: Object.assign(this.state.form, {startDate: date})})
  }

  endDateInputOnChange = function(date) {
    this.setState({form: Object.assign(this.state.form, {endDate: date})})
  }

  render(){

    return (
      <Modal className="budget-modal-container" show={this.state.showModal} onHide={this.close.bind(this)} onShow={this.onShow.bind(this)} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title><Translate value="budget.modal.title" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                <Translate value="budget.modal.description" />
              </Col>
              <Col sm={9}>
                <FormControl autoFocus ref="descriptionInput" type="text" value={this.state.form.description} onChange={this.descriptionInputOnChange.bind(this)} placeholder={ I18n.t("budget.modal.descriptionPlaceHolder") } />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                <Translate value="budget.modal.startDate" />
              </Col>
              <Col sm={9}>
                <DateInput
                  className="form-control"
                  value={this.state.form.startDate}
                  onChange={this.startDateInputOnChange.bind(this)}
                />

              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                <Translate value="budget.modal.endDate" />
              </Col>
              <Col sm={9}>
                <DateInput
                  className="form-control"
                  value={this.state.form.endDate}
                  onChange={this.endDateInputOnChange.bind(this)}
                />

              </Col>
            </FormGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.save.bind(this)}><Translate value="budget.modal.buttons.save" /></Button>
          <Button bsStyle="warning" onClick={this.close.bind(this)}><Translate value="budget.modal.buttons.cancel" /></Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports = BudgetModal;
