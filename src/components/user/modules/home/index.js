import angular from 'angular';

import subHomeController from './home.controller';
import subHomeService from './home.service';
import subHomeState from './home.state';

import userDialogs from './dialogs' 

export default angular.module('page.user.home',[userDialogs])
.controller('homeUserController', subHomeController)
.factory('homeUserService', subHomeService)
.config(subHomeState)
.name;