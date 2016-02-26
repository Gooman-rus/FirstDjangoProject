/ App Module /
var myApp = angular.module('myApp', [
        'ui.router',
       // 'ui.bootstrap',
    ])

    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

        'use strict';

        $stateProvider
            .state('home', {
                url: '/',
                cache: false,
                templateUrl: 'static/partials/home.html',
                controller: 'JobFormCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    }])

    .factory('dataOp', ['$http', function ($http) {
        var urlBase = '/api';
        var dataOp = {};

        dataOp.getJobs = function () {
            return $http.get(urlBase + '/v1/job/');
        };
        dataOp.addJob = function (newjob) {
            return $http.post(urlBase + '/v1/job/', newjob);
        };
        dataOp.deleteJob = function (id) {
            return $http.delete(urlBase + '/v1/job/' + id);
        }
        return dataOp;
    }])

    .controller('JobFormCtrl', function ($scope, dataOp) {
        $scope.getJobs = function () {
            dataOp.getJobs()
                .success(function (jobs) {
                $scope.items = jobs.objects;
                console.log(jobs);
                })
                .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }
        $scope.getJobs();
//        $scope.toggleAll = function() {
//            var toggleStatus = !$scope.isAllSelected;
//            angular.forEach($scope.options, function(itm){ itm.selected = toggleStatus; });
//        }
//        $scope.optionToggled = function() {
//            $scope.isAllSelected = $scope.options.every(function(itm){ return itm.selected; })
//        }
        $scope.submit = function ($event) {
            var in_data = { name: $scope.name, description: $scope.description };
            $scope.jobs;
            dataOp.addJob(in_data)
                .success(function (myjobs) {
                    $scope.getJobs();
                    $scope.name = '';
                    $scope.description = '';
                })
                .error(function (error) {
                    $scope.status = 'Unable to submit customer data: ' + error.message;
                });
        }
        $scope.deleteJobs = function () {
            $scope.selectedJobs = [];
            angular.forEach($scope.items, function (items) {
                if (items.selected)
                    $scope.selectedJobs.push(items.id);
            });
            console.log($scope.selectedJobs);
            angular.forEach($scope.selectedJobs, function (selectedJob) {
                dataOp.deleteJob(selectedJob)
                    .success(function (response) {
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to delete customer data: ' + error.message;
                    })
            });
            $scope.getJobs();
        }
    });