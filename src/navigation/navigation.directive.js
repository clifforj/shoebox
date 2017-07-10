(function (angular) {
    'use strict';

    angular.module('shoebox')
        .directive('navigation', navigation);

    function navigation() {
        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'vm',
            templateUrl: 'navigation/navigation.html'
        }
    }

    Controller.$inject = ['navigationService', '$document', '$timeout'];
    function Controller(navigationService, $document, $timeout) {
        var vm = this;

        vm.navService = navigationService;

        $document.on('keydown', keydown);

        function keydown(event) {
            var key = event.key;

            if(key === 'ArrowLeft' || key === 'a') {
                $timeout(navigationService.previous());
            } else if(key === 'ArrowRight' || key === 'd') {
                $timeout(navigationService.next());
            }
        }

    }

})(window.angular);