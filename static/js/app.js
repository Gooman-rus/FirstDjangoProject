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
        dataOp.updateJob = function(id, upJob) {
            return $http.patch(urlBase + '/v1/job/' + id + '/', upJob);
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
                    $scope.status = 'Unable to LOAD customer data: ' + error.message;
                });
        }
        $scope.getJobs();
        $scope.submit = function ($event) {
            var in_data = { name: $scope.name, description: $scope.description };
            if ($scope.name === '' && $scope.description === '') {
                console.log('empty input');
                return;
            }
            dataOp.addJob(in_data)
                .success(function (myjobs) {
                    $scope.getJobs();
                    $scope.name = '';
                    $scope.description = '';
                })
                .error(function (error) {
                    $scope.status = 'Unable to SUBMIT customer data: ' + error.message;
                });
        }
        $scope.deleteJobs = function () {
            $scope.selectedJobs = [];
            angular.forEach($scope.items, function (items) {
                if (items.selected)
                    $scope.selectedJobs.push(items.id);
            });
            if ($scope.selectedJobs.length == 0)
                return;
            console.log($scope.selectedJobs);
            angular.forEach($scope.selectedJobs, function (selectedJob) {
                dataOp.deleteJob(selectedJob)
                    .success(function (response) {
                        $scope.getJobs();
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to DELETE customer data: ' + error.message;
                    })
            });
        }
        $scope.editingData = {};
        $scope.modify = function(x) {
            if (!$scope.editingData[x.id])
                $scope.editingData[x.id] = true;
            else
                $scope.editingData[x.id] = false;
        }
        $scope.update = function(x) {
            $scope.editingData[x.id] = false;
            var upJob = { name: x.name, description: x.description };
            dataOp.updateJob(x.id, upJob)
                .success(function (response) {
                        $scope.getJobs();
                        console.log(response);
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to UPDATE customer data: ' + error.message;
                    })
        }
    });