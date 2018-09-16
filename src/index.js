//vendor
import angular from 'angular';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngSpinner from 'angular-spinners';
import ngSanitize from 'angular-sanitize';
import ngDataTable from 'angular-material-data-table';
import loadingBar from 'angular-loading-bar';

import 'angular-ui-router';
import 'angular-ui-router.statehelper';

//vendor css
import '../node_modules/angular-loading-bar/src/loading-bar.css';
import '../node_modules/angular-material-data-table/dist/md-data-table.css';
import '../node_modules/angular-material/angular-material.css';

import './assets/stylesheets/material-custom.css';
import './assets/stylesheets/app.css';
import './assets/stylesheets/main.scss';

import appConfig from './app.config';
import appConstants from './app.constants';

import appStates from './app.states';
import appServices from './app.services';
import appDirectives from './app.directives';
import appProviders from './app.providers';
import appLogger from './app.logger';

import Login from './components/login'
import Main from './components/main'
import Home from './components/home'
import User from './components/user'

import customDate from './shared/custom.date.directive';
import customCompareTo from './shared/custom.compareTo.directive';

var requires = [
    ngMaterial,
    ngMessages,
    ngAnimate,
    ngAria,
    'ui.router',
    'ui.router.stateHelper',
    loadingBar,
    ngSpinner,
    ngSanitize,
    appDirectives,
    ngDataTable,
    
    appConstants,
    appLogger,
    appConfig,
    appStates,
    appServices,
    appProviders,
    customDate,
    customCompareTo,
    
    Login,
    Main,
    Home,
    User,
];

angular.module('prvstrapApp', requires);

if(DEVELOPMENT){
    if(module.hot){
        module.hot.accept(5, function(){
            return side = __webpack_require__(5);
        });
    }
}