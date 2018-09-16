import loginTemplate from './views/login.view.html';

function loginState($stateProvider, $urlRouterProvider, USER_ROLES) {
	'ngInject';
	$stateProvider
	.state('login', {
		url: '/login',
		data        : { 
      authorizedRoles: [USER_ROLES.all]
    },
		templateUrl: loginTemplate,
		controller: 'loginController',
		controllerAs: 'vm',
		// resolve: {
		// 	loginService: loginService
		// }
	});
	$urlRouterProvider.otherwise('/404');
}

// function loginService(loginService) {
// 	'ngInject';
// 	return loginService.signIn;
// }

export default loginState;
