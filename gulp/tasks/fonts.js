'use strict';

// Gulp & plugins
var gulp = require('gulp');
var changed = require('gulp-changed');

// BrowserSync
var browserSync = require('browser-sync');

// Configs
var config = require('../config').fonts;

gulp.task('fonts', function () {
    var blobs = require('main-bower-files')({filter: config.filter}).concat(config.src);

    return gulp.src(blobs)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream: true}));
});
