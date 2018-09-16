import mainPanelTemplate from '../../views/main-panel.view.html';
import homeTemplate from './views/home.view.html';

function State($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
	.state('main.user.home', {
      name    : 'home',
      url     : '',
      data: { subTitle : 'User List'},
      views: {
        '': {
          templateUrl: mainPanelTemplate,
          controller  : 'homeUserController',
          controllerAs: 'vm'
        },
        'panel@main.user.home': { 
          templateUrl: homeTemplate
        }
      },
      resolve: {
        userList,
      }
  });
	$urlRouterProvider.otherwise('/404');
}

function userList (homeUserService) {
  'ngInject'; 
  return homeUserService.userList();
}


export default State;
