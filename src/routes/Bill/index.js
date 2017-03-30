import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'bill',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const billContainer = require('./components/BillContainer').default
      const reducer = require('./modules/billReducer').default

      /*  Add the reducer to the store on key 'bills'  */
      injectReducer(store, { key: 'bills', reducer })

      /*  Return getComponent   */
      cb(null, billContainer)

    /* Webpack named bundle   */
    }, 'bill')
  }
})
