/**
 * @ngdoc directive
 * @name SenaiInputTextDirective.directive: senaiInputText
 * @scope
 * @restrict E
 * 
 * @description
 * Diretiva que permite criar um campo de texto no padrão bootstrap.
 * 
 * @param {expression} ngModel Modelo que será alterado pelo input.
 * @param {string} preffix Prefixo que ficará à esquerda do input.
 */
(function () {
    'use strict';

    angular.module('SenaiInputTextDirective', [])
        .directive('senaiInputText', senaiInputText);

    /* @ngInject */
    function senaiInputText() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/js/directives/input-text/senai-input-text.html',
            require: 'ngModel',
            transclude: {
                labelSlot: 'senaiInputLabel',
                messageSlot: '?senaiInputMessage'
            },
            replace: true,
            scope: {
                ngModel: '=',
                ngRequired: '=?',
                placeholder: '@',
                minlength: '@min',
                maxlength: '@max',
                colspanXs: '@',
                colspanSm: '@',
                colspanMd: '@',
                colspanLg: '@',
                preffix: '@',
                onChange: '&'
            },
            compile: compile
        };

        function compile(tElement, tAttrs) {
            if (tAttrs.preffix) {
                var inputGroupElement =
                    angular.element('<div class="input-group"></div>');
                
                var preffixElement =
                    angular.element('<div class="input-group-addon" ng-bind="preffix"></div>');
                
                inputGroupElement.append(preffixElement);

                var inputElement = tElement.find('input');
                inputElement.detach();

                inputGroupElement.append(inputElement);

                var helpBlockElement = angular.element(tElement[0].querySelector('.help-block'));
                helpBlockElement.detach();

                var formGroupElement = angular.element(tElement[0].querySelector('.form-group'));

                formGroupElement.append(inputGroupElement);
                formGroupElement.append(helpBlockElement);
            }

            return {
                post: link
            };
        }

        function link(scope, iElement, iAttrs) {
            scope.placeholder = scope.placeholder ||
                'Digite o seu valor';

            if (!scope.colspanSm) {
                scope.colspanSm = '4';
            }

            scope.inputName = iAttrs.ngModel;

            scope.onInputChange = onInputChange;

            init();

            function init() {
                var inputElement = iElement.find('input');
                inputElement.bind('keydown', onKeydown);
            }

            function onInputChange() {
                console.log('Input mudou!');

                if (iAttrs.onChange) {
                    scope.onChange({ value: scope.ngModel });
                }
            }

            function onKeydown(event) {
                var code = event.keyCode || event.which;

                console.log('Código da tecla: ' + code);

                if (code === 13) {
                    event.preventDefault();
                }
            }
        }

        return directive;
    }
})();