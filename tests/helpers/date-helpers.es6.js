'use strict';

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./src/scripts/helpers/date-helpers.es6.js');
vm.runInThisContext(code);

describe('Date Helpers', () => {
  describe('#convertDateToLocale(date)', () => {

    it('Returns UK formatted date when passed a string', () => {
      assert.equal('1/12/2017', convertDateToLocale('2017-01-12T08:45:00.000Z'));
    });

  });

  describe('#convertDateForInput(date)', () => {

    it('Returns formatted date for date input when passed a string', () => {
      assert.equal('2017-01-12', convertDateForInput('2017-01-12T08:45:00.000Z'));
    });

  });
});
