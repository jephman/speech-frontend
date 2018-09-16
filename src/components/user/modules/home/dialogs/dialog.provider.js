import addUserDialogTemplate from './views/add.user.dialog.html';
import updateUserDialogTemplate from './views/update.user.dialog.html';
import updateLimitUserDialogTemplate from './views/update.limit.user.dialog.html';

function userDialogProvider($mdDialog) {
  'ngInject';  
  
  return {
    addUserDialog,
    updateUserDialog,
    confirmation,
    updateLimitUserDialog
  };

  function addUserDialog (ev) {
    $mdDialog.show({
        controller: 'userDialogController',
        controllerAs: 'vm',
        templateUrl: addUserDialogTemplate,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
  };

  function updateUserDialog (ev, user_data) {
    $mdDialog.show({
        controller: 'userDialogController',
        controllerAs: 'vm',
        templateUrl: updateUserDialogTemplate,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        bindToController: true,
        locals: {
          user_data
        }
      });
  };

  function updateLimitUserDialog (ev, user_data) {
    $mdDialog.show({
        controller: 'userDialogController',
        controllerAs: 'vm',
        templateUrl: updateLimitUserDialogTemplate,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        bindToController: true,
        locals: {
          user_data
        }
      });
  };

  function confirmation (ev, title,textContent,callback) {
    var confirm = $mdDialog.confirm()
          .title(title)
          .textContent(textContent)
          .ariaLabel('delete')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel')
          .multiple('true')
          ;

    $mdDialog.show(confirm).then(function() {
      callback()
    }, function() {
      
    });
  }

}

export default userDialogProvider;