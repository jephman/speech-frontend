function Service($http, $q, CONFIG) {
  'ngInject';  
  
  return {
    uploadMedia : uploadMedia
  };

  function uploadMedia(data) {
    var fd = new FormData();
    fd.append('name', data.name);
    fd.append('file', data.file);
    fd.append('script', data.script);

    let deffered = $q.defer();
    $http.post(`${CONFIG.api_base_url}/media/upload`, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
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