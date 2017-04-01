import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'statement',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const statementContainer = require('./components/StatementContainer').default
      const reducer = require('./modules/statementReducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'accounts', reducer })

      /*  Return getComponent   */
      cb(null, statementContainer )

    /* Webpack named bundle   */
    }, 'statement')
  }
})
