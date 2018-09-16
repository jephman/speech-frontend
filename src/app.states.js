import angular from 'angular';
import notFoundTemplate from './shared/404.html';

function appStates ($stateProvider, $urlRouterProvider, $locationProvider, USER_ROLES) {
  'ngInject';
  $locationProvider.html5Mode(true);
  // any unknown URLS go to 404
  $urlRouterProvider.otherwise('/404');
  // no route goes to index
  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/', '/home');
  
  // use a state provider for routing
  $stateProvider
  .state('404', {
    url        : '/404',
    templateUrl: notFoundTemplate,
    data        : { 
      authorizedRoles: [USER_ROLES.all]
    }
  })
  .state('logout', {
    url   : '/logout',
    controller : "logoutController",
    controllerAs: "vm",
    data        : { 
      authorizedRoles: [USER_ROLES.all]
    }
  });
}

function appStateRootInit ($rootScope,$stateParams, $state){
  'ngInject';
  $rootScope.state = $state;
  $rootScope.params = $stateParams;
}

export default angular.module('app.states',[])
.config(appStates) 
.run(appStateRootInit)
.name;