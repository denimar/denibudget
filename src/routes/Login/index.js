import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const loginContainer = require('./components/LoginContainer').default;
      const loginReducer = require('./modules/loginReducer').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'login', reducer: loginReducer })

      /*  Return getComponent   */
      cb(null, loginContainer )

    /* Webpack named bundle   */
    }, 'login')
  }
})