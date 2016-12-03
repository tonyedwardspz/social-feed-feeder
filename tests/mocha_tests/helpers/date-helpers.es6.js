'use strict';

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./src/scripts/helpers/date-helpers.es6.js');
vm.runInThisContext(code);

describe('Date Helpers', () => {
  let _date = new Date();
  let month = ('0' + (_date.getMonth() + 1)).slice(-2);
  let day = ('0' + _date.getDate()).slice(-2);

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

  describe('#defaultDateInputMax()', () => {

    it('Returns a formatted date 5 years today', () => {
      assert.equal(`${(_date.getFullYear() + 5)}-${month}-${day}`, defaultDateInputMax());
    });
  });

  describe('#defaultDateInputMin()', () => {

    it('Returns a formatted date for today, suitable for input', () => {
      assert.equal(`${_date.getFullYear()}-${month}-${day}`, defaultDateInputMin());
    });

  });

  describe('#getDefaultDate()', () => {

    it('Returns a datestring for begining of Unix epoch', () => {
      assert.equal('1970-01-01T00:00:00Z', getDefaultDate());
    });

  });

  describe('#isDateAfterToday()', () => {

    it('Returns true if date is after today', () => {
      assert.equal(true, isDateAfterToday('2025-01-01T00:00:00Z'));
    });

    it('Returns false if date is before today', () => {
      assert.equal(false, isDateAfterToday('2010-01-01T00:00:00Z'));
    });

  });
});
