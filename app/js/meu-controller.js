(function() {
'use strict';

    angular
        .module('MyApp')
        .controller('MeuController', MeuController);

    MeuController.$inject = ['$scope', 'SenaiSecurityService'];
    function MeuController($scope, SenaiSecurityService) {
        var vm = this;

        vm.variavelTeste = 'MeuController';

        vm.nomePagina = 'Página Meu Controller';
        vm.getLoggedUser = getLoggedUser;

        activate();

        ////////////////

        function activate() {
            console.log('Meu Controller iniciado!');
         }

        function getLoggedUser() {
//            return SenaiSecurityService.getLoggedUser();
            return null;
        }
    }
})();

// (function () {
//     'use strict';
    
//     angular.module('MyApp')
//         .controller('IndexController2', IndexController2);

//     function IndexController2(SenaiSecurityService) {
//         this.getLoggedUser = getLoggedUser;

//         function getLoggedUser() {
//             return SenaiSecurityService.getLoggedUser();
//         }
//     }
// })();