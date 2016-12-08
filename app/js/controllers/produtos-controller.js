(function() {
'use strict';

    angular
        .module('MyApp')
        .controller('ProdutosController', ProdutosController);

    ProdutosController.$inject = [];
    function ProdutosController() {
        var vm = this;
        
        vm.titulo = 'Lista de Produtos';

        activate();

        ////////////////

        function activate() { }
    }
})();