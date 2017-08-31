var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect-php');
var gnf = require('gulp-npm-files');

var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
    src: 'src/**/*',
    srcHTML: 'src/**/*.php',
    srcCSS: 'src/**/*.css',
    srcJS: 'src/**/*.js',
    srcPHP: 'src/**/*.php',
    srcIMG: 'src/**/*.{png,jpg,gif,svg}',

    public: 'public',
    publicIndex: 'public/index.php',
    publicCSS: 'public/**/*.css',
    publicJS: 'public/dist/**/*.js',

    dist: 'dist',
    distIndex: 'dist/index.php',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
};

gulp.task("webpack", function(callback) {
    // run webpack
    return webpack({
        entry: [ __dirname + "/src/js/main.js"],
        output: {
            path: __dirname + "/dist/",
            publicPath: __dirname + "/public/",
            filename: "[name].bundle.js",
            chunkFilename: "[id].bundle.js"
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ],
        resolve: {
            alias: {
                'jquery': __dirname + '/node_modules/jquery/dist/jquery.js'
            }
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                { test: /\.(png|jpg)$/, loader: 'file-loader' }
            ],
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('html', function () {
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.public));
});

gulp.task('css', function () {
    return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.public));
});

gulp.task('js', ['webpack'], function () {
    return gulp.src(paths.distJS).pipe(gulp.dest('./public/dist'));
});

gulp.task('php', function () {
    return gulp.src(paths.srcPHP).pipe(gulp.dest(paths.public));
});

gulp.task('img', function () {
    return gulp.src(paths.srcIMG).pipe(gulp.dest(paths.public));
});

// copia las dependecias listadas en el package.json a la direccion especificada
gulp.task('copyNpm', function() {
    gulp.src(gnf(), {base:'./'}).pipe(gulp.dest('./public/build'));
});

gulp.task('copy', ['html', 'css', 'js', 'php', 'img', 'copyNpm']);

// inyecta las nuevas direcciones publicas de los archivos de css y js en el index de la carpeta public
gulp.task('inject', ['copy'], function () {
    var css = gulp.src(paths.publicCSS);
    var js = gulp.src(paths.publicJS);
    return gulp.src(paths.publicIndex)
        .pipe(inject( css, { relative:true } ))
        .pipe(inject( js, { relative:true } ))
        .pipe(gulp.dest(paths.public));
});

// inicializa un servidor web de gulp para la aplicacion
gulp.task('serve', ['inject'], function () {
    return gulp.src(paths.public)
        .pipe(webserver({
            port: 3000,
            livereload: true
        }));
});

// gulp.task('watch', ['serve'], function () {
//     gulp.watch(paths.src, ['inject']);
// });

// conecta el servidor de gulp con el servicio de php
gulp.task('connect', ['inject'], function() {
    connect.server({
        port: 8000,
        base: paths.public
    });
});

gulp.task('disconnect', function() {
    connect.closeServer();
});

gulp.task('watch', ['connect'], function () {
    gulp.watch(paths.src, ['inject']);
});

gulp.task('html:dist', function () {
    return gulp.src(paths.srcHTML)
        .pipe(htmlclean())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('css:dist', function () {
    return gulp.src(paths.srcCSS)
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('js:dist', function () {
    return gulp.src(paths.srcJS)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist']);

gulp.task('inject:dist', ['copy:dist'], function () {
    var css = gulp.src(paths.distCSS);
    var js = gulp.src(paths.distJS);
    return gulp.src(paths.distIndex)
        .pipe(inject( css, { relative:true } ))
        .pipe(inject( js, { relative:true } ))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);

// elimina las carpetas de public y dist
gulp.task('clean', function () {
    del([paths.public, paths.dist]);
});

gulp.task('default', ['watch']);
