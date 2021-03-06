angular.module('alurapic').controller('FotosController', ['$scope', 'recursoFoto'], function ($scope, recursoFoto) {

    $scope.fotos = [];
    $scope.filtro = '';
    $scope.mensagem = '';

    recursoFoto.query(function(fotos) {
        $scope.fotos = fotos;
    }, function(erro) {
        console.log(erro);
    });

    $scope.remover = function(foto) {
        recursoFoto.delete({fotoId: foto._id}, function() {
            var indiceDaFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceDaFoto, 1);
            $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
            $scope.$emit('fotoDeletada', foto);
        }, function(erro) {
            console.log(erro);
            $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
        });
    };

    /*var promise = $http.get('/v1/fotos');
     promise.then(function (retorno) {
     $scope.fotos = retorno.data;
     }).catch(function (erro) {
     console.log(erro)
     });*/

});