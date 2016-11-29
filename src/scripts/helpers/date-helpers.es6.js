'use strict';

/**
* Gets a UK formatted date for display to user
* @param {String} date The full unix date string to convert
* @return {String} Formatted date string - dd/mm/yyyy
*/
function convertDateToLocale(date) {
  try {
    return new Date(date).toLocaleDateString('en-GB');
  } catch (e) {
    console.log('Error converting date - Trying backup: ' + e);
    let _date = new Date(date);
    return `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}`;
  }
}

/**
* Convert passed date string into the format required by input type='date'
* @param {String} date The full unix date string to convert
* @return {String} Formatted date string
*/
function convertDateForInput(date) {
  try {
    let _date = new Date(date);
    let month = ('0' + (_date.getMonth() + 1)).slice(-2);
    let day = ('0' + _date.getDate()).slice(-2);
    return `${_date.getFullYear()}-${month}-${day}`;
  } catch (e) {
    console.log('error converting date for input', e);
  }
}

/**
* Returns todays date in the correct format for date input (min)
* @return {String} Formatted date string
*/
let defaultDateInputMin = () => {
  let _date = new Date();
  let month = ('0' + (_date.getMonth() + 1)).slice(-2);
  let day = ('0' + _date.getDate()).slice(-2);
  return `${_date.getFullYear()}-${month}-${day}`;
};

/**
* Get a date in five years time in the correct format for date input (max)
* @return {String} Formatted date string
*/
let defaultDateInputMax = () => {
  let _date = new Date();
  let month = ('0' + (_date.getMonth() + 1)).slice(-2);
  let day = ('0' + _date.getDate()).slice(-2);
  return `${(_date.getFullYear() + 5)}-${month}-${day}`;
};

/**
* Gets default date to be used when creating posts (which have yet to be shared)
* @return {String} A date string for the begining of the unix epocj
*/
let getDefaultDate = () => {
  return '1970-01-01T00:00:00Z';
};

/**
* Checks to see if the passed date is prior to today
* @param {String} date The date which needs to be checked
* @return {Boolean} Whether the date is after today or not
*/
let isDateAfterToday = (date) => {
  return (new Date(date) >= new Date().setHours(0,0,0,0)) ? true : false;
};
