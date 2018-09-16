import angular from 'angular';

import loginController from './login.controller';
import logoutController from './logout.controller';
import loginService from './login.service';
import loginState from './login.state';

export default angular.module('page.login',[])
.controller('loginController', loginController)
.controller('logoutController', logoutController)
.factory('loginService', loginService)
.config(loginState)
.name;