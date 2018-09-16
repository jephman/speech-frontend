import angular from 'angular';
import ngMessages from 'angular-messages';
import moment from 'moment';
import _map from 'lodash/map'

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function dateDirective() {
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      ngModel: "=?",
      ngDisabled: "=?",
      ngRequired: "=?",
      activeForm: "@?",
      customMaxDate: "=?",
      customLabel: "@?",
      customDateChange: "&",
    },
    // controllerAs: 'vm',
    // bindToController: true,
    link: function($scope, elem, $attrs){
      var vm = $scope;

      let today = new Date();      
      let monthList = [
        {key: 0,value:'January'},
        {key: 1,value:'February'},
        {key: 2,value:'March'},
        {key: 3,value:'April'},
        {key: 4,value:'May'},
        {key: 5,value:'June'},
        {key: 6,value:'July'},
        {key: 7,value:'August'},
        {key: 8,value:'September'},
        {key: 9,value:'October'},
        {key: 10,value:'November'},
        {key: 11,value:'December'},
      ]
      vm.monthList = JSON.parse(JSON.stringify(monthList))

      vm.birth = {}
      vm.birth.month = undefined;
      vm.birth.day = undefined;
      vm.birth.year = undefined;
      vm.thisDay = today.getDate();
      vm.thisMonth = today.getMonth();
      vm.thisYear = today.getFullYear();
      vm.dateParser = dateParser;
      let currentValue;
      if(vm.ngModel) {
        vm.complete = true;
        currentValue = new Date(vm.ngModel);
        vm.birth.month = currentValue.getMonth();
        vm.birth.day = currentValue.getDate();
        vm.birth.year = currentValue.getFullYear();
      }else {
        vm.ngModel = null;
        vm.complete = false;
        vm.birth.month = undefined;
        vm.birth.day = undefined;
        vm.birth.year = undefined;
      }

      setValues(vm.birth.year, vm.thisYear);
      
      function setValues(valueYear, currentYear){
        if(valueYear == currentYear) {
          vm.showValid = filterMonth;
          if(vm.birth.month > vm.thisMonth){
            vm.birth.month = undefined;
            vm.ngModel = null;
            vm.maxDay = vm.thisDay;
          }
        }else {
          vm.showValid = function(item){return item};
        }
      }

      function filterMonth(item){
        if(item.key <= vm.thisMonth){
            return item;
        }
      };
      $scope.$watch('ngModel', function(v) {
        if(new Date(v) != "Invalid Date" && v != null) {
          vm.complete = true;
          currentValue = new Date(v);
          vm.birth.month = currentValue.getMonth();
          vm.birth.day = currentValue.getDate();
          vm.birth.year = currentValue.getFullYear();
        }else if(v == null){
          vm.complete = false;
          vm.birth.month = null;
          vm.birth.day = null;
          vm.birth.year = null;
        }
      })
      function dateParser (date, form, field) {
        let dateArray = _map(date);
        dateArray.clean(undefined)
        let selectedDate = new Date(date.year, date.month + 1, 0);
        if(date.year < vm.thisYear) {
          vm.maxDay = selectedDate.getDate();
        }else if (date.year == vm.thisYear){
          if(date.month < vm.thisMonth) {
            vm.maxDay = selectedDate.getDate();
          }else {
            vm.maxDay = vm.thisDay;
          }
        }else {
          vm.maxDay = vm.thisDay;
        }
        setValues(date.year, vm.thisYear);
        vm.complete = true;
        let dateString = new Date(date.year,date.month,date.day);
        vm.ngModel = dateString;
      }
    },
    template:
        `
        <ng-form class="custom-datepicker" name="datePicker" layout="row">
          <label class="custom-label">{{customLabel}}</label>
          <md-input-container class="text-capitalize" md-no-float flex>
            <md-select name="birthmonth" ng-disabled="ngDisabled" ng-model="birth.month" ng-change="dateParser(birth, datePicker, datePicker.birthmonth)" ng-required="ngRequired || complete" placeholder="Month">
              <md-option ng-repeat="month in monthList | filter: showValid track by $index" ng-value="month.key">{{month.value}}</md-option>
            </md-select>
            <div class="errors" ng-messages="datePicker.birthmonth.$error">
                <div ng-message="required">{{complete?'Date Incomplete':'Required'}}</div>
            </div>
          </md-input-container>
          <md-input-container md-no-float flex=30>
            <input name="birthday" type="number" ng-disabled="ngDisabled" ng-model="birth.day" ng-change="dateParser(birth, datePicker, datePicker.birthday)" min="1" max="{{maxDay}}" ng-min="1" ng-max="maxDay" ng-required="ngRequired || complete"  placeholder="Day">
            <div class="errors" ng-messages="datePicker.birthday.$error">
              <div ng-message="required">{{complete?'Date Incomplete':'Required'}}</div>
              <div ng-message="max">Invalid Date</div>
              <div ng-message="min">Invalid Date</div>
            </div>
          </md-input-container>
          <md-input-container md-no-float flex=30>
            <input name="birthyear" type="number" ng-disabled="ngDisabled" ng-model="birth.year" ng-change="dateParser(birth, datePicker, datePicker.birthyear)" min="1800" max="{{thisYear}}" ng-min="1800" ng-max="thisYear" ng-required="ngRequired || complete"  placeholder="Year">
            <div class="errors" ng-messages="datePicker.birthyear.$error">
              <div ng-message="required">{{complete?'Date Incomplete':'Required'}}</div>
              <div ng-message="max">Invalid Year</div>
              <div ng-message="min">Invalid Year</div>
            </div>
          </md-input-container>

        </ng-form>
      `
  };
}


export default angular.module('custom.date',[ngMessages])
.directive('customDate', dateDirective)
.name;