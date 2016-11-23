'use strict';

let gulp = require('gulp');
let del = require('del');
let imagemin = require('gulp-imagemin');

gulp.task('images:watch', function() {
  gulp.watch('./src/images/**/*.{png,jpg,jpeg,gif,svg}', ['images']);
});

gulp.task('images', function() {
  del('./public/images/**/*.{png,jpg,jpeg,gif,svg}', {dot: true});

  return gulp.src('./src/images/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
    }))
    .pipe(gulp.dest('./public/images'));
});
