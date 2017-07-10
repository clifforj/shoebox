(function (angular) {
    'use strict';

    angular.module('shoebox')
        .factory('navigationService', navigationService);

    navigationService.$inject = ['$location'];
    function navigationService($location) {

        var runningOrder = [
            '/title',
            '/translate',
            '/rotate',
            '/position-one',
            '/position-two',
            '/box-complete',
            '/animation-one',
            '/minecraft'
        ];

        return {
            next: next,
            previous: previous,
            hasNext: hasNext,
            hasPrevious: hasPrevious,
            onTitleScreen: onTitleScreen
        };

        function next() {
            var currentPathIndex = getCurrentPathIndex();

            if(hasNext(currentPathIndex)) {
                $location.path(runningOrder[currentPathIndex+1]);
            }
        }

        function previous() {
            var currentPathIndex = getCurrentPathIndex();

            if(hasPrevious(currentPathIndex)) {
                $location.path(runningOrder[currentPathIndex-1]);
            }
        }

        function hasNext(currentIndex) {
            currentIndex = currentIndex || getCurrentPathIndex();
            return currentIndex < runningOrder.length - 1;
        }

        function hasPrevious(currentIndex) {
            currentIndex = currentIndex || getCurrentPathIndex();
            return currentIndex !== 0;
        }

        function onTitleScreen() {
            return getCurrentPathIndex() === 0;
        }

        function getCurrentPathIndex() {
            return runningOrder.indexOf($location.path());
        }
    }

})(window.angular);