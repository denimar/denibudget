import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'budget',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const budgetContainer = require('./components/BudgetContainer').default
      const reducer = require('./modules/budgetReducer').default

      /*  Add the reducer to the store on key 'budgets'  */
      injectReducer(store, { key: 'budgets', reducer })

      /*  Return getComponent   */
      cb(null, budgetContainer)

    /* Webpack named bundle   */
    }, 'budget')
  }
})
