(function() {
    'use strict';

    angular
        .module('MyApp')
        .directive('senaiRepeat', senaiRepeat);

    senaiRepeat.$inject = [];
    function senaiRepeat() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            transclude: 'element'
        };
        return directive;
        
        function link(scope, iElement, iAttrs, ctrl, transcludeFn) {
            var myLoop = iAttrs.senaiRepeat;
            var match = myLoop.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
            var itemString = match[1];
            var collectionString = match[2];
            var parent = iElement.parent();
            var elements = [];

            scope.$watchCollection(collectionString, function(collection) {
                for (var j = 0, len2 = elements.length; j < len2; j++) {
                    elements[j].elem.remove();
                    elements[j].scope.$destroy();
                }
                elements.length = 0;

                for (var i = 0, len = collection.length; i < len; i++) {
                    var childScope = scope.$new();
                    childScope[itemString] = collection[i];

                    transcludeFn(childScope, function(clone) {
                        parent.append(clone);

                        elements.push({
                            elem: clone,
                            scope: childScope
                        });
                    });
                }
            });
        }
    }
})();