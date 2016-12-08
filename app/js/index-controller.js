angular.module('MyApp')
    .controller('IndexController', IndexController);

/* @ngInject */
function IndexController($rootScope, $scope, $timeout, $filter, 
    SenaiSecurityService, PessoaService, $log, meuValor, _, 
    SenaiAlertService) {

    var listaCarros = [
        {nome: 'Ferrari'}, 
        {nome: 'Mercedes'}, 
        {nome: 'Fusca'}
    ];

    var listaCores = [
        'Vermelha', 
        'Azul', 
        'Amarelo'
    ];

    for (var i = 0, len = listaCarros.length; i < len; i++) {
        var carro = listaCarros[i];

        atualizarCorCarro(carro, i);
    }

    function atualizarCorCarro(carro, i) {
        $timeout(function() {
            carro.cor = listaCores[i];
            $log.debug(carro.nome + ' ' + carro.cor);
        }, 2000);
    }


    //{a: 1, b: 2} ---> {b: 3, c: 4} ---> null

    //console.log(o.a); //1
    //console.log(o.b); //2
    //console.log(o.c); //4
    //console.log(o.d); //undefined

    $scope.subtituloListaProdutos = 'Produtos novos para 2017';

    var o = {
        a: 1,
        m: function() {
            return this.a + 1;
        }
    };

    $log.debug('Teste function: ' + o.m());

    var p = Object.create(o);

    p.a = 5;

    $log.debug('Teste function: ' + p.m());

    if (p.hasOwnProperty('propTeste')) {
        var propTeste = p.propTeste;
    }

    function Livro(numPaginas) {
        this.autores = [];
        this.numPaginas = numPaginas;
    }

    Livro.prototype = {
        addAutor: function(autor) {
            this.autores.push(autor);
        }
    };

    function Biblia(numPaginas, versao) {
        Livro.call(this, numPaginas);
        this.versao = versao;
    }

    function createInheritance(parent, child) {
        var parentPrototyCopy = Object.create(parent.prototype);

        child.prototype = parentPrototyCopy;
        
    }

    createInheritance(Livro, Biblia);

    var livroJava = new Biblia(300, 1);
    var livroAngularJS = new Biblia(200, 2);

    $log.debug(PessoaService.obterListaPessoas()[0]);

    $log.debug('Isto não deveria estar acontecendo!');

    $log.debug(_.join(['a', 'b', 'c'], '-'));

    var vm = this;

    vm.somarNumeros = function (num1, num2) {
        return num1 + num2;
    };

    vm.subtrairNumeros = function (num1, num2) {
        return num1 - num2;
    };

    vm.somarNumeros = decoratorMultiplicarPorDez(vm.somarNumeros);
    vm.subtrairNumeros = decoratorMultiplicarPorDez(vm.subtrairNumeros);
    vm.subtrairNumeros = decoratorDuplicar(vm.subtrairNumeros);

    $log.debug(vm.somarNumeros(3, 6));
    $log.debug(vm.subtrairNumeros(6, 3));

    function decoratorMultiplicarPorDez(fn) {
        return function () {
            return 10 * fn.apply(this, arguments);
        };
    }

    function decoratorDuplicar(fn) {
        return function () {
            return 2 * fn.apply(this, arguments);
        };
    }

    var addToCounter = (function () {
        var counter = 0;

        return function () {
            return counter += 1;
        };
    })();

    $log.debug(addToCounter());
    $log.debug(addToCounter());
    $log.debug(addToCounter());

    vm.variavelTeste = 'IndexController';

    $rootScope.nomeUsuarioLogado = 'Joaquim';

    $scope.listaClientes = [
        { name: 'Ciclano' },
        { name: 'Fulano' },
        { name: 'Beltrano' }
    ];

    $scope.addCliente = function () {
        $log.info('function add');
    };

    function emitirEventoAlterarListaCliente () {
        $timeout(function () {
            $rootScope.$broadcast('alterarListaClientes');
            emitirEventoAlterarListaCliente();
        }, 1000);
    }

    // emitirEventoAlterarListaCliente();

    $scope.$on('senaiControllerExampleIniciado', onSenaiControllerExampleIniciado);

    function onSenaiControllerExampleIniciado() {
        $log.debug('Diretiva senai-controller-example iniciada!');
    }

    $scope.user = {
        login: 'usuario'
    };

    vm.atualizarMensagemLogin = function (usuario) {
        $scope.mensagemLogin = 'Olá ' + usuario;
    };

    vm.atualizarMensagemLogin($scope.user.login);

    vm.doLogin = function ($event) {
        SenaiSecurityService.doLogin($scope.user)
            .then(onLoginSuccess, onLoginFailure);
        
        $log.debug('Login em processamento! Usuario: ' + 
            SenaiSecurityService.getLoggedUser());
    };

    vm.concluirLogin = function() {
        $rootScope.$emit('concluirLogin', true);
    };

    function onLoginSuccess() {
        $log.debug('Login com sucesso! Usuario: ' + 
            SenaiSecurityService.getLoggedUser().login);
        SenaiAlertService.showOk('Login realizado com sucesso!');
    }

    function onLoginFailure() {
        $log.debug('Login com falha!');
        SenaiAlertService.showError('Falha ao executar o login!');
    }

    vm.clientes = [
        { nome: 'Maria', nascimento: new Date(1990, 9, 13) },
        { nome: 'André', nascimento: new Date(1987, 0, 10) }
    ];

    var filtroData = $filter('date');

    $log.debug(
        filtroData(vm.clientes[0].nascimento,
            'dd/MM/yyyy'));

    $scope.listaEmails = [
        'teste@email.com',
        'asdf@gmail.com'
    ];

    $scope.$watch('listaEmails', watchCollectionListaEmails);

    function watchCollectionListaEmails(novoValor) {
        // console.log('Mudou a lista de e-mails.' + novoValor);
    }

    $scope.$watch('pessoa', watchPessoa, true);

    function watchPessoa(pessoa) {
        if (pessoa) {
            $log.debug(pessoa.nome);
        }
    }
}