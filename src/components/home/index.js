import angular from 'angular';

import homeController from './home.controller';
import homeService from './home.service';
import homeState from './home.state';

import index from './modules/index'

export default angular.module('page.home',[
  index
])
.controller('homeController', homeController)
.factory('homeService', homeService)
.config(homeState)
.name;