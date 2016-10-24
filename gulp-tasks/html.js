var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');

gulp.task('html:watch', function() {
  gulp.watch('./src/*.html', ['html']);
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    // .pipe(minifyHtml())
    .pipe(gulp.dest('./public'));
});
