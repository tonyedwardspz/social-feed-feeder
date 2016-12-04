'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let del = require('del');

gulp.task('copy:root', function() {
  del(['./public/*.{json,txt,ico,js}'], {dot: true});

  return gulp.src('./src/*.{json,txt,ico,js,png}')
    .pipe(gulp.dest('./public'));
});

gulp.task('copy:offline-analytics', function() {
  del(['./public/scripts/offline-google-analytics-import.js'], {dot: true});

  return gulp.src('./node_modules/sw-offline-google-analytics/offline-google-analytics-import.js')
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('copy:watch', function() {
  gulp.watch('./public/*.{json,txt,ico,png}', ['copy:root']);
});

gulp.task('copy', function(cb) {
  runSequence(
    'copy:root',
    cb
  );
});
