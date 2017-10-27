import React from 'react'
import './Category.scss';
import PageBody from '../../../components/PageBody';
import PageHeaderCrud from '../../../components/PageHeaderCrud';
import CategoryModal from './CategoryModal'
import DeniReactTreeView from 'deni-react-treeview';
import { CRUD_ACTION_BUTTON_DELETE, CRUD_ACTION_BUTTON_EDIT } from '../../../constants'
import 'bootstrap/dist/css/bootstrap.css'
import Dialog from 'react-bootstrap-dialog'
import { I18n } from 'react-redux-i18n';

class Category extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.categories.data.length === 0) {
      this.props.fetchCategories();
    }
  }

  categoryModal(category, parent) {
    let selectedItem = this.refs.treeview.api.getSelectedItem();
    if (selectedItem) {
      let parentCategory = parent || selectedItem || this.refs.treeview.api.getRootNode();
      this.refs.CategoryModal.open(category, parentCategory)
        .then(categoryReturned => {
          if (category) {
            categoryReturned._id = selectedItem.id;
            this.props.updCategory(categoryReturned);
            selectedItem.text = categoryReturned.text;
          } else {
            this.props.addCategory(this.refs.treeview, categoryReturned.parent, categoryReturned.text, false);
          }
        })
    } else {
      this.refs.dialog.showAlert(I18n.t('category.youHaveToSelect'));
    }
  }

  delCategoryClick(id) {
    this.refs.dialog.show({
      body: I18n.t('category.confirmDeletion'),
      actions: [
        Dialog.CancelAction(),
        Dialog.DefaultAction('Confirm', () => {
          this.props.delCategory(this.refs.treeview, id);
        }, 'btn-danger')
      ],
      onHide: (dialog) => {}
    })
  }

  onActionButtonClick(item, actionButton) {
    switch (actionButton.props.name) {
      case 'FaTrashO':
        this.delCategoryClick(item.id)
        event.preventDefault();
        break;
      case 'FaEdit':
        this.categoryModal(item, this.refs.treeview.api.getParentNode(item))
        break;
      default:
    }
  }

  render() {

    const header = (
      <PageHeaderCrud
        newRecordButtonClick={ this.categoryModal.bind(this, null, null) }
      />
    );

    const actionButtons = [CRUD_ACTION_BUTTON_EDIT, CRUD_ACTION_BUTTON_DELETE];

    const items = this.props.categories.data.children ? this.props.categories.data : null;

    const body = (
      items ? (
        <DeniReactTreeView
          ref="treeview"
          items={ items }
          selectRow={ true }
          showRoot={ false }
          actionButtons={ actionButtons }
          onActionButtonClick={ this.onActionButtonClick.bind(this) }
        />
      ) : null
    );

    return (
      <div className="category-viewport">
        <CategoryModal ref='CategoryModal'/>
        <Dialog ref='dialog'/>
        <PageBody header={header} body={body} />
      </div>
    )

  }

}

export default Category
