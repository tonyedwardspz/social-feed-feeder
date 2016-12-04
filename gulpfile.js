'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');

// Get tasks from gulp-tasks directory
require('require-dir')('gulp-tasks');

let allTasks = ['scripts', 'copy', 'html', 'images'];
gulp.task('default', function(cb) {
  runSequence(
    'clean',
    allTasks,
    'styles',
    'copy:offline-analytics',
    'service-worker',
    cb);
});

gulp.task('dev', function() {
  return runSequence(
    'clean',
    allTasks,
    'styles',
    'copy:offline-analytics',
    'service-worker',
    'watch',
    'nodemon');
});

gulp.task('tests', function(cb) {
  runSequence(
    'test:qunit',
    cb);
});
