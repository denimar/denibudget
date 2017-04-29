import React from 'react'
import './Category.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import DeniReactTreeView from 'deni-react-treeview';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog'

class Category extends React.Component {

  constructor(props) {
    super(props);
  }

  addCategoryClick() {
    let selectedItem = this.refs.treeview.api.getSelectedItem() || this.refs.treeview.api.getRootNode();
    this.props.addCategory(this.refs.treeview, selectedItem.id, 'Now Denimar', false);
  }

  delCategoryClick(id) {
    this.refs.dialog.show({
      body: 'Confirm Category Deletion?',
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delCategory(this.refs.treeview, id);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  editItemClick() {
    alert('editing routine here...')
  }

  onActionButtonClick(item, actionButton) {
    const buttonName = actionButton.type.name;

    switch (buttonName) {
      case 'FaTrashO':
        this.delCategoryClick(item.id)
        event.preventDefault();
        break;
      case 'FaEdit':
        this.editItemClick(item.id)
        break;
      default:
    }
  }

  render() {

    const header = (
      <PageHeaderCrud
        newRecordButtonClick={ this.addCategoryClick.bind(this) }
      />
    );

    const actionButtons = [CRUD_ACTION_BUTTON_EDIT, CRUD_ACTION_BUTTON_DELETE];

    const body = (
      <DeniReactTreeView
        ref="treeview"
        json="/endpoints/category"
        selectRow={ true }
        showRoot={ false }
        actionButtons={ actionButtons }
        onActionButtonClick={ this.onActionButtonClick.bind(this) }
      />
    );

    return (
      <div className="category-viewport">
        <Dialog ref='dialog'/>
        <PageBody header={header} body={body} />
      </div>
    )

  }

}

export default Category
