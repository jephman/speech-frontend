import moment from 'moment';
import _map from 'lodash/map';

function userDialogController ($rootScope, $scope, $timeout, $mdDialog, $window, homeUserService, Session, logger) {
  'ngInject';
  
  var vm = this;
  if(vm.hasOwnProperty('user_data')){  
    vm.user = JSON.parse(JSON.stringify(vm.user_data));
  }

  vm.addUser = function (userInfo, form) {
    homeUserService.addUser(userInfo)
    .then(function(result) {
      if(result.status == 201){
        refreshUserList();
        logger.success("Successfully added user");
        vm.cancel();
      }
    })
    .catch(function(error) {
      if(error.status >= 400 && error.status <=499) {
        _map(error.data, function(errorData) {
          logger.error(errorData[0]);
        })
      }else {
        logger.error("Can't connect to server");
      }
      console.log('error', error);
    })
  }

  vm.updateUser = function (userInfo, form) {
    homeUserService.updateUser(userInfo, vm.user_data.id)
    .then(function(result) {
      if(result.status == 201){
        refreshUserList();
        logger.success("Successfully updated user");
        vm.cancel();
      }
    })
    .catch(function(error) {
      if(error.status >= 400 && error.status <=499) {
        _map(error.data, function(errorData) {
          logger.error(errorData[0]);
        })
      }else {
        logger.error("Can't connect to server");
      }
      console.log('error', error);
    })
  }

  vm.updateLimitUser = function (userInfo, form) {
    homeUserService.updateLimitUser(userInfo, vm.user_data.id)
    .then(function(result) {
      if(result.status == 201){
        refreshUserList();
        logger.success("Successfully updated user");
        vm.cancel();
      }
    })
    .catch(function(error) {
      if(error.status >= 400 && error.status <=499) {
        _map(error.data, function(errorData) {
          logger.error(errorData);
        })
      }else {
        logger.error("Can't connect to server");
      }
      console.log('error', error);
    })
  }

  vm.hide = function() {
    $mdDialog.hide();
  };
  
  vm.cancel = function() {
    $mdDialog.cancel();
  };

  function refreshUserList() {
    $rootScope.$emit("refreshUserList");
  }
}
export default userDialogController;