import angular from 'angular';

const CONFIG = {
  api_base_url: 'http://localhost:8080/api'
}

const AUTH_EVENTS = {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
}

const USER_ROLES = {
  all   : '*',
  super : 'super',
  admin : 'admin',
  manager: 'manager',
  user  : 'user',
  auth  : 'auth',
  guest : 'guest'
}

export default angular.module('app.constants',[])
.constant('CONFIG',CONFIG)
.constant('AUTH_EVENTS', AUTH_EVENTS)
.constant('USER_ROLES', USER_ROLES)
.name;