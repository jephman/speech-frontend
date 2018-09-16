import angular from 'angular';
import loginHtml from './shared/requireLogin/login.view.html';

function updateTitle($rootScope, $timeout) {
  'ngInject';
  return {
    link: function(scope, element) {

      var listener = function(event, toState) {

        var title = 'SPA';
        if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

        $timeout(function() {
          element.text(title);
        }, 0, false);
      };

      $rootScope.$on('$stateChangeSuccess', listener);
    }
  };
}

function loginDialog(CONFIG, $http, $state, $window, $timeout, logger, AUTH_EVENTS, Session) {
  'ngInject';
  //needs better implementation for handing Auth_events for all pages
  return {
    restrict: 'A',
    template: `
    <div ng-if="visible">
      <div class="custom-require-login-overlay"></div>
      <div class="custom-require-login">
        <div ng-include="'${loginHtml}'"></div>
      </div>
    </div>
    `,
    link: function (scope) {
      var vm = scope;
      scope.disable = false;
      scope.visible = false;
      
      scope.login = function (creds) {
          scope.disable = true;
          scope.loading = true;
          $http({
            method: 'POST',
            url   :`${CONFIG.api_base_url}/user/relogin`,
            data  : creds,
            headers : { 'Content-Type' : 'application/json'},
            cache : false
          })
          .then(function(res){
            scope.disable = false;
            scope.loading = false;
            scope.visible = false;
            Session.create(res.data.token, res.data.user.id,res.data.user.role);
            $window.localStorage.token = res.data.token;
            logger.success('Successfully Returned to Session');
          }) 
          .catch(function (error) {
            scope.disable = false;
            scope.loading = false;
            logger.error(error.data, error.status);
          });
      }

      scope.logout = function () {
        Session.destroy();
        $window.localStorage.removeItem('token');
        $state.transitionTo('login');
      };
      
      var cantAccess = function () {
        logger.warning("You cant access page");
      };
  
      var showDialog = function (errorType, requestError) {
        Session.destroy();
        $window.localStorage.removeItem('token');
        logger.warning("Please Login");
        $state.transitionTo('login');
        // scope.visible = true;
      };

      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
      scope.$on(AUTH_EVENTS.notAuthorized, cantAccess);
    }
  };
}

export default angular.module('app.directives',[])
.directive('updateTitle', updateTitle)
.directive('loginDialog', loginDialog)
.name;