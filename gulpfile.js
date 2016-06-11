/* jshint strict: false */
'use strict';

var args = require('yargs').argv;
var del = require('del');
var gulp = require('gulp');
var browserSync = require("browser-sync").create();
var $ = require('gulp-load-plugins')({camelize: true});

var config = require('./gulpfile-config.js');
var isProduction = /prod/i.test(args.env);


// Start BrowserSync
gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: {
            target: "http://dev.protobrew.io/"
        }
    });
});

gulp.task('styles', function () {
    gulp.src(config.source.styles)
        .pipe($.plumber())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sass({
            includePaths: config.source.includePaths,
            imagePath: config.dest.images,
            errLogToConsole: true
        }))
        .pipe($.autoprefixer('last 3 version'))
        .pipe($.if(true === isProduction, $.csso())) // only minify/compress on Production
        .pipe($.if(false === isProduction, $.sourcemaps.write())) // only generate .map files on non-production env
        .pipe(gulp.dest(config.dest.styles))
        .pipe($.size({ showFiles: true }))
        .pipe($.size({ gzip: true }))
    ;
});

gulp.task('scripts', function () {
    var scripts = config.source.vendorScripts.concat(config.source.scripts);
    return gulp.src(scripts)
        .pipe($.if(isProduction, $.uglify({ mangle: false })))
        .pipe($.concat('App.js'))
        .pipe(gulp.dest(config.dest.scripts))
        .pipe($.size({ showFiles: true }))
        .pipe($.size({ gzip: true }))
        ;
});

gulp.task('scripts-hinting', function () {
    return gulp.src(config.source.scripts)
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('assets', function () {
    del(config.clear, {force: true})
        .then(() => {
            gulp.src(config.source.fonts)
                .pipe(gulp.dest(config.dest.fonts));
        })
});

gulp.task('build', [
    'assets',
    'styles',
    'scripts-hinting',
    'scripts'
]);

// Watch
gulp.task('watch', ['build', 'browser-sync'], function () {
    // Watch .scss files
    gulp.watch(config.watch.styles, ['styles']).on('change', browserSync.reload);
    // Watch .js files
    gulp.watch(config.watch.scripts, ['scripts-hinting', 'scripts']).on('change', browserSync.reload);
    // Watch PHP code
    gulp.watch(config.watch.php).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', []);
