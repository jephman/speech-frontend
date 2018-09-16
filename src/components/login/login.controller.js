function loginController($rootScope, $scope, $window, Session, AuthService, AUTH_EVENTS, $state, loginService, logger) {
  'ngInject';
  var vm = this;

  vm.login = (credentials) => {
    return loginService.signIn(credentials)
    .then(function (data) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

      Session.create(data.token, data.user.id,data.user.role);
      $window.localStorage.token = data.token;
      $state.go('main.dashboard.index');
      logger.success('Successfully Logged In');
    })
    .catch(function(error){
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      logger.error(error.data, error.status);
    })
    .finally(function(){ 
      console.log(test);
    });
    }
}


export default loginController;
