var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

gulp.task('nodemon', function() {
  env({
    vars: {
      PORT: 8080
    }
  });

  return nodemon({
    script: 'server.js'
  });
});
