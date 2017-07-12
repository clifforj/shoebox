(function (angular) {
    'use strict';

    angular.module('shoebox', ['ngRoute']).config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/title', {
                templateUrl: 'slide/title/title.html'
            })
            .when('/translate', {
                templateUrl: 'slide/translate/translate.html'
            })
            .when('/rotate', {
                templateUrl: 'slide/rotate/rotate.html'
            })
            .when('/position-one', {
                templateUrl: 'slide/position-one/position-one.html'
            })
            .when('/position-two', {
                templateUrl: 'slide/position-two/position-two.html'
            })
            .when('/box-complete', {
                templateUrl: 'slide/box-complete/box-complete.html'
            })
            .when('/animation-one', {
                templateUrl: 'slide/animation-one/animation-one.html'
            })
            .when('/minecraft', {
                templateUrl: 'slide/minecraft/minecraft.html'
            })
            .when('/fin', {
                templateUrl: 'slide/fin/fin.html'
            })
            .otherwise('/title');
    }

})(window.angular);