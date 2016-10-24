var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('copy:root', function() {
  del(['./public/*.{json,txt,ico}'], {dot: true});

  return gulp.src('./src/*.{json,txt,ico}')
    .pipe(gulp.dest('./public'));
});

gulp.task('copy:watch', function() {
  gulp.watch('./public/*.{json,txt,ico}', ['copy:root']);
});

gulp.task('copy', function(cb) {
  runSequence(
    'copy:root',
  cb);
});
