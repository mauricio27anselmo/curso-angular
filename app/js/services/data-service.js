(function () {
    'use strict';

    angular
        .module('MyApp')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', '$timeout', '$rootScope'];
    function dataService($http, $q, $timeout, $rootScope) {
        var serviceBase = '/api/dataservice/';

        var listaUsuarios = [
            {
                id: 1,
                pessoa: {
                    nome: 'Teste', email: 'teste@teste.com'
                }
            },
            {
                id: 2,
                pessoa: {
                    nome: 'Fulano', email: 'fulano@hotmail.com'
                }
            },
            {
                id: 3,
                pessoa: {
                    nome: 'Beltrano', email: 'beltrano@gmail.com'
                }
            }
        ];

        var service = {
            checkUniqueValue: checkUniqueValue
        };

        return service;

        ////////////////
        function checkUniqueValue(property, value) {
            // return $http.get(serviceBase + 'checkUnique?property=' + property + '&value=' + escape(value))
            //      .then(checkUniqueSuccessHandler,
            //          checkUniqueFailureHandler)
            //     .then(checkUnique2SuccessHandler);
            

            // function checkUniqueSuccessHandler(result) {
            //     if (!result.data.status) {
            //         return $q.reject();
            //     }
            // }

            // function checkUniqueFailureHandler(reason) {
            //     return $q.reject();
            // }

            // function checkUnique2SuccessHandler() {
            //     return $http.get('').success(function(result) {
            //         return result.data;
            //     });
            // }

            // function checkUnique2FailureHandler() {
            //     return $q.reject();
            // }

            // var deferred = $q.defer();
            // var promise1 = deferred.promise;

            // $timeout(function() {
            //     deferred.resolve(true);
            // }, 5000);

            // var promise2 = promise1.then(function(result) {
            //     return $timeout(function () {
            //         return $q.reject();
            //     }, 5000);
            // }, function() {
            //     // tratamento do erro
            //     return true;
            // });

            // return promise1;

            return $timeout(function () {
                for (var i = 0, len = listaUsuarios.length; i < len; i++) {
                    var usuario = listaUsuarios[i];
                    // if (usuario[property] === value) {
                    if ($rootScope.$eval('usr.' + property, {usr: usuario}) === value) {
                        return false;
                    }
                }
                return true;
            }, 5000);
        }
    }
})();