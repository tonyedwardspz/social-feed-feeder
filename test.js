require('require-dir')('tests/helpers');


// Basic test to enable initial CI
var assert = require('assert');
describe('Sanity', function() {

  describe('#doTestsRun()', function() {
    it('should return -1 when there is some semblance of sanity in JavaScript land', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
  
});
