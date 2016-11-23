'use strict';

let gulp = require('gulp');
let minifyHtml = require('gulp-minify-html');
let runSequence = require('run-sequence');

gulp.task('html:watch', function() {
  gulp.watch('./src/*.html', function(){
    runSequence(['html'], ['styles:inline']);
  });
});



gulp.task('html', function() {
  return gulp.src('./src/*.html')
    // .pipe(minifyHtml())
    .pipe(gulp.dest('./public'));
});
