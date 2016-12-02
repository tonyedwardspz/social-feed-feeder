'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let del = require('del');

gulp.task('copy:root', function() {
  del(['./public/*.{json,txt,ico, js}'], {dot: true});

  return gulp.src('./src/*.{json,txt,ico, js}')
    .pipe(gulp.dest('./public'));
});

gulp.task('copy:watch', function() {
  gulp.watch('./public/*.{json,txt,ico, js}', ['copy:root']);
});

gulp.task('copy', function(cb) {
  runSequence(
    'copy:root',
  cb);
});
