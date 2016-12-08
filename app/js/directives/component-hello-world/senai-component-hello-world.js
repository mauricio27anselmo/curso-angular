(function() {
'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('MyApp')
        .component('senaiComponentHelloWorld', {
            template:
                '<h3 ng-bind="$ctrl.title"></h3>' +
                '<h4 ng-bind="$ctrl.subtitle"></h4>' +
                '<ul>' +
                    '<li ng-repeat="produto in $ctrl.produtos">' +
                        '<span ng-bind="produto.nome"></span>' +
                        '<p ng-bind="produto.descricao"></p>' +
                    '</li>' +
                '</ul>',
            controller: HelloWorldController,
            bindings: {
                title: '@',
                subtitle: '<'
            }
        });

    function HelloWorldController(SenaiAlertService) {
        this.$onInit = function() {
            SenaiAlertService.showOk('Hello world!');
        };

        this.produtos = [
            {nome: 'Computador', descricao: 'Equipamento de última geração!'},
            {nome: 'Geladeira', descricao: 'Compacta e consome pouca energia.'},
            {nome: 'Televisor', descricao: 'Smart, leve, 60"'}
        ];
    }
})();