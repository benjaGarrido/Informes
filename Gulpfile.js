/*global require, console*/
var gulp = require('gulp')
    , webserver = require('gulp-webserver')
    , jsLint = require("gulp-jslint")
    , jsHint = require("gulp-jshint")
    , gjsLint = require("gulp-gjslint")
    , rename = require("gulp-rename")
    , jsmin = require("gulp-jsmin")
    , uglify = require("gulp-uglify");
// Servidor web de desarrollo 
gulp.task("dev-server", function () {
    "use strict";
    gulp.src("./app").pipe(webserver({
        open: true
        , livereload: true
    }));
});
// Busca errores de JavaScript de acuerdo con JsLint
gulp.task("jsLint", function () {
    "use strict";
    return gulp.src(["./app/js/**/*.js"]).pipe(jsLint()).on("error", function (error) {
        console.error(String(error));
    });
});
// Busca errores de JavaScript de acuerdo con JsHint
gulp.task("jsHint", function () {
    "use strict";
    return gulp.src(["./app/js/**/*.js"]).pipe(jsHint(".jshintrc")).pipe(jsHint.reporter("default"));
});
// Busca errores de JavaScript de acuerdo con Google JsLinter
gulp.task("jsGoogleLint", function () {
    "use strict";
    return gulp.src(["./app/js/**/*.js"]).pipe(gjsLint()).pipe(gjsLint.reporter("console"), {
        fail: true
    });
});
// Comprime nuestro código con la herramienta JsMin
gulp.task("compressJsMin", function () {
    "use strict";
    gulp.src(["./app/js/mainController.js", "./app/js/controller/*.js", "./app/js/service/*.js"]).pipe(jsmin()).pipe(rename({
        suffix: ".min"
    })).pipe(gulp.dest("dist/js/"));
});
// Comprime nuestro código con la herramienta Uglify
gulp.task("compressUglify", function () {
    "use strict";
    gulp.src(["./app/js/mainController.js", "./app/js/controller/*.js", "./app/js/service/*.js"]).pipe(uglify()).pipe(rename({
        suffix: ".min"
    })).pipe(gulp.dest("dist/js/"));
});
// Comprime nuestro código utilizando la suma de JsMin y Uglify
gulp.task("superCompress", function () {
    "use strict";
    gulp.src(["./app/js/mainController.js", "./app/js/controller/*.js", "./app/js/service/*.js"]).pipe(jsmin()).pipe(uglify()).pipe(rename({
        suffix: ".min"
    })).pipe(gulp.dest("dist/js/"));
});
gulp.task("default", ["dev-server"]);