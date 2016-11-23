'use strict';

let gulp = require('gulp');
let bump = require('gulp-bump');

gulp.task('bump', function() {
  return gulp.src('./package.json')
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));
});
