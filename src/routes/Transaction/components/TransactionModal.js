import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import moment from 'moment'
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import commonConstant from '../../../../common/common.constant'
import DateInput from '../../../components/DateInput'

let getAccounts = (input, callback) => {

  const url = commonConstant.ENDPOINT.ACCOUNT;

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

let getCategories = (input, callback) => {

  const url = commonConstant.ENDPOINT.CATEGORY_LIST

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

class TransactionModal extends React.Component {

  promiseModalSuccess = null;

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      form: {
        type: 'D',
        //budgetItem: null
      }
    };
  }

  onShow = function() {
    //
  }

  close() {
    this.setState({ showModal: false });
  }

  consisteData() {
    return true;
    //
  }

  save() {
    if (this.consisteData()) {
      this.setState({ showModal: false });

      let momentDate = moment(this.state.form.date);
      console.log(momentDate.toISOString())
      //this.state.form.date = momentDate.toISOString();

      this.promiseModalSuccess(this.state.form);
    }
  }

  open = function(budget, budgetItem) {
    this.budget = budget;
    this.budgetItem = budgetItem;
    const momentToday = new moment().startOf('day');

    if (budgetItem) {
      let form = this.getBudgetItemInfo(budgetItem);
      form.date = momentToday.toDate();
      this.setState({form: form});
      // setTimeout(() => {
      //   this.refs.accountInput.select.focus();
      // }, 100)
    } else {
      this.setState({
        form: {
          date: momentToday.toDate(),
          description: '',
          type: 'D',
          budgetItem: null,
          value: 0
        }
      });
    }

    let vm = this;
    return new Promise(function(success) {
      vm.setState({ showModal: true });
      vm.promiseModalSuccess = success;
    });
  };

  dateInputOnChange = function(date) {
    this.setState({form: Object.assign(this.state.form, {date: date})})
  }

  descriptionInputOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {description: e.target.value})})
  }

  transactionValueOnChange = function(e) {
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, ''); //workaround TODO:fix it
    var regExp = new RegExp('\\' + thousandSeparator, 'g');
    var strNumber = e.replace(regExp, '');
    this.setState({form: Object.assign(this.state.form, {value: Number.parseFloat(strNumber)})});
  }

  typeOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {type: e.target.value})});
  }

  getBudgetItemInfo(budgetItem) {
    let budgetItemInfo = budgetItem ? {
      budgetItem: budgetItem._id || budgetItem.budgetItemId,
      type: budgetItem.type,
      category: budgetItem.category._id,
      value: budgetItem.value,
      description: budgetItem.description
    } : {
      budgetItem: null
    };
    return budgetItemInfo;
  }

  budgetItemInputChange(budgetItem) {
    const budgetItemInfo = this.getBudgetItemInfo(budgetItem);
    let form = Object.assign({}, this.state.form, budgetItemInfo);
    this.setState({form: form});
  }

  accountInputChange(item) {
    let form = Object.assign({}, this.state.form, {account: item ? item._id : null});
    this.setState({form: form});
  }

  categoryInputChange(item) {
    let form = Object.assign({}, this.state.form, {category: item ? item.value : null});
    this.setState({form: form});
  }

  render(){

    return (
      <Modal className="transaction-modal-container" show={this.state.showModal} onHide={this.close.bind(this)} onShow={this.onShow.bind(this)} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Date
              </Col>
              <Col sm={9}>
                <DateInput
                  className="form-control"
                  value={this.state.form.date}
                  onChange={this.dateInputOnChange.bind(this)}
                />

              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={3}>
                Budget Item
              </Col>
              <Col sm={9}>
                <Select
                  autofocus
                  ref="budgetItemInput"
                  name="form-field-budgetitem"
                  disabled={this.state.form.budgetItem !== null}
                  options={ this.budget ? this.budget.details : [] }
                  labelKey="description"
                  valueKey="_id"
                  value={this.state.form.budgetItem}
                  onChange={this.budgetItemInputChange.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={3}>
                Category
              </Col>
              <Col sm={9}>
                <Select.Async
                    ref="categoryInput"
                    name="form-field-name"
                    loadOptions={getCategories}
                    clearable={false}
                    disabled={this.state.form.budgetItem !== null}
                    value={this.state.form.category}
                    onChange={this.categoryInputChange.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Description
              </Col>
              <Col sm={9}>
                <FormControl
                  autoFocus={ this.state.form.budgetItem !== null }
                  ref="descriptionInput"
                  type="text"
                  value={this.state.form.description}
                  onChange={this.descriptionInputOnChange.bind(this)}
                  placeholder="Description" />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={3}>
                Account
              </Col>
              <Col sm={9}>
                <Select.Async
                  ref="accountInput"
                  name="form-field-name"
                  loadOptions={getAccounts}
                  labelKey="name"
                  valueKey="_id"
                  clearable={false}
                  value={this.state.form.account}
                  onChange={this.accountInputChange.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={3}>
                Value
              </Col>
              <Col sm={3}>
                <CurrencyInput
                  ref="valueInput"
                  className="form-control"
                  value={this.state.form.value}
                  onChange={this.transactionValueOnChange.bind(this)}
              />
              </Col>
            </FormGroup>

            <FormGroup ref="typeRadioGroup" value={this.state.form.type} onChange={this.typeOnChange.bind(this)} >
              <Col smOffset={2} sm={10}>
                <Radio name="type" value="C" inline defaultChecked={this.state.form.type === "C"} disabled={this.state.form.budgetItem !== null}>Income</Radio>
                <Radio name="type" value="D" inline defaultChecked={this.state.form.type === "D"} disabled={this.state.form.budgetItem !== null}>Expense</Radio>
              </Col>
            </FormGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.save.bind(this)}>Save</Button>
          <Button bsStyle="warning" onClick={this.close.bind(this)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports = TransactionModal;
