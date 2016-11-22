var assert = require('assert');
var fs = require('fs');
var vm = require('vm');
var code = fs.readFileSync('./src/scripts/helpers/date-helpers.es6.js');
vm.runInThisContext(code);

describe('Date Helpers', function() {
  describe('#convertDateToLocale(date)', function() {

    it('Returns UK formatted date when passed a string', function() {
      assert.equal('1/12/2017', convertDateToLocale('2017-01-12T08:45:00.000Z'));
    });

  });

  describe('#convertDateForInput(date)', function() {

    it('Returns formatted date for date input when passed a string', function() {
      assert.equal('2017-01-12', convertDateForInput('2017-01-12T08:45:00.000Z'));
    });

  });
});
