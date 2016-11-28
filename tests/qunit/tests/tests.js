'use strict';

QUnit.test( 'login button test', function( assert ) {
  var button = $('#login');
  assert.equal(button.text(),
               'Login',
               'Checking that the login button has the right text');
});

QUnit.test( 'title test', function( assert ) {
  var pageTitle = $('.title');
  assert.equal(pageTitle.text(),
               'Social Feed Feeder',
               'Checking that page title is "Social Feed Feeder"');
});
