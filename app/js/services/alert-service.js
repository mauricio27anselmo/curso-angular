angular.module('MyApp')
    .service('SenaiAlertService', SenaiAlertService);

// function SenaiAlertService(growl, TTL_WARNING, SenaiSecurityService) {
function SenaiAlertService(growl, TTL_WARNING, $injector) {
    // O código da linha abaixo também resulta no erro de dependência circular se for descomentado.
    // var SenaiSecurityService = $injector.get('SenaiSecurityService');

    this.showOk = showOk;
    this.showError = showError;
    this.showLoggedUser = showLoggedUser;

    function showOk(msg) {
        growl.success(msg);
    }

    function showError(msg) {
        growl.warning(msg);
    }

    function showLoggedUser() {
        // O código da linha abaixo não resulta no erro de dependência circular se for descomentado.
        // var SenaiSecurityService = $injector.get('SenaiSecurityService');
        // growl.info(SenaiSecurityService.getLoggedUser().login);
    }
}