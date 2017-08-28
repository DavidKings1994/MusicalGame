var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect-php');

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
    publicJS: 'public/**/*.js',

    dist: 'dist',
    distIndex: 'dist/index.php',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
};

gulp.task('html', function () {
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.public));
});

gulp.task('css', function () {
    return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.public));
});

gulp.task('js', function () {
    return gulp.src(paths.distJS).pipe(gulp.dest(paths.public));
});

gulp.task('php', function () {
    return gulp.src(paths.srcPHP).pipe(gulp.dest(paths.public));
});

gulp.task('img', function () {
    return gulp.src(paths.srcIMG).pipe(gulp.dest(paths.public));
});

gulp.task('copy', ['html', 'css', 'js', 'php', 'img']);

gulp.task('inject', ['copy'], function () {
    var css = gulp.src(paths.publicCSS);
    var js = gulp.src(paths.publicJS);
    return gulp.src(paths.publicIndex)
        .pipe(inject( css, { relative:true } ))
        .pipe(inject( js, { relative:true } ))
        .pipe(gulp.dest(paths.public));
});

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

gulp.task('clean', function () {
    del([paths.public, paths.dist]);
});

gulp.task('default', ['watch']);
