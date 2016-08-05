/* jshint strict: false */
'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import browser  from 'browser-sync';
import gulp     from 'gulp';
import del      from 'del';
import yaml     from 'js-yaml';
import fs       from 'fs';


const $ = plugins();  // Load all Gulp plugins into one variable
const { COMPATIBILITY, PATHS } = loadConfig();  // Load settings from settings.yaml
const PRODUCTION = /prod/i.test(yargs.env);  // Is it production?


function loadConfig() {
    let ymlFile = fs.readFileSync('config.yaml', 'utf8');
    return yaml.load(ymlFile);
}

// Start BrowserSync server
function server(done) {
    browser.init({
        proxy: {
            target: 'http://dev.neos-protobrew:3000/'
        }
    });
    done();
}

// Clean all dist folders
function clean(done) {
    del(PATHS.clean, {force: true})
        .then(() => done());
}

// Compile Sass into CSS. In production, the CSS is also compressed.
function styles() {
    return gulp.src(PATHS.sassSrc)
        .pipe($.sourcemaps.init())
        .pipe(
            $.sass({
                includePaths: PATHS.sassInclude
            })
            .on('error', $.sass.logError)
        )
        .pipe($.autoprefixer({ browsers: COMPATIBILITY }))
        .pipe($.if(PRODUCTION, $.csso()))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        // .pipe($.size({ title: 'STYLES', showFiles: true, gzip: true }))
        .pipe(gulp.dest(PATHS.dist.styles))
        .pipe(browser.stream())
    ;
}

// Compile / interpolate (with babel) JS
function js() {
    jsHinting(); // do JS hinting in parallel

    return gulp.src(PATHS.jsVendor.concat(PATHS.js))
        .pipe($.sourcemaps.init())
        .pipe($.babel({compact: false}))
        .pipe($.concat('App.js'))
        .pipe($.if(PRODUCTION, $.uglify()
            .on('error', e => { console.log(e); })
        ))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        // .pipe($.size({ title: 'JS', showFiles: true, gzip: true }))
        .pipe(gulp.dest(PATHS.dist.js))
    ;
}

// JS hinting
function jsHinting() {
    return gulp.src(PATHS.js)
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'));
}

// Copy assets from private to target destinations
function assets() {
    return gulp.src(PATHS.assets.fonts)
        .pipe(gulp.dest(PATHS.dist.fonts));
}

// Watch
function watch() {
    // Watch .scss files
    gulp.watch(PATHS.watch.styles, styles);
    // Watch .js files
    gulp.watch(PATHS.watch.js).on('change', gulp.series(js, browser.reload));
    // Watch PHP/Neos code
    gulp.watch(PATHS.watch.php).on('change', browser.reload);
}


//
// Tasks definitions
//

// Full build, but without watching and server
gulp.task('build',
    gulp.series(
        clean,
        gulp.parallel(styles, js, assets)
    )
);

// Build the site, run the server, and watch for file changes
gulp.task('default', gulp.series('build', server, watch));
