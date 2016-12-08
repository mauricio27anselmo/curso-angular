(function () {
    'use strict';

    angular.module('MyApp')
        .component('senaiControllerExample', {
            template: 
                '<button ng-click="$ctrl.onClick()">Add Item</button>' +
                '<ul><li ng-repeat="item in $ctrl.provider" ng-bind="item.name"></li></ul>',
            bindings: {
                provider: '<',
                add: '&'
            },
            controller: DirectiveController,
            //,
            // link: link
    });

    function DirectiveController($scope) {
        var vm = this;
        var desregistrarEventoAlterarListaClientes;

        // console.log(vm);

        vm.$onInit = $onInit;
        vm.onClick = onClick;
        vm.addItem = addItem;

        function $onInit() {
            // vm.items = angular.copy(vm.provider);
            desregistrarEventoAlterarListaClientes = 
                $scope.$on('alterarListaClientes', onAlterarListaClientes);

            $scope.$emit('senaiControllerExampleIniciado');
        }

        function onClick() {
            desregistrarEventoAlterarListaClientes();
            vm.addItem();
        }

        function addItem() {
            vm.add();
            vm.provider.push({ name: 'Novo Cliente' });
        }

        function onAlterarListaClientes() {
            vm.addItem();
        }
    }

        // function link(scope, iElement, iAttrs) {
        //     var desregistrarEventoAlterarListaClientes = 
        //         scope.$on('alterarListaClientes', onAlterarListaClientes);

        //     scope.vm.onClick = function() {
        //         desregistrarEventoAlterarListaClientes();
        //         scope.vm.addItem();
        //     };

        //     function onAlterarListaClientes() {
        //         scope.vm.addItem();
        //     }

        //     scope.$emit('senaiControllerExampleIniciado');

            // console.log('Lista de clientes: ' + scope.$parent.listaClientes[0].name);
        //     var items = angular.copy(scope.provider);

        //     init();
        //     render();

        //     function init() {
        //         var html = '<button id="addItem">Add Item</button><div></div>';
        //         iElement.html(html);

        //         iElement.on('click', function (event) {
        //             if (event.srcElement.id === 'addItem') {
        //                 addItem();
        //                 event.preventDefault();
        //             }
        //         });
        //     }

        //     function addItem() {
        //         scope.add();

        //         items.push({ name: 'Novo Cliente' });

        //         render();
        //     }

        //     function render() {
        //         var listHtml = '<ul>';
        //         for (var i = 0, len = items.length; i < len; i++) {
        //             listHtml += '<li>' + items[i].name + '</li>';
        //         }
        //         listHtml += '</ul>';

        //         iElement.find('div').html(listHtml);
        //     }
        // }
//     }
})();