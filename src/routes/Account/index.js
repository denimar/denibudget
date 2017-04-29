import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'account',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const accountContainer = require('./components/AccountContainer').default
      const accountReducer = require('./modules/accountReducer').default
      const howMuchMoneyBudgetsReducer = require('./modules/howMuchMoneyBudgetsReducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'accounts', reducer: accountReducer })
      injectReducer(store, { key: 'howMuchMoneyBudgets', reducer: howMuchMoneyBudgetsReducer })

      /*  Return getComponent   */
      cb(null, accountContainer )

    /* Webpack named bundle   */
    }, 'account')
  }
})
