var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function(cb) {
  del('./public', {dot: true})
    .then(function() {
      cb();
    });
});
