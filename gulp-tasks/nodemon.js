'use strict';

let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let env = require('gulp-env');

gulp.task('nodemon', function() {
  env({
    vars: {
      PORT: 8080
    }
  });

  return nodemon({
    script: 'server.js',
    ignore: ['./public/', './src', './gulp-tasks', './node_modules', './tests']
  });
});
