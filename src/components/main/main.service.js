function navToolbarService($http, $q, CONFIG) {
  'ngInject';

  return {
    userInfo,
    userProfile
  };

  function userInfo() {
    let deffered = $q.defer();
    $http({
      method: 'GET',
      url   : `${CONFIG.api_base_url}/dashboard/home`,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response.data);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function userProfile () {
    let deffered = $q.defer();
    $http({
      method: 'GET',
      url   : `${CONFIG.api_base_url}/user/profile`,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response.data);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }
}

export default navToolbarService;