/*global angular*/
var angularApp = angular.module("GeneradorInformes", ["ui.bootstrap", "ngRoute"]);
angularApp.controller("MainController", ["$scope", "$location", function ($scope, $location) {
    $scope.initApp = function () {
        $location.path("/registro");
    };
}]);
angularApp.config(["$locationProvider", "$routeProvider", function ($locationProvider, $routeProvider) {
    "use strict";
    $locationProvider.html5Mode();
    $routeProvider.when("/registro", {
        templateUrl: "view/registroInformacion.tpl.html"
        , controller: "RegistroController"
    });
    $routeProvider.when("/cargando", {
        templateUrl: "view/cargandoInforme.tpl.html"
        , controller: "CargandoController"
    });
    $routeProvider.when("/informe", {
        templateUrl: "view/informeResultados.tpl.html"
        , controller: "InformeController"
    });
}])