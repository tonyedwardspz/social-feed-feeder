'use strict';

/**
* Generates a random string to be used as an ID for objects. Not the best
* generator in the world...... but it will do for our purposes.
* @param {Int} [length=32] the length of string to generate
* @return The generated random string
*/
let randomString = (length = 32) => {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};

/**
* Generates a random filename with the passed filenames extention.
* @param {String} filename The original filename with extention
* @return The new random string filename
*/
let getRandomFileName = (fileName) => {
  try {
    let extention = fileName.split('.').pop();
    let newFileName = `${randomString()}.${extention}`;
    return newFileName;
  } catch (error) {
    console.log('Failed to generate new random filename: ', error);
    return fileName;
  }

};
