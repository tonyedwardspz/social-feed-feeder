'use strict';

let gulp = require('gulp');
let qunit = require('gulp-qunit');

gulp.task('test:qunit', function() {
    return gulp.src('./tests/qunit/index.html')
        .pipe(qunit());
});
