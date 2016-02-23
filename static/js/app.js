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
            return $http.post(urlBase + '/v1/job/', newjob);
        };
        return dataOp;
    }])

    .controller('dbCtrl', function ($scope, dataOp) {
        $scope.status;
        $scope.jobs;
        getJobs();

        function getJobs() {
            dataOp.getJobs()
            .success(function (myjobs) {
                $scope.jobs = myjobs;
                $scope.items = $scope.jobs.objects; // вывод в таблицу
                console.log($scope.jobs);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        }
    })

    .controller('MyFormCtrl', function($scope, $http, dataOp) {


        $scope.submit = function ($event) {
            var in_data = { name: $scope.name, description: $scope.description };
            console.log(in_data);
            dataOp.addJob(in_data)
            .success(function (myjobs) {
                $scope.jobs = myjobs;
                dataOp.getJobs();
                $scope.name = '';
                $scope.description = '';
                console.log($scope.jobs);
            })
            .error(function (error) {
                $scope.status = 'Unable to submit customer data: ' + error.message;
            });
//            $http.post('/', in_data)
//                .success(function(out_data) {
//                    $scope.name = '';
//                    $scope.description = '';
//                    console.log(out_data);
//                })
//                .error(function(data) {
//                    console.log(data);
//                });
        }
    });

