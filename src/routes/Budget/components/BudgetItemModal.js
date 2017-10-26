import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import moment from 'moment'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DateInput from '../../../components/DateInput'
import './BudgetItemModal.scss'
import CategoryService from '../../Category/modules/CategoryService'
import { Translate } from 'react-redux-i18n';

class BudgetModal extends React.Component {

  promiseModalSuccess = null;

  constructor(props) {
    super(props);
    this.state = {showModal: false, form: {type: 'D'}};
  }

  onShow = function() {
    //
  }

  close = function() {
    this.setState({ showModal: false });
  }

  save = function() {
    this.setState({ showModal: false });
    CategoryService.getCategoryById(this.state.form.category)
      .then((category) => {
        this.state.form.category = category;
        this.promiseModalSuccess(this.state.form);
      })
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
        state.form['category'] = budgetItem.category ? budgetItem.category._id : null;
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
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, ''); //workaround TODO:fix it
    var regExp = new RegExp('\\' + thousandSeparator, 'g');
    var strNumber = e.replace(regExp, '');
    this.setState({form: Object.assign(this.state.form, {value: Number.parseFloat(strNumber)})});
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
          <Modal.Title><Translate value="budget.itemModal.title" /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                <Translate value="budget.itemModal.category" />
              </Col>
              <Col sm={10}>
                <Select.Async
                  autofocus
                  ref="categoryInput"
                  name="form-field-name"
                  loadOptions={ CategoryService.getCategoriesForSelects }
                  value={this.state.form.category}
                  onChange={this.categoryInputChange.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                <Translate value="budget.itemModal.description" />
              </Col>
              <Col sm={10}>
                <FormControl ref="descriptionInput" type="text" value={this.state.form.description} onChange={this.descriptionInputOnChange.bind(this)} placeholder="Description" />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                <Translate value="budget.itemModal.value" />
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
                <Radio name="type" value="C" inline defaultChecked={ this.state.form.type === "C" }><Translate value="budget.itemModal.income" /></Radio>
                <Radio name="type" value="D" inline defaultChecked={ this.state.form.type === "D" }><Translate value="budget.itemModal.expense" /></Radio>
              </Col>
            </FormGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.save.bind(this)}><Translate value="budget.itemModal.buttons.save" /></Button>
          <Button bsStyle="warning" onClick={this.close.bind(this)}><Translate value="budget.itemModal.buttons.cancel" /></Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

module.exports = BudgetModal;
