import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import moment from 'moment'
import Pikaday from 'pikaday';
import ReactPikaday from 'react-pikaday';
import axios from 'axios';
require('./BillModal.scss');
require('pikaday/css/pikaday.css');
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const commonConstant = require('../../../../common/common.constant');

var getCategories = function(input, callback) {

  const url = commonConstant.ENDPOINT.CATEGORY_LIST

  axios.get(url)
    .then((response) => {

      callback(null, {
        options: response.data,
        // labelKey: 'path',
        // valueKey: 'id',
        complete: true
      });

    })
    .catch((err) => {
      console.warn(err);
    });

};

class BillModal extends React.Component {

  promiseModalSuccess = null;

  constructor(props) {
    super(props);
    this.state = {showModal: false, form: {type: 'D'}};
  }

  onShow = function() {
    this.setState({
      form: {
        date: new Date(),
        description: '',
        type: 'D',
        value: 0
      }
    });
  }

  close = function() {
    this.setState({ showModal: false });
  }

  save = function() {
    this.setState({ showModal: false });
    //this.state.form.date = this.state.form.date.toJSON();
    this.promiseModalSuccess(this.state.form);
  }

  open = function() {
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

  billValueOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {value: Number.parseFloat(e)})});

  }

  typeOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {type: e.target.value})});
  }

  categoryInputChange(item) {
    let form = Object.assign({}, this.state.form, {category: item.value});
    this.setState({form: form});
  }

  render(){

    return (
      <Modal className="bill-modal-container" show={this.state.showModal} onHide={this.close.bind(this)} onShow={this.onShow.bind(this)} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title>Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup>
              <Col sm={2}>
                Date
              </Col>
              <Col sm={10}>
                <ReactPikaday
                  className="form-control"
                  value={this.state.form.date}
                  onChange={this.dateInputOnChange.bind(this)}
                  format='dddd, DD [de] MMMM [de] YYYY'
                />

              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                Account
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
                <CurrencyInput ref="valueInput" className="form-control" value={this.state.form.value} onChange={this.billValueOnChange.bind(this)} />
              </Col>
            </FormGroup>

            <FormGroup ref="typeRadioGroup" value={this.state.form.type} onChange={this.typeOnChange.bind(this)}>
              <Col smOffset={2} sm={10}>
                <Radio name="type" value="C" inline defaultChecked={this.state.form.type === "C"} >Credit</Radio>
                <Radio name="type" value="D" inline defaultChecked={this.state.form.type === "D"}>Debit</Radio>
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

module.exports = BillModal;
