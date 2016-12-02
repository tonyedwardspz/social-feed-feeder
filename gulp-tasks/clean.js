'use strict';

let gulp = require('gulp');
let del = require('del');

gulp.task('clean', function(cb) {
  del(['./public/scripts',
       './public/styles',
       './public/manifest.json',
       './public/index.html',
       './public/images/*.{png,gif,jpg,jpeg,svg}',
       './public/service-worker.js'], {dot: true})
    .then(function() {
      cb();
    });
});
