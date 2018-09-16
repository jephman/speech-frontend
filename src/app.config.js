import angular from 'angular';
import moment from 'moment';
import "moment-timezone";

import wEdit from './assets/img/wEdit.svg';
import wDelete from './assets/img/wDelete.svg';
import wClose from './assets/img/wClose.svg';
import wCheck from './assets/img/wCheck.svg';
import wCancel from './assets/img/wCancel.svg';
import wAdd from './assets/img/wAdd.svg';
import wDownload from './assets/img/wDownload.svg';
import wFile from './assets/img/wFile.svg';
import wHome from './assets/img/wHome.svg';
import wMenu from './assets/img/wMenu.svg';
import wMenuVert from './assets/img/wMenuVert.svg';
import wSave from './assets/img/wSave.svg';
import wSearch from './assets/img/wSearch.svg';
import wRefresh from './assets/img/wRefresh.svg';
import wCloudDownload from './assets/img/wcloudDownload.svg';

import bAdd from './assets/img/bAdd.svg';
import bCancel from './assets/img/bCancel.svg';
import bCheck from './assets/img/bCheck.svg';
import bClose from './assets/img/bClose.svg';
import bDelete from './assets/img/bDelete.svg';
import bDownload from './assets/img/bDownload.svg';
import bEdit from './assets/img/bEdit.svg';
import bFile from './assets/img/bFile.svg';
import bHome from './assets/img/bHome.svg';
import bMenu from './assets/img/bMenu.svg';
import bMenuVert from './assets/img/bMenuVert.svg';
import bSave from './assets/img/bSave.svg';
import bSearch from './assets/img/bSearch.svg';
import bRefresh from './assets/img/bRefresh.svg';
import bCloudDownload from './assets/img/bcloudDownload.svg';

function icons ($mdIconProvider) {
  'ngInject';
  $mdIconProvider
  .icon('navigation:b:menu-vertical', bMenuVert,24)
  .icon('navigation:b:menu', bMenu, 24)
  .icon('navigation:b:home', bHome, 24)
  .icon('navigation:b:close', bClose, 24)
  .icon('dashboard:b:search', bSearch, 24)
  .icon('dashboard:b:check', bCheck, 24)
  .icon('dashboard:b:save', bSave, 24)
  .icon('dashboard:b:cancel', bCancel, 24)
  .icon('dashboard:b:edit', bEdit, 24)
  .icon('dashboard:b:delete', bDelete, 24)
  .icon('dashboard:b:add', bAdd, 24)
  .icon('dashboard:b:download', bDownload, 24)
  .icon('dashboard:b:file', bFile, 24)
  .icon('dashboard:b:refresh', bRefresh, 24)
  .icon('dashboard:b:cloud-download', bCloudDownload, 24)
  
  .icon('navigation:w:menu-vertical', wMenuVert,24)
  .icon('navigation:w:menu', wMenu, 24)
  .icon('navigation:w:home', wHome, 24)
  .icon('navigation:w:close', wClose, 24)
  .icon('dashboard:w:search', wSearch, 24)
  .icon('dashboard:w:check', wCheck, 24)
  .icon('dashboard:w:save', wSave, 24)
  .icon('dashboard:w:cancel', wCancel, 24)
  .icon('dashboard:w:edit', wEdit, 24)
  .icon('dashboard:w:delete', wDelete, 24)
  .icon('dashboard:w:add', wAdd, 24)
  .icon('dashboard:w:download', wDownload, 24)
  .icon('dashboard:w:file', wFile, 24)
  .icon('dashboard:w:refresh', wRefresh, 24)
  .icon('dashboard:w:cloud-download', wCloudDownload, 24)
  ;

}

function colors ($mdThemingProvider) {
  'ngInject'
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');

  $mdThemingProvider.theme('dark-grey')
  .backgroundPalette('grey')
  .dark();
}

function loadingBar (cfpLoadingBarProvider) {
  'ngInject';
  cfpLoadingBarProvider.includeSpinner = false;
}
function datePickerFormat($mdDateLocaleProvider) {
  'ngInject';
  $mdDateLocaleProvider.formatDate = function(date) {
    console.log(date);
    return moment(date).format('YYYY-MM-DD');
  };
}

export default angular.module('app.icons',[])
.config(colors)
.config(icons) 
.config(loadingBar)
.name;