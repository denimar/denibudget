import { connect } from 'react-redux'
import { getCategories, addCategory, delCategory } from '../modules/categoryActions'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Category from './Category'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  getCategories : () => getCategories(),
  addCategory : (treeview, parentId, text, isLeaf) => addCategory(treeview, parentId, text, isLeaf),
  delCategory: (treeview, id) => delCategory(treeview, id),
}

const mapStateToProps = (state) => ({
  categories : state.categories
})


export default connect(mapStateToProps, mapDispatchToProps)(Category)
