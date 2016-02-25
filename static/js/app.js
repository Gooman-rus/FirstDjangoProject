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
        var urlBase = 'http://localhost:8000/api';
        var dataOp = {};

        dataOp.getJobs = function () {
            console.log($http.get(urlBase + '/v1/job/'));
            return $http.get(urlBase + '/v1/job/');
        };
        dataOp.addJob = function (newjob) {
            return $http.post(urlBase + '/v1/job/', newjob);
        };

        return dataOp;
    }])

    .controller('JobFormCtrl', function($scope, dataOp) {
        var temp = dataOp.getJobs();
        $scope.items = temp.objects;
        $scope.submit = function ($event) {
            var in_data = { name: $scope.name, description: $scope.description };
            $scope.jobs;
            dataOp.addJob(in_data)
            .success(function (myjobs) {
                //$scope.jobs = myjobs;
                //$scope.items = $scope.jobs.objects; // вывод в таблицу
                $scope.items = JobsDataOp.getJobs().objects;
                $scope.name = '';
                $scope.description = '';
            })
            .error(function (error) {
                $scope.status = 'Unable to submit customer data: ' + error.message;
            });
        }
    });