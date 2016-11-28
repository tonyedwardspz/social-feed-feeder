'use strict';

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./src/scripts/helpers/string-helpers.es6.js');
vm.runInThisContext(code);

describe('String Helpers', () => {
  describe('#random string(length)', () => {

    it('Returns a random string 32 charachters long as default', () => {
      assert.equal(32, randomString().length);
    });

    it('Returns a random string of the length passed', () => {
      assert.equal(10, randomString(10).length);
      assert.equal(9584, randomString(9584).length);
    });

  });
});
