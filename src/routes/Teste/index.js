import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'teste',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define dependencies for bundling   */
      const testeContainer = require('./components/TesteContainer').default
      const reducer = require('./modules/testeReducer').default

      /*  Add the reducer to the store on key 'customers'  */
      injectReducer(store, { key: 'teste', reducer })

      /*  Return getComponent   */
      cb(null, testeContainer)

    /* Webpack named bundle   */
    }, 'teste')
  }
})
