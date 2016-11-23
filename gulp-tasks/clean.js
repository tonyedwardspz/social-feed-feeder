'use strict';

let gulp = require('gulp');
let del = require('del');

gulp.task('clean', function(cb) {
  del('./public', {dot: true})
    .then(function() {
      cb();
    });
});
