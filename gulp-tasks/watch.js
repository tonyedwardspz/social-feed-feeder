'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');

// Loop over all tasks, looking for those ending in watch. Then run them.
gulp.task('watch', function() {
  let taskNames = Object.keys(gulp.tasks);
  let gulpWatchTasks = [];

  for (let i = 0; i < taskNames.length; i++) {
    let taskName = taskNames[i];
    let taskParts = taskName.split(':');

    if (taskParts.length > 1 &&
      taskParts[taskParts.length - 1].toLowerCase() === 'watch') {
      gulpWatchTasks.push(taskName);
    }
  }

  runSequence(gulpWatchTasks);
});
