'use strict';

let gulp = require('gulp'),
    runSequence = require('run-sequence');

// Get tasks from gulp-tasks directory
require('require-dir')('gulp-tasks');

let allTasks = ['styles', 'scripts', 'copy', 'html', 'images'];
gulp.task('default', function(cb) {
  runSequence(
    'clean',
    // 'bump',
    allTasks,
    //'generate-service-worker',
    cb);
});

gulp.task('dev', function() {
  return runSequence('clean', allTasks,
  // 'generate-service-worker',
  'watch', 'nodemon');
});

gulp.task('tests', function(cb) {
  runSequence(
    'clean',
    allTasks,
    'test:qunit',
    cb);
});
