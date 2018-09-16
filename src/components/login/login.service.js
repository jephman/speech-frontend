function loginService($http, $q, CONFIG) {
  'ngInject';

  return {
    signIn : signIn,
    signOut: signOut
  };

  function signIn(credentials) {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   :`${CONFIG.api_base_url}/user/signin`,
      data  : credentials,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(res) {
      if (res != undefined && typeof res == "object") {
        deffered.resolve(res.data);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function signOut() {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   : CONFIG.api_base_url + '/user/signout',
      cache : false
    })
    .then(logoutComplete) 
    .catch(logoutFailed);
    return deffered.promise;

    function logoutComplete(res) {
      deffered.resolve(res);
    }

    function logoutFailed(error) {
      deffered.reject(error);
    }
  }
}

export default loginService;