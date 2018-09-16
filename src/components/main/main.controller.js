function mainController($window, $scope, USER_ROLES, AuthService, $mdSidenav, $timeout, userDialogProvider, navToolbarService) {
  'ngInject';
  var vm = this;

  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  vm.updateUserDialog = function(ev) {
    navToolbarService.userProfile().then(userInfo => {
      userDialogProvider.updateLimitUserDialog(ev, userInfo.user);
    });
  };

  vm.__BRANCH = __BRANCH;
  vm.__DATE = __DATE;
}
  
export default mainController;
