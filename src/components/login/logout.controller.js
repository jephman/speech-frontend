function logoutController($q, $state, $http, $window, $injector, loginService, Session, AuthService, logger) {
  'ngInject';
  var vm = this;

  activate();
  function activate() {
    var promises = [logout()];
    
    return $q.all(promises).then(function() {
      console.log('Logging out...');
    });
  }

  function logout() {
    // $injector.get('$state').transitionTo('logout')
    return loginService.signOut().then(function (result) {
      if (AuthService.isAuthenticated()) {
        Session.destroy();
        delete $window.localStorage.token;
        $state.go('login');
        logger.success('Successfully Logged Out', 200);
      }
    }).catch(function (error) {
      Session.destroy();
      delete $window.localStorage.token;
      $state.go('login');
      logger.success('Successfully Logged Out', 200);
    });
    // .finally(function(){ 
      // console.log(test);
    // });
  }
}

export default logoutController;