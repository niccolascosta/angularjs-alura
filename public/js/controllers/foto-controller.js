angular.module('alurapic')
    .controller('FotoController',['$scope', 'recursoFoto', 'cadastroDeFotos', '$routeParams'],
        function ($scope, recursoFoto, cadastroDeFotos, $routeParams) {

        $scope.foto = {};
        $scope.mensagem = '';

        if ($routeParams.fotoId) {
            recursoFoto.get({fotoId: $routeParams.fotoId}, function (foto) {
                $scope.foto = foto;
            }, function (erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter a foto'
            });
        }

        $scope.submeter = function () {
            if ($scope.formulario.$valid) {
                cadastroDeFotos.cadastrar($scope.foto)
                    .then(function (dados) {
                        $scope.mensagem = dados.mensagem;
                        if (dados.inclusao) $scope.foto = {};
                        $scope.formulario.$setPristine();
                        $scope.$broadcast('fotoCadastrada');
                    })
                    .catch(function (erro) {
                        $scope.mensagem = erro.mensagem;
                    });
            }
        };

    });