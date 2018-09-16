function Service($http, $q, CONFIG) {
  'ngInject';  
  
  return {
    userList,
    addUser,
    updateUser,
    updateLimitUser,
    enableUser,
    disableUser,
    deleteUser,
  };

  function addUser(data) {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   : `${CONFIG.api_base_url}/user/add`,
      data  : data,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function updateUser(data, user_id) {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   : `${CONFIG.api_base_url}/user/update/${user_id}`,
      data  : data,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function updateLimitUser(data, user_id) {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   : `${CONFIG.api_base_url}/user/updateLimit/${user_id}`,
      data  : data,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function enableUser (user_id) {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   : `${CONFIG.api_base_url}/user/enable/${user_id}`,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function disableUser (user_id) {
    let deffered = $q.defer();
    $http({
      method: 'POST',
      url   : `${CONFIG.api_base_url}/user/disable/${user_id}`,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function deleteUser (user_id) {
    let deffered = $q.defer();
    $http({
      method: 'DELETE',
      url   : `${CONFIG.api_base_url}/user/delete/${user_id}`,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(fetchTokenComplete) 
    .catch(fetchTokenFailed);
    return deffered.promise;

    function fetchTokenComplete(response) {
      if (response != undefined && typeof response == "object") {
        deffered.resolve(response);
      } else {
        console.error('Invalid Server request');
      }
    }

    function fetchTokenFailed(error) {
      deffered.reject(error);
    }
  }

  function userList () {
    let deffered = $q.defer();
    $http({
      method: 'GET',
      url   : `${CONFIG.api_base_url}/user/all`,
      headers : { 'Content-Type' : 'application/json'},
      cache : false
    })
    .then(function(results){
      deffered.resolve(results.data.values);
    })
    .catch(function(error){
      deffered.reject(error);
    });
    return deffered.promise;
  }
}

export default Service;