angular.module('MyApp', [
    'ngMessages', 
    'angular-growl', 
    'SenaiUppercaseParserDirective',
    'SenaiInputTextDirective',
    'ngRoute',
    'senaiGridModule',
    'unsafeFilter'])
    .constant('TTL_WARNING', 6000)
    .value('meuValor', 200)
    .config(config)
    .run(run);

function config($routeProvider, growlProvider, TTL_WARNING, PessoaServiceProvider, $logProvider, $provide) {
    $routeProvider
        .when('/clientes', {
            templateUrl: 'app/views/clientes.html',
            controller: 'ClientesController',
            controllerAs: 'clientesCtrl'
        })
        .when('/clientes/:id', {
            templateUrl: 'app/views/cadastro-clientes.html'
        })
        .when('/unidades', {
            template: '<h2>Lista de Unidades</h2>'
        })
        .when('/produtos', {
            templateUrl: 'app/views/produtos.html',
            controller: 'ProdutosController',
            controllerAs: 'produtosCtrl'
        })
        .otherwise({
            redirectTo: '/clientes'
        });
    
    growlProvider.globalTimeToLive({
        success: 1000,
        warning: TTL_WARNING,
        error: -1,
        info: 4000
    });

    $logProvider.debugEnabled(true);

    PessoaServiceProvider.configPronomeTratamento('Sra. ');

    $provide.decorator('$log', $logDecorator);

    $provide.decorator('meuValor', meuValorDecorator);

    /* @ngInject */
    function $logDecorator($delegate) {
        // Entenda $delegate como $log
        var originalDebug = $delegate.debug;

        $delegate.debug = function(msg) {
            msg = 'Debug: ' + msg;
            originalDebug.apply($delegate, arguments);
        };

        return $delegate;
    }

    /* @ngInject */
    function meuValorDecorator($delegate) {
        return $delegate + 100;
    }
}

function run($rootScope, $route, $location, $routeParams, $log) {
    $rootScope.$route = $route;
    $rootScope.$location = $location;
    $rootScope.$routeParams = $routeParams;

    $rootScope.$on('$routeChangeStart', onRouteChangeStart);

    function onRouteChangeStart(evt, next, current) {
        if (next.originalPath === '/produtos') {
            // evt.preventDefault();
        }

        $log.debug('Nome do evento: ' + evt.name);
        $log.debug('Próxima Rota: ' + next.originalPath);
        if (current) {
            $log.debug('Rota atual: ' + current.originalPath);
        }
    }
}