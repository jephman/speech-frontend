import _findIndex from 'lodash/findIndex';
import _map from 'lodash/map';

function Controller($rootScope, $q, $state, $http, $injector, $scope, $timeout, userDialogProvider,homeUserService, userList, logger) {
  'ngInject';
  var vm = this;
  vm.SubTitle = $state.current.data.subTitle;
  vm.userList = userList;

  vm.addUserDialog = function(ev) {
    userDialogProvider.addUserDialog(ev);
  };
  vm.updateUserDialog = function(ev, user_data) {
    userDialogProvider.updateUserDialog(ev, user_data);
  };
  vm.deleleUserDialog = function(ev, user_id, index) {
    userDialogProvider.confirmation(ev,'Delete','Are you sure you want to delete user?', function() {
      homeUserService.deleteUser(user_id)
      .then(function(result) {
        if(result.status == 201){
          logger.success("Successfully Deleted user");
          vm.userList.splice(index, 1);
        }
      })
      .catch(function(error) {
        if(error.status >= 400 && error.status <=499) {
          logger.error(error.data.error);
        }
      })
    })
  };

  

 // activate();
  function activate() {
    // var promises = [get_platform_stats_by_type()];
    
    // return $q.all(promises).then(function() {
    //   console.log('Activated Dashboard View');
    // });
  }
  vm.disabled = [];
  vm.loading = [];
  
  
  vm.disableUser = function (user_id, index) {
    vm.disabled[index] = true;
    vm.loading[index] = true;
    homeUserService.disableUser(user_id)
    .then(function(result) {
      vm.disabled[index] = false;
      vm.loading[index] = false;
      let key = _findIndex(vm.userList, {id: result.data.values.id});
      vm.userList.splice(key, 1, result.data.values);
    })
    .catch(function(error) {
      logger.error("Can't connect to server");
      console.log('error', error);
    })
  };

  vm.enableUser = function (user_id, index) {
    vm.disabled[index] = true;
    vm.loading[index] = true;
    homeUserService.enableUser(user_id)
    .then(function(result) {
      vm.disabled[index] = false;
      vm.loading[index] = false;
      let key = _findIndex(vm.userList, {id: result.data.values.id});
      vm.userList.splice(key, 1, result.data.values);
    })
    .catch(function(error) {
      logger.error("Can't connect to server");
      console.log('error', error);
    })
  };

  function getUserList () {
    homeUserService.userList()
    .then(function(result) {
      vm.userList = result;
    })
    .catch(function(error) {
      logger.error("Can't connect to server");
      console.log('error', error);
    })
  };

  let refreshUserList = $rootScope.$on("refreshUserList", function(){
    getUserList();
  });
  $scope.$on('$destroy', refreshUserList);

}

export default Controller;