'use strict';

let gulp = require('gulp');
let jsdoc = require('gulp-jsdoc3');

gulp.task('doc', function (cb) {
    gulp.src(['README.md', './src/**/*.es6.js', './server/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});
