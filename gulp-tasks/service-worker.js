'use strict';

let gulp = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');


gulp.task('generate-service-worker', function(callback) {
  var  rootDir = './public';

  swPrecache.write(path.join(rootDir, 'serw.js'), {
    staticFileGlobs: [rootDir + '/*/*.{js,html,png,jpg,gif,svg}',
                      rootDir + '/*.{html,png,jpg,gif,json}'],
    stripPrefix: rootDir,
    navigateFallback: '/',
    navigateFallbackWhitelist: [/\/dashboard\_index/],
    runtimeCaching: [{
      urlPattern: /^http:\/\/127\.0\.0\.1\:8080\/getAllData/,
      handler: 'cacheFirst'
    }],
    verbose: true
  }, callback);
});
