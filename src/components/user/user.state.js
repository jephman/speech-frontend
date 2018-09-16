import userTemplate from './views/user.view.html';

function State($stateProvider, $urlRouterProvider, USER_ROLES) {
	'ngInject';
	$stateProvider
	.state('main.user', {
    abstract    : true,
    url         : '/user',
    name        : 'user',
    data        : { 
      pageTitle: 'User Management',
      authorizedRoles: [USER_ROLES.admin],
    },
    views       : {
      '': {
        templateUrl: userTemplate,
        controller  : "userController",
        controllerAs: 'vm',
      }
    }
  });
	$urlRouterProvider.otherwise('/404');
}

// dataTable.$injector = ['masterlistService']
// function dataTable(masterlistService) {
//   return masterlistService.operators
// }

export default State;
