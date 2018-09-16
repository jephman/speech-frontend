import angular from 'angular';

import userDialogProvider from './dialog.provider';

import userDialogController from './user.dialog.controller';

export default angular.module('page.user.dialog',[])
.controller('userDialogController', userDialogController)
.factory('userDialogProvider', userDialogProvider)
.name;