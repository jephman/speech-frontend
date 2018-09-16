import angular from 'angular';

function TokenInterceptor($q, $window, $location, $injector, $rootScope, AUTH_EVENTS ){
  'ngInject';
  return {
    request: function (config) {
      //      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers['Authorization'] = `Bearer ${$window.localStorage.token}`;
      }
      return config;
    },

    requestError: function(rejection) {
      return $q.reject(rejection);
    },

    /* Set Authentication.isAuthenticated to true if 200 received */
    response: function (response) {
      return response || $q.when(response);
    },

    /* Revoke client authentication if 401 is received */
    responseError: function(rejection) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[rejection.status], rejection);
      
      return $q.reject(rejection);
      
      // if (rejection != null && rejection.status === 401 && ($window.localStorage.token)) {
      //   Session.destroy();
      //   delete $window.localStorage.token;
      //   // $injector.get('$state').transitionTo('login');
      //   console.log('weew')
      // }
      // return $q.reject(rejection);
    }
  }
}

function AuthService ($http, Session, USER_ROLES) {
  'ngInject'
  var authService = {};
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() && (authorizedRoles.indexOf(Session.userRole) !== -1 || Session.userRole === 'super')) || 
      (authService.isAuthenticated() && authorizedRoles.indexOf(USER_ROLES.auth) !== -1) || 
      (authorizedRoles.indexOf(USER_ROLES.all) !== -1) ;
  };
 
  return authService;
}

function Session ($window, navToolbarService) {
  'ngInject';
  
  this.create = function (sessionId, userId, userRole) {
    this.id       = sessionId;
    this.userId   = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id       = null;
    this.userId   = null;
    this.userRole = null;
  };
}

export default angular
.module('app.services',[])
.factory('TokenInterceptor', TokenInterceptor)
.factory('AuthService', AuthService)
.service('Session', Session)
.name;
