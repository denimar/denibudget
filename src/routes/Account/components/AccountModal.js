import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';
import 'bootstrap/dist/css/bootstrap.css'
import './AccountModal.scss'

class AccountModal extends React.Component {

  promiseModalSuccess = null;

  constructor(props) {
    super(props);
    this.state = {showModal: false, form: {name: '', openingBalance: 0}};
  }

  onShow = function() {
    this.setState({
      form: {
        name: '',
        openingBalance: 0
      }
    });
  }

  close = function() {
    this.setState({ showModal: false });
  }

  save = function() {
    console.log('here')
    this.setState({ showModal: false });
    this.promiseModalSuccess(this.state.form);
  }

  open = function() {
    let vm = this;
    return new Promise(function(success) {
      vm.setState({ showModal: true });
      vm.promiseModalSuccess = success;
    });
  };

  nameInputOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {name: e.target.value})})
  }

  openingBalanceOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {openingBalance: Number.parseFloat(e)})});

  }

  render(){

    return (
      <Modal className="account-modal-container" show={this.state.showModal} onHide={this.close.bind(this)} onShow={this.onShow.bind(this)} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title>Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Name
              </Col>
              <Col sm={8}>
                <FormControl ref="nameInput" type="text" value={this.state.form.name} onChange={this.nameInputOnChange.bind(this)} placeholder="Name" autoFocus />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={4}>
                Opening Balance
              </Col>
              <Col sm={3}>
                <CurrencyInput ref="openingBalanceInput" className="form-control" value={this.state.form.openingBalance} onChange={this.openingBalanceOnChange.bind(this)} />
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

module.exports = AccountModal;
