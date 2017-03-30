import React from 'react'
import { Modal, Button } from 'react-bootstrap';

class CategoryContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }

  open = function() {
    let vm = this;
    return new Promise(function(success) {
      vm.setState({ showModal: true });
    });
  };

  render() {
    return (
      <Modal.Dialog className="category-modal-container" show={this.state.showModal}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          One fine body...
        </Modal.Body>

        <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>

      </Modal.Dialog>
    )
  }

}
