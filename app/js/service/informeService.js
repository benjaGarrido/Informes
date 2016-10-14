/*global angular*/
angular.module("GeneradorInformes").constant("BASE_URL", "http://hita.pro").factory("InformeService", ["BASE_URL", "$http", function (BASE_URL, $http) {
    "use strict";
    return {
        generar: function (userData) {
            return $http.post(BASE_URL + "/generar" + userData);
        }
    };
}])