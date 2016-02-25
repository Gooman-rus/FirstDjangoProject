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

        function getJobs() {
            $scope.items = $http.get('/api/v1/job/');
            return $scope.items;
        };
        function addJob(newjob) {
            return $http.post(urlBase + '/v1/job/', newjob);
        };

        getJobs();

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    }])

    .controller('JobFormCtrl', function($scope) {
        $scope.submit = function ($event) {
            var in_data = { name: $scope.name, description: $scope.description };
            $scope.jobs;
            addJob(in_data)
            .success(function (myjobs) {
                $scope.jobs = myjobs;
                $scope.items = $scope.jobs.objects; // вывод в таблицу
                $scope.name = '';
                $scope.description = '';
            })
            .error(function (error) {
                $scope.status = 'Unable to submit customer data: ' + error.message;
            });
        }
    });