import mainPanelTemplate from '../../views/main-panel.view.html';
import indexTemplate from './views/index.view.html';

function State($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
	.state('main.home.index', {
      name    : 'index',
      url     : '',
      data: { subTitle : 'Home'},
      views: {
        '': {
          templateUrl: mainPanelTemplate,
          controller  : 'homeIndexController',
          controllerAs: 'vm'
        },
        'panel@main.home.index': { 
          templateUrl: indexTemplate
        }
      }
  });
	$urlRouterProvider.otherwise('/404');
}

export default State;
