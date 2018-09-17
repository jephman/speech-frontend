import homeTemplate from './views/home.view.html';

function State($stateProvider, $urlRouterProvider, USER_ROLES) {
	'ngInject';
	$stateProvider
	.state('main.home', {
    abstract    : true,
    url         : '/home',
    name        : 'home',
    data        : { 
      pageTitle: 'Home',
      authorizedRoles: [USER_ROLES.all]
    },
    views       : {
      '': {
        templateUrl: homeTemplate,
        controller  : "homeController",
        controllerAs: 'vm',
      }
    },
  });
	$urlRouterProvider.otherwise('/404');
}

// dataTable.$injector = ['masterlistService']
// function dataTable(masterlistService) {
//   return masterlistService.operators
// }

export default State;
