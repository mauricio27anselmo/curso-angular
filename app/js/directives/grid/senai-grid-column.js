(function() {
    'use strict';

    angular
        .module('senaiGridModule')
        .directive('senaiGridColumn', senaiGridColumn);

    senaiGridColumn.$inject = [];
    function senaiGridColumn() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            require: ['^^senaiGrid'],
            restrict: 'E',
            transclude: true,
            scope: {
                property: '@',
                labelFilter:'@',
                labelFilterArguments:'@',
                hide: '<',
                headerAlign: '@',
                width: '@',
                disableSort: '<'
            }
        };
        return directive;
        
        function link(scope, element, attrs, senaiGridController, transcludeFn) {
            init();
            
            function init(params){
                transcludeFn(scope.$parent, cloneLinkingFn);

                senaiGridController.addColumn(scope);
            }

            function cloneLinkingFn(clone){
                if(clone){
                    scope.description = '';
                    
                    for(var i=0, len = clone.length; i<len; i++){
                        var cloneItem = clone[i];
                        var text;

                        if(cloneItem.outerHTML){
                            text = cloneItem.outerHTML;
                        }else{
                            text = cloneItem.data;
                            
                        }
                        scope.description += $interpolate(text)(scope.$parent);

                    }
                }
            }
        }
    }
})();