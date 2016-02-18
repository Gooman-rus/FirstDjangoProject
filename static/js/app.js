/ App Module /
var votingApp = angular.module('votingApp', [
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
    }]);