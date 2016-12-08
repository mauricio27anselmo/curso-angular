(function() {
'use strict';

    angular
        .module('MyApp')
        .controller('CadastroClientesController', CadastroClientesController);

    CadastroClientesController.$inject = ['$routeParams'];
    function CadastroClientesController($routeParams) {
        var vm = this;
        
        vm.titulo = 'Cadastro de Clientes';
        vm.idCliente = $routeParams.id;

        activate();

        ////////////////

        function activate() { }
    }
})();