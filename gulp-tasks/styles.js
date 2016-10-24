var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var file = require('gulp-file');

gulp.task('styles:watch', function() {
  gulp.watch('./src/styles/*.scss', ['styles']);
});

gulp.task('styles:sass', function() {
  return gulp.src('./src/styles/*.scss')
    // .pipe(sourcemaps.init())
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
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('styles:inline', function(){
  let indexContents = fs.readFileSync('./public/index.html', 'utf8').replace(/INLINE-CSS/g, function() {
      var style = fs.readFileSync('./public/styles/inline.css', 'utf8');
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
