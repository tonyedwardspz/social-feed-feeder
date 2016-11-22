var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');

gulp.task('scripts:watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
  gulp.watch(['./.eslintrc', './.eslintignore'], ['scripts']);
});

var env = gutil.env.env === 'PRODUCTION' ? true : false;

gulp.task('scripts:es6', function() {
  return gulp.src(['./node_modules/babel-polyfill/dist/polyfill.min.js',
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
