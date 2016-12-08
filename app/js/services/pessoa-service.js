(function () {
    'use strict';
    
    angular.module('MyApp')
        .provider('PessoaService', PessoaService);
    
    function PessoaService() {
        var pronomeTratamento = 'Sr. ';

        this.configPronomeTratamento = configPronomeTratamento;
        this.$get = getPessoaService;

        function configPronomeTratamento(novoPronomeTratamento) {
            pronomeTratamento = novoPronomeTratamento;
        }

        function getPessoaService() {
            var listaPessoas = [
                'Fulano', 'Ciclano', 'Beltrano'
            ];

            return {
                obterListaPessoas: obterListaPessoas
            };

            function obterListaPessoas() {
                var lista = [];
                for (var i = 0, len = listaPessoas.length; i < len; i++) {
                    lista.push(pronomeTratamento + listaPessoas[i]);
                }
                return lista;
            }
        }
    }
})();