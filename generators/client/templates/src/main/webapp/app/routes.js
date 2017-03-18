import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppComponent from './App';
import privateRoute from './shared/util/private.route';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable */
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/home/Home');
  require('./modules/login/Login');
  // require('../modules/administration/GatewayPage');
  // require('./modules/administration/LogsPage');
  // require('../modules/administration/HealthPage');
  // require('../modules/administration/MetricsPage');
  // require('../modules/administration/UserManagementPage');
  // require('../modules/administration/ConfigurationPage');
  // require('../modules/administration/AuditsPage');
  // require('./modules/administration/ApiDocsPage');
  /* eslint-enable */
}
/* TODO get this working to be modular
export default (onLogout) => {
  return {
    childRoutes: [{
      path: '/',
      component: require('./App').default,
      indexRoute: require('./modules/home').default,
      childRoutes: [
        require('./modules/login').LoginRoute,
        require('./modules/login').LogoutRoute
      ]
    }]
  };
};*/

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (onLogout) => {
  return (
    <Route path="/" component={AppComponent}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/home/Home').default);
          });
        }}
      />
      <Route
        path="/login"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/login/Login').default);
          });
        }}
      />
      <Route
        path="/logout"
        onEnter={onLogout}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/login/Login').default);
          });
        }}
      />
      {/*
      <Route
        path="/admin/gateway"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, privateRoute(require('./modules/administration/GatewayPage').default));
          });
        }}
      />
      <Route
        path="/admin/logs"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            // cb(null, privateRoute(require('./modules/administration/LogsPage').default));
            cb(null, (require('./modules/administration/LogsPage').default));
          });
        }}
      />
      <Route
        path="/admin/health"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, privateRoute(require('./modules/administration/HealthPage').default));
          });
        }}
      />
      <Route
        path="/admin/metrics"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, privateRoute(require('./modules/administration/MetricsPage').default));
          });
        }}
      />
      <Route
        path="/admin/user-management"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, privateRoute(require('./modules/administration/UserManagementPage').default));
          });
        }}
      />
      <Route
        path="/admin/configuration"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, privateRoute(require('./modules/administration/ConfigurationPage').default));
          });
        }}
      />
      <Route
        path="/admin/audits"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, privateRoute(require('./modules/administration/AuditsPage').default));
          });
        }}
      />
      <Route
        path="/admin/docs"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            // cb(null, privateRoute(require('./modules/administration/ApiDocsPage').default));
            cb(null, require('./modules/administration/ApiDocsPage').default);
          });
        }}
      />
    */}
    </Route>
  );
};
