/*global angular*/
angular.module("GeneradorInformes").controller("CargandoController", ["$rootScope", "$scope", "$location", "InformeService", function ($rootScope, $scope, $location, InformeService) {
    "use strict";
    $scope.iniciarCargaInforme = function () {
        InformeService.generar($rootScope).then(function (resultado) {
            $rootScope.resultadoInforme = resultado;
        }).catch(function (resultado) {
            $rootScope.resultadoInforme = {
                error: true
                , resultado: resultado
            };
        }).finally(function (resultado) {
            $location.path("/informe");
        });
    };
}]);