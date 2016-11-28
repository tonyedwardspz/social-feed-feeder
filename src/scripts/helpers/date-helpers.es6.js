'use strict';

/**
* Convert passed date string into a locale object if supported, else
* return constructed version.
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
* Convert passed date string into formate required by input type='date'
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
* Returns todays date in the correct format for date input min
*/
let defaultDateInputMin = () => {
  let _date = new Date();
  let month = ('0' + (_date.getMonth() + 1)).slice(-2);
  let day = ('0' + _date.getDate()).slice(-2);
  return `${_date.getFullYear()}-${month}-${day}`;
};

/**
* Returns a date in five years in the correct format for date input max
*/
let defaultDateInputMax = () => {
  let _date = new Date();
  let month = ('0' + (_date.getMonth() + 1)).slice(-2);
  let day = ('0' + _date.getDate()).slice(-2);
  return `${(_date.getFullYear() + 5)}-${month}-${day}`;
};

/**
* Returns a date one year ago from passed date or today
*/
let getDateOneYearAgo = (date = new Date()) => {
  return date.setFullYear(date.getFullYear() - 1);
};

/**
* Returns a date string for the begining of the Unix epoch
*/
let getDefaultDate = () => {
  return '1970-01-01T00:00:00Z';
};

/**
* Returns true/false if passed date is prior to today
*/
let isDateAfterToday = (date) => {
  return (new Date(date) >= new Date().setHours(0,0,0,0)) ? true : false;
};
