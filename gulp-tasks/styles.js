'use strict';

let gulp = require('gulp');
let del = require('del');
let runSequence = require('run-sequence');
let minifyCSS = require('gulp-minify-css');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');
let fs = require('fs');
let file = require('gulp-file');
let concat = require('gulp-concat');

gulp.task('styles:watch', function() {
  gulp.watch('./src/styles/*.scss', ['styles']);
});

gulp.task('styles:sass', function() {
  return gulp.src(['./node_modules/milligram/dist/milligram.css', './src/styles/*.scss'])
    .pipe(concat('inline.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer([
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('styles:inline', function(){
  let indexContents = fs.readFileSync('./public/index.html', 'utf8').replace(/INLINE-CSS/g, function() {
    let style = fs.readFileSync('./public/styles/inline.css', 'utf8');
    return '<style>\n' + style + '\n</style>';
  });
  del('./public/index.html', {dot: false});

  return file('index.html', indexContents, { src: true })
    .pipe(gulp.dest('./public'));
});

gulp.task('styles', function(cb) {
  del('./public/styles/*.css', {dot: true});

  runSequence(
    ['styles:sass'],
    ['styles:inline'],
    cb
  );
});
