'use strict';

let gulp = require('gulp');
let del = require('del');
let runSequence = require('run-sequence');
let fs = require('fs');
let file = require('gulp-file');
let gulpif = require('gulp-if');
let stripDebug = require('gulp-strip-debug');
let gutil = require('gulp-util');

let env = gutil.env.env === 'PRODUCTION' ? true : false;

gulp.task('service-worker:watch', function() {
  gulp.watch('./src/service-worker.js', ['service-worker']);
});

gulp.task('generate-service-worker', function(){
  let swContents = fs.readFileSync('./src/service-worker.js', 'utf8');
  let versionedContents = swContents.replace(/\/\/VERSION-HERE/g, `const version = ${Date.now()}`);

  return file('service-worker.js', versionedContents, { src: true })
    .pipe(gulpif(env, stripDebug()))
    .pipe(gulp.dest('./public'));
});

gulp.task('service-worker', function(cb) {
  del('./public/service-worker.js', {dot: true});

  runSequence(
    ['generate-service-worker'],
    cb
  );
});
