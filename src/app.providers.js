import angular from 'angular';

function httpProvider ($httpProvider) {
	'ngInject';
	$httpProvider.interceptors.push('TokenInterceptor');
}

function compileProvider ($compileProvider) {
	'ngInject';
	$compileProvider.debugInfoEnabled(true);
}

function tokenChecker($rootScope, $state, $window, AUTH_EVENTS, AuthService, navToolbarService, Session) {
	'ngInject';
	// if(!AuthService.isAuthenticated() && $window.localStorage.token != null) {
	// 	navToolbarService.userProfile().then(function (data) {
	// 		Session.create(data.token, data.user.id,data.user.role);
	// 		stateChangeCatch();
	// 	});
	// }else {
				stateChangeCatch();
	// }
	function stateChangeCatch () {
		$rootScope.$on("$stateChangeStart", function(event, next, toParams ,current) {	
			var authorizedRoles = next.hasOwnProperty('data') ? next.data.authorizedRoles : null;
			if (!AuthService.isAuthorized(authorizedRoles)) {
				event.preventDefault();
				if (AuthService.isAuthenticated() && $window.localStorage.token != null) {
					// user is not allowed
					$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
					$state.transitionTo(current);
					event.preventDefault();
				} else {
					// user is not logged in
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
					$window.localStorage.removeItem('token');
					$state.transitionTo('home');
					event.preventDefault();
				}
			}else if(AuthService.isAuthenticated() && $window.localStorage.token != null && next.name === 'login'){
				$state.transitionTo('main.dashboard.index');
			}
		});
	}
}

function preventDuplicateHttp ($provide) {
	'ngInject';
	
	$provide.decorator('$http', function ($delegate, $cacheFactory, $rootScope, $timeout) {
		'ngInject';
			var $http = $delegate;
			var customCache = $cacheFactory('customCache');
			var wrapper = function () {
					var key = arguments[0].url;
					var requestPromise = customCache.get(key);
					if (!requestPromise){
							$rootScope.requestCount++;
							requestPromise = $http.apply($http, arguments);
							requestPromise.then(function(){
									//caching for 1 second
									$timeout(function(){
										customCache.remove(key);
									}, 1000);
							}).catch(function () {
								$timeout(function(){
									customCache.remove(key);
								}, 1000);
							});
							customCache.put(key, requestPromise)
					}
					return requestPromise;
			};
			
			Object.keys($http).filter(function (key) {
					return (typeof $http[key] === 'function');
			}).forEach(function (key) {
					wrapper[key] = function () {
							return $http[key].apply($http, arguments);
					};
			});
			
			return wrapper;
	});
}

export default angular.module('app.providers',[])
.config(httpProvider) 
.config(compileProvider)
.config(preventDuplicateHttp)
.run(tokenChecker)
.name;