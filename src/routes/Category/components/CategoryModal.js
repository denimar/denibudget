import React from 'react'
import { Modal, Button, Form, FormGroup, FormControl, Checkbox, Col, ButtonGroup, Input, ControlLabel, FieldGroup, Radio } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CategoryService from '../modules/CategoryService'
import './CategoryModal.scss'

class CategoryModal extends React.Component {

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


  open = function(category, categoryParent) {
    let self = this;
    return new Promise(function(success) {
      let state = {
        showModal: true,
        form: {}
      }
      if (category) {
        state.form['_id'] = category._id;
        state.form['parent'] = category.parent;
        state.form['text'] = category.text;
      }
      if (categoryParent) {
        state.form['parent'] = categoryParent.id;
      }
      self.setState(state);
      self.promiseModalSuccess = success;
    });
  };

  categoryInputChange(item) {
    let form = Object.assign({}, this.state.form, {parent: item ? item.value : null});
    this.setState({form: form});
  }

  textInputOnChange = function(e) {
    this.setState({form: Object.assign(this.state.form, {text: e.target.value})})
  }

  render() {
    return (
      <Modal className="category-modal-container" show={this.state.showModal} autoFocus >
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal ref='Form'>

            <FormGroup >
              <Col componentClass={ControlLabel} sm={2}>
                Parent
              </Col>
              <Col sm={10}>
                <Select.Async
                  autofocus
                  ref="categoryInput"
                  name="form-field-name"
                  loadOptions={ CategoryService.getCategoriesForSelects }
                  value={this.state.form.parent}
                  onChange={this.categoryInputChange.bind(this)}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={10}>
                <FormControl ref="textInput" type="text" value={this.state.form.text} onChange={this.textInputOnChange.bind(this)} placeholder="Category Description" autoFocus />
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

module.exports = CategoryModal;
