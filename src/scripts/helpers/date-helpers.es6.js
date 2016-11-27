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
* Returns a date one year ago from passed date or today
*/
let getDateOneYearAgo = (date = new Date()) => {
  return date.setFullYear(date.getFullYear() - 1);
};
