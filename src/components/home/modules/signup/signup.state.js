import mainPanelTemplate from '../../views/main-panel.view.html';
import signupTemplate from './views/signup.view.html';

function State($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
	.state('main.home.signup', {
      name    : 'signup',
      url     : '/signup',
      data: { subTitle : 'Signup'},
      views: {
        '': {
          templateUrl: mainPanelTemplate,
          controller  : 'homeSignupController',
          controllerAs: 'vm'
        },
        'panel@main.home.signup': { 
          templateUrl: signupTemplate
        }
      }
  });
	$urlRouterProvider.otherwise('/404');
}

export default State;
