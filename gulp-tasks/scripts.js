var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var path = require('path');
var glob = require('glob');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('scripts:watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
  gulp.watch(['./.eslintrc', './.eslintignore'], ['scripts']);
});

// This takes a source path and finds all files ending
// with .es6.js and creates the bundles to run through browserify
// and babelify
function generateES6Bundles() {
  let es6Filepaths = glob.sync('./src/scripts/**/*.es6.js');

  var browserifyBundles = [];
  es6Filepaths.forEach(function(filepath) {
    let filename = path.basename(filepath);
    let relativeDirectory = path.relative('./public', path.dirname(filepath));
    let outputFilename =
      filename.substring(0, filename.length - '.es6.js'.length) + '.js';

    browserifyBundles.push({
      srcPath: './' + filepath,
      outputFilename: outputFilename,
      dest: path.join(GLOBAL.config.dest, relativeDirectory)
    });
  });

  return browserifyBundles;
}

gulp.task('scripts:es6', function(cb) {
  var browserifyBundles = generateES6Bundles();

  var finishedCount = 0;
  browserifyBundles.forEach(function(bundle) {
    var browserifyBundle = browserify({
      entries: [bundle.srcPath]
    })
    .transform('babelify', {presets: ['es2015']});

    try {
      return browserifyBundle.bundle()
        .on('log', gutil.log.bind(gutil, 'Browserify Log'))
        .on('error', function(err) {
          gutil.log('Browserify Error', err);
          this.emit('end');
        })
        .pipe(source(bundle.outputFilename))
        .pipe(uglify())
        .pipe(gulp.dest(bundle.dest))
        .on('end', function() {
          finishedCount++;

          if (finishedCount === browserifyBundles.length) {
            cb();
          }
        });
    } catch (exception) {
      console.log(exception);
    }
  });
});

gulp.task('scripts', function(cb) {
  del('./public/scripts/*.js', {dot: true});

  runSequence(
    'scripts:es6',
    cb
  );
});
