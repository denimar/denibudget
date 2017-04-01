import React from 'react'
import './Category.scss';
import DeniReactTreeView from 'deni-react-treeview';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'

class Category extends React.Component {

  constructor(props) {
    super(props);
  }

  addCategoryClick() {
    let selectedItem = this.refs.treeview.api.getSelectedItem() || this.refs.treeview.api.getRootNode();
    this.props.addCategory(this.refs.treeview, selectedItem.id, 'Now Denimar', false);
  }

  deleteItemClick(id) {
    this.props.delCategory(this.refs.treeview, id);
  }

  editItemClick() {
    alert('editing routine here...')
  }

  onActionButtonClick(item, actionButton) {
    const buttonName = actionButton.type.name;

    switch (buttonName) {
      case 'FaTrashO':
        this.deleteItemClick(item.id)
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
        newRecordButtonClick={this.addCategoryClick.bind(this)}
      />
    );

    const actionButtons = [CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT];

    const body = (
      <DeniReactTreeView
        ref="treeview"
        json="/endpoints/category"
        selectRow={true}
        showRoot={true}
        actionButtons={actionButtons}
        onActionButtonClick={this.onActionButtonClick.bind(this)}
      />
    );

    return (
      <div className="category-viewport">
        <PageBody header={header} body={body} />
      </div>
    )

  }

}

export default Category
