function Service($http, $q, CONFIG) {
  'ngInject';  
  
  return {
    signup : signup
  };

  function signup(data) {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   : `${CONFIG.api_base_url}/user`,
      data  : data,
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

export default Service;