import angular from 'angular';

import subIndexController from './index.controller';
import subIndexService from './index.service';
import subIndexState from './index.state';

export default angular.module('page.home.index',[])
.controller('homeIndexController', subIndexController)
.factory('homeIndexService', subIndexService)
.config(subIndexState)
.name;