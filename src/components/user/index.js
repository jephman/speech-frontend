import angular from 'angular';

import userController from './user.controller';
import userService from './user.service';
import userState from './user.state';

import home from './modules/home'

export default angular.module('page.user',[
  home
])
.controller('userController', userController)
.factory('userService', userService)
.config(userState)
.name;