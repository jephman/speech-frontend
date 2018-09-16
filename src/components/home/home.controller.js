function Controller($timeout, $state, $http, $window) {
  'ngInject';
  var vm = this;
  vm.viewStateTitle = $state.current.data.pageTitle;
}

export default Controller;