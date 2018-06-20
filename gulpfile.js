'use strict';

var gulp                = require('gulp'),
    clean               = require('gulp-clean'),
    sourcemaps          = require('gulp-sourcemaps'),
    browserSync         = require('browser-sync').create(),
    minifyhtml          = require('gulp-minify-html'),
    sass                = require('gulp-sass'),
    uglify              = require('gulp-uglify'),
    imagemin            = require('gulp-imagemin'),
    fontmin             = require('gulp-fontmin'),
    watch               = require('gulp-watch'),
    autoprefixer        = require('gulp-autoprefixer'),
    concat              = require('gulp-concat'),
    twig                = require('gulp-twig'),
    data                = require('gulp-data'),
    path                = require('path'),
    JSON5               = require('json5'),
    _                   = require('lodash'),
    realFavicon         = require('gulp-real-favicon'),
    fs                  = require('fs'),
    FAVICON_DATA_FILE   = 'faviconData.json';

var paths = {
    scripts: './source/js/**/*.js',
    styles: './source/sass/**/*.scss',
    images: './source/img/**/*',
    fonts: './source/fonts/**/*.ttf',
    content: './index.html'
};

gulp.task('clean', function() {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    gulp.watch('./source/sass/**/*.scss', ['sass']);
    gulp.watch('./views/**/*.twig', ['twig']);
    gulp.watch('./fixtures/**/*.json', ['twig']);
    gulp.watch('./build/*.html').on('change', browserSync.reload);
    gulp.watch('./build/**/*.js').on('change', browserSync.reload);
});

// gulp.task('content', function() {
//     return gulp.src(paths.content)
//         .pipe(minifyhtml({
//             empty: true,
//             quotes: true
//         }))
//         .pipe(gulp.dest('./build'));
// });

gulp.task('sass', function() {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/aos/dist/aos.css',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
        'node_modules/slick-carousel/slick/slick.scss',
        'node_modules/slick-carousel/slick/slick-theme.scss',
        paths.styles
    ])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('image:watch', ['image:build'], function () {
    return watch(paths.images, function () {
        gulp.src(paths.images)
            .pipe(imagemin())
            .pipe(gulp.dest('./build/img'));
    });
});

gulp.task('image:build', function () {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
});

gulp.task('fonts:watch', ['fonts:build'], function () {
    return watch(paths.fonts, function () {
        gulp.src(paths.fonts)
            .pipe(fontmin())
            .pipe(gulp.dest('./build/fonts'));
    });
});

gulp.task('fonts:build', function () {
    gulp.src(paths.fonts)
        .pipe(fontmin())
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('javascripts:watch', ['javascripts:build'], function () {
    return watch([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/feather-icons/dist/feather.js',
        'node_modules/jquery-parallax.js/parallax.js',
        'node_modules/aos/dist/aos.js',
        'node_modules/midnight.js/midnight.jquery.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        paths.scripts
    ], function () {
        gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/feather-icons/dist/feather.js',
            'node_modules/jquery-parallax.js/parallax.js',
            'node_modules/aos/dist/aos.js',
            'node_modules/midnight.js/midnight.jquery.js',
            'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
            'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
            'node_modules/slick-carousel/slick/slick.js',
            paths.scripts
        ])
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build/js'));
    });
});

gulp.task('javascripts:build', function () {
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/feather-icons/dist/feather.js',
        'node_modules/jquery-parallax.js/parallax.js',
        'node_modules/aos/dist/aos.js',
        'node_modules/midnight.js/midnight.jquery.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        paths.scripts
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});


var getJsonData = function(file) {
    var fileName = path.basename(file.path, '.twig');
    var fixturesForFile = JSON5.parse(fs.readFileSync('./fixtures/' + fileName + '.json'));
    var general = JSON5.parse(fs.readFileSync('./fixtures/_.json'));
    var result = _.extend(general, fixturesForFile);
    return result;
};

gulp.task('twig', function() {
    var twig = require('gulp-twig');
    return gulp.src('./views/pages/*.twig')
        .pipe(data(getJsonData))
        .pipe(twig())
        .pipe(gulp.dest('./build'));

});

// generate the icons https://realfavicongenerator.net
gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: './source/img/site-logo.png',
        dest: './build/img/icons',
        iconsPath: './build/img/icons',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                buildColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// inject the favicon markups in HTML index
gulp.task('inject-favicon-markups', function() {
    return gulp.src([ './*.html' ])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('./'));
});

// check for updates on RealFaviconGenerator
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});

gulp.task('favicon', [
    'generate-favicon',
    'inject-favicon-markups',
    'check-for-favicon-update'
]);

gulp.task('default', [
    'browser-sync',
    'sass',
    'image:watch',
    'fonts:watch',
    'javascripts:watch',
    'twig'
]);