function Controller($q, $state, $http, $injector, $scope, $timeout, homeIndexService) {
  'ngInject';
  var vm = this;
  
  activate();

  function activate() {
    // var promises = [get_platform_stats_by_type()];
    
    // return $q.all(promises).then(function() {
    //   console.log('Activated Dashboard View');
    // });
  }
  vm.submit = submit;
  function submit (form, formData){
    homeIndexService.uploadMedia(formData)
    .then(data => {
      vm.result = JSON.parse(JSON.stringify(data.transcript));
    })
    .catch(err => {
      console.log(err);
    });
  }
}

export default Controller;