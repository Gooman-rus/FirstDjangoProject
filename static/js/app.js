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
                templateUrl: "static/partials/home.html",
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
            //return $http.post(urlBase + '/v1/job/', newjob);
            $http.post(urlBase + '/v1/job/', newjob);
            return $http.get(urlBase + '/v1/job/');
        };
        dataOp.applyJobs = function ($scope, jobs) {
            $scope.items = jobs;
            $scope.$apply();
            return $scope.items;
        }
        return dataOp;
    }])

    .controller('dbCtrl', function ($scope, dataOp) {
        dataOp.getJobs()
        .success(function (myjobs) {
            $scope.jobs = myjobs;
            $scope.items = $scope.jobs.objects; // вывод в таблицу
            //console.log($scope.jobs);
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    })

    .controller('MyFormCtrl', function($scope, $timeout, dataOp) {
        $scope.submit = function ($event) {
            var in_data = { name: $scope.name, description: $scope.description };
            $scope.jobs;
            dataOp.addJob(in_data)
            .success(function (myjobs) {
                $scope.jobs = myjobs;
                $scope.items = $scope.jobs.objects; // вывод в таблицу
                //dataOp.applyJobs($scope, myjobs);
                $scope.name = '';
                $scope.description = '';
            })
            .error(function (error) {
                $scope.status = 'Unable to submit customer data: ' + error.message;
            });
        }
    });