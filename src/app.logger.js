import angular from 'angular';
import _includes from 'lodash/includes'
import _head from 'lodash/head'

function logger($log, $mdToast) {
	'ngInject';
	let service = {
		error  : error,
		info   : info,
		success: success,
		warning: warning,
		log    : $log.log
	};
	return service;

	function error(message, status, delay = 3000) {
		$mdToast.show(
			$mdToast.simple()
			.textContent(messageParser(message))
			.position('top right')
			.hideDelay(delay)
			.capsule(true)
			.action(`x`)
			);
		$log.error(`Error: ${message} ${status || ''}`);
	}
	
	function info(message, status, delay = 3000) {
		$mdToast.show(
			$mdToast.simple()
			.textContent(messageParser(message))
			.position('top right')
			.hideDelay(delay)
			.capsule(true)
			.action(`x`)
			);
		$log.info(`Info: ${message} ${status || ''}`);
	}
	
	function success(message, status, delay = 3000) {
		$mdToast.show(
			$mdToast.simple()
			.textContent(messageParser(message))
			.position('top right')
			.hideDelay(delay)
			.capsule(true)
			.action(`x`)
			);
		$log.info(`Success: ${message} ${status || ''}`);
	}
	
	function warning(message, status, delay = 3000)  {
		$mdToast.show(
			$mdToast.simple()
			.textContent(messageParser(message))
			.position('top right')
			.hideDelay(delay)
			.capsule(true)
			.action(`x`)
			);
		$log.warn(`Warning: ${message} ${status || ''}`);
	}

	function messageParser (message) {
		if(_includes(Object.keys(message), 'error')){
			console.log("error", message.error);
			return message.error;
		}else if(typeof message === 'object'){
			let head = _head(Object.keys(message));
			console.log("other");
			return _head(message[head]);
		}
		return message;
	}
}

export default angular.module('app.logger', [])
.factory('logger', logger)
.name;
