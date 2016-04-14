'use strict';

// Gulp & plugins
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');

// Utilities
var handleErrors = require('../util/handleErrors');

// Configs
var config = require('../config').test;

gulp.task('test', ['script:test'], function () {
    return gulp.src(config.dest + '/**/*.js')
        .pipe(mocha(config.mochaOptions));
});

gulp.task('script:test', function () {
    return gulp.src(config.src)
        .pipe(webpack(config.testOptions))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest));
});
