'use strict';

let gulp = require('gulp');
let del = require('del');
let runSequence = require('run-sequence');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let gulpif = require('gulp-if');
let stripDebug = require('gulp-strip-debug');
let gutil = require('gulp-util');

gulp.task('scripts:watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
  gulp.watch(['./.eslintrc', './.eslintignore'], ['scripts']);
});

let env = gutil.env.env === 'PRODUCTION' ? true : false;

gulp.task('scripts:es6', function() {
  return gulp.src(['./node_modules/babel-polyfill/dist/polyfill.min.js',
                   './node_modules/twitter-text/twitter-text.js',
                   './src/scripts/*/*.js',
                   './src/scripts/app.es6.js'])
    .pipe(concat('app.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulpif(env, uglify()))
    .pipe(gulpif(env, stripDebug()))
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('scripts', function(cb) {
  del('./public/scripts/*.js', {dot: true});

  runSequence(
    'scripts:es6',
    cb
  );
});
