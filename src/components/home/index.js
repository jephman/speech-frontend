import angular from 'angular';

import homeController from './home.controller';
import homeService from './home.service';
import homeState from './home.state';

import signup from './modules/signup'

export default angular.module('page.home',[
  signup
])
.controller('homeController', homeController)
.factory('homeService', homeService)
.config(homeState)
.name;