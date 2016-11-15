var assert = require('assert');
var fs = require('fs');
var vm = require('vm');
var code = fs.readFileSync('./src/scripts/helpers/string-helpers.es6.js');
vm.runInThisContext(code);

describe('String Helpers', function() {
  describe('#random string(length)', function() {

    it('Returns a random string 32 charachters long as default', function() {
      assert.equal(32, randomString().length);
    });

    it('Returns a random string of the length passed', function() {
      assert.equal(10, randomString(10).length);
      assert.equal(9584, randomString(9584).length);
    });
    
  });
});
