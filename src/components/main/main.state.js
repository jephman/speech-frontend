import mainTemplate from './views/main.view.html';
import navTemplate from './views/nav-toolbar.view.html';

function mainState($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
	.state('main', {
		abstract: true,
		name        : 'main',
		url         : '',
		views       : {
			'': {
				templateUrl : mainTemplate,
				controller  : "mainController",
				controllerAs: 'vm',
			},
			'nav-toolbar@main': { 
				templateUrl : navTemplate
			}
		}
  });
	$urlRouterProvider.otherwise('/404');
}

export default mainState;
