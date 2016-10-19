/*global require, console*/
var gulp = require('gulp')
    , webserver = require('gulp-webserver')
    , jsLint = require("gulp-jslint")
    , jsHint = require("gulp-jshint")
    , gjsLint = require("gulp-gjslint")
    , rename = require("gulp-rename")
    , jsmin = require("gulp-jsmin")
    , uglify = require("gulp-uglify")
    , concat = require("gulp-concat")
    , minifyHTML = require("gulp-minify-html")
    , deleteLines = require("gulp-delete-lines");
// Servidor web de desarrollo 
gulp.task("dev-server", function () {
    "use strict";
    gulp.src("./app").pipe(webserver({
        open: true
        , livereload: true
    }));
});
// Servidor web de produccion 
gulp.task("prod-server", function () {
    "use strict";
    gulp.src("./dist").pipe(webserver({
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
// Minificación y fusión de archivos javascript
gulp.task("compressAndConcat", function () {
    "use strict";
    gulp.src(["./app/js/mainController.js", "./app/js/**/*.js"]).pipe(concat("main.min.js")).pipe(jsmin()).pipe(uglify()).pipe(rename("main.min.js")).pipe(gulp.dest("dist/js/"));
});
// Minificación del html
gulp.task("compressHTML", function () {
    "use strict";
    gulp.src(".app/index.html").pipe(minifyHTML()).pipe(gulp.dest("dist/"));
});
// Copia de los archivos y librerías necesarios
gulp.task("copyLibs", function () {
    "use strict";
    // Copiado de librerías
    gulp.src("./app/lib/**/*").pipe(gulp.dest("./dist/lib/"));
});
gulp.task("publish", function () {
    "use strict";
    // Copiado de librerías
    gulp.src("./app/lib/**/*").pipe(gulp.dest("./dist/lib/"));
    // Minificación y fusión de archivos javascript
    gulp.src(["./app/js/mainController.js", "./app/js/**/*.js"]).pipe(concat("main.min.js")).pipe(jsmin()).pipe(uglify()).pipe(rename("main.min.js")).pipe(gulp.dest("dist/js/"));
    // Minificación de plantillas HTML
    gulp.src(".app/view/**/*.html").pipe(minifyHTML()).pipe(gulp.dest("dist/view/"));
    // Minificación de index HTML
    gulp.src(".app/index.html").pipe(deleteLines({
        "filters": ["<--BEGIN PROD FILES"]
    })).pipe(deleteLines({
        "filters": ["END PROD FILES-->"]
    })).pipe(deleteLines({
        "filters": [new RegExp(".*DEVFILE.*")]
    })).pipe(minifyHTML()).pipe(gulp.dest("dist/"));
});
// Copia el contenido de /app en /www para probar la aplicacion con apache cordova
gulp.task("cordovaDev", function () {
    "use strict";
    gulp.src("./app/**/*").pipe(gulp.dest("./www/"));
    gulp.src("./app/res/**/*").pipe(gulp.dest("./www/res/"));
});
// Añade las partes adicionales necesarias para la aplicación apache cordova
gulp.task("cordovaDist", function () {
    "use strict";
    gulp.src("./dist/**/*").pipe(gulp.dest("./www/"));
    gulp.src("./app/res/**/*").pipe(gulp.dest("./www/res/"));
});
gulp.task("default", ["dev-server"]);
gulp.task("compile", ["jsHint", "publish"]);
// Genera una versión de producción para distribuir la aplicación con apache cordova
gulp.task("compileCordova", ["compile", "cordovaDist"]);