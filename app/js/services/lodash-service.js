(function () {
    'use strict';
    
    angular.module('MyApp')
        .factory('_', LodashFactory);

    /* @ngInject */
    function LodashFactory($window) {
        if (!$window._) {
            console.log('Lodash não disponível');
        }

        return $window._;
    }
})();