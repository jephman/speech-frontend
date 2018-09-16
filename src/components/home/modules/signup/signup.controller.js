function Controller($q, $state, $http, $injector, $scope, $timeout, homeSignupService) {
  'ngInject';
  var vm = this;
  vm.signup = signup;
  vm.SubTitle = $state.current.data.subTitle;
  // activate();

  function activate() {
    // var promises = [get_platform_stats_by_type()];
    
    // return $q.all(promises).then(function() {
    //   console.log('Activated Dashboard View');
    // });
  }
  function signup (form, formData){
    homeSignupService.signup(formData)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export default Controller;