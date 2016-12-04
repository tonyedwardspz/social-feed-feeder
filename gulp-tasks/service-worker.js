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



// From failed attempt at using sw-precache. For some reason it didn't like the
// apps architecture, and I have rolled my own instead to figure out why.
//
//
// var swPrecache = require('sw-precache');
//
//
// gulp.task('generate-service-worker', function(callback) {
//   var  rootDir = './public';
//
//   swPrecache.write(path.join(rootDir, 'serw.js'), {
//     staticFileGlobs: [rootDir + '/*/*.{js,html,png,jpg,gif,svg}',
//                       rootDir + '/*.{html,png,jpg,gif,json}'],
//     stripPrefix: rootDir,
//     navigateFallback: '/',
//     navigateFallbackWhitelist: [/\/dashboard\_index/],
//     runtimeCaching: [{
//       urlPattern: /^http:\/\/127\.0\.0\.1\:8080\/getAllData/,
//       handler: 'cacheFirst'
//     }],
//     verbose: true
//   }, callback);
// });
