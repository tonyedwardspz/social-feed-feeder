var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var runSequence = require('run-sequence');

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
