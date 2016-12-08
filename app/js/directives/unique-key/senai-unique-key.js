(function() {
    'use strict';

    angular
        .module('MyApp')
        .directive('senaiUniqueKey', senaiUniqueKey);

    senaiUniqueKey.$inject = ['$q', 'dataService'];
    function senaiUniqueKey($q, dataService) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;
        
        function link(scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$asyncValidators.unique = asyncUniqueValidator;

            function asyncUniqueValidator(modelValue, viewValue) {
                var deferred = $q.defer();
                var currentValue = modelValue || viewValue;
                var property = attrs.senaiUniqueKeyProperty;

                if (property) {
                    dataService.checkUniqueValue(property, currentValue)
                        .then(checkUniqueValueSuccessHandler, checkUniqueValueFailureHandler);
                } else {
                    deferred.resolve();
                }

                return deferred.promise;

                function checkUniqueValueSuccessHandler(unique) {
                    if (unique) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                }

                function checkUniqueValueFailureHandler(reason) {
                    deferred.reject();
                }
            }
        }
    }
})();