import angular from 'angular';

import mainController from './main.controller';
import navToolbarService from './main.service';
import mainState from './main.state';

export default angular.module('page.main',[])
.controller('mainController', mainController)
.factory('navToolbarService', navToolbarService)
.config(mainState)
.name;