angular.module('MyApp')
    .service('SenaiSecurityService', SenaiSecurityService);

function SenaiSecurityService($timeout, SenaiAlertService, $q, $rootScope) {
    var loggedUser = null;

    this.doLogin = doLogin;
    this.getLoggedUser = getLoggedUser;

    function doLogin(user) {
        var deferred = $q.defer();

        var unsubscribeEventoConcluirLogin = 
        $rootScope.$on('concluirLogin', function(event, loginCorreto) {
            unsubscribeEventoConcluirLogin();

            if (loginCorreto) {
                loggedUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
            }
        });

        return deferred.promise;
    }

    function getLoggedUser() {
        return loggedUser;
    }
}