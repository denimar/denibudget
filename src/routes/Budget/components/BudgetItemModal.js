import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import moment from 'moment'
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import commonConstant from '../../../../common/common.constant'
import DateInput from '../../../components/DateInput'
import './BudgetItemModal.scss'

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

class BudgetModal extends React.Component {

  promiseModalSuccess = null;

  constructor(props) {
    super(props);
    this.state = {showModal: false, form: {type: 'D'}};
  }

  onShow = function() {
    // this.setState({
    //   form: {
    //     description: '',
    //     type: 'D',
    //     value: 0
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

  open = function(budget, budgetItem) {
    let me = this;
    me.budget = budget;
    return new Promise(function(success) {
      let state = {
        showModal: true,
        form: {
          type: 'D'
        }
      };
      if (budgetItem) {
        state.form['description'] = budgetItem.description;
        state.form['category'] = budgetItem.category;
        state.form['type'] = budgetItem.type;
        state.form['value'] = budgetItem.value;
      }
      me.setState(state);
      me.promiseModalSuccess = success;
    });
  };

  descriptionInputOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {description: e.target.value})})
  }

  budgetValueOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {value: Number.parseFloat(e)})});
  }

  typeOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {type: e.target.value})});
  }

  categoryInputChange(item) {
    let form = Object.assign({}, this.state.form, {category: item ? item.value : null});
    this.setState({form: form});
  }

  render(){

    return (
      <Modal className="budget-item-modal-container" show={this.state.showModal} onHide={this.close.bind(this)} onShow={this.onShow.bind(this)} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title>Budget Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                Category
              </Col>
              <Col sm={10}>
                <Select.Async
                  autofocus
                  ref="categoryInput"
                  name="form-field-name"
                  loadOptions={getCategories}
                  value={this.state.form.category}
                  onChange={this.categoryInputChange.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={10}>
                <FormControl ref="descriptionInput" type="text" value={this.state.form.description} onChange={this.descriptionInputOnChange.bind(this)} placeholder="Description" />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                Value
              </Col>
              <Col sm={3}>
                <CurrencyInput
                  ref="valueInput"
                  className="form-control"
                  value={this.state.form.value}
                  onChange={this.budgetValueOnChange.bind(this)}
              />
              </Col>
            </FormGroup>

            <FormGroup ref="typeRadioGroup" value={this.state.form.type} onChange={this.typeOnChange.bind(this)}>
              <Col smOffset={2} sm={10}>
                <Radio name="type" value="C" inline defaultChecked={ this.state.form.type === "C" }>Income</Radio>
                <Radio name="type" value="D" inline defaultChecked={ this.state.form.type === "D" }>Expense</Radio>
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

module.exports = BudgetModal;
