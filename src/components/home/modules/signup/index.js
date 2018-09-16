import angular from 'angular';

import subSignupController from './signup.controller';
import subSignupService from './signup.service';
import subSignupState from './signup.state';

export default angular.module('page.home.signup',[])
.controller('homeSignupController', subSignupController)
.factory('homeSignupService', subSignupService)
.config(subSignupState)
.name;