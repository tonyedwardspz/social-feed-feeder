'use strict';

let gulp = require('gulp');
let ga = require('gulp-ga');

// Inject Google analytics code before the closing body tag
gulp.task('google-analytics', function(){
  gulp.src('./public/index.html')
  .pipe(ga({
    url: 'social-feed-feeder.herokuapp.com/',
    uid: 'UA-88377745-1',
    tag: 'body',
    demographics: true,
    linkAttribution: true,
    minify: true,
    sendPageView: true
  }))
  .pipe(gulp.dest('./public/'));
});
