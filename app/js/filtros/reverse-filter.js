angular.module('MyApp')
    .filter('reverse', reverseFilter);

function reverseFilter() {
    function reverse(input, uppercase) {
        input = input || '';

        uppercase = 
            angular.isUndefined(uppercase) ? true : uppercase;

        var out = '';
        for (var i = 0, len = input.length; i < len; i++) {
            out = input.charAt(i) + out;
        }

        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    }

    return reverse;
}