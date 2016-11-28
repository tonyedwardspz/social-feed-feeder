'use strict';
//This is a test string. @tonyedwardspz #kdat https://kernowdat.co.uk = 73

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./node_modules/twitter-text/twitter-text.js');
code += fs.readFileSync('./src/scripts/helpers/twitter-helpers.es6.js');
vm.runInThisContext(code);


// describe('Twitter Helpers', () => {
//
//   describe('#getCharCount(text)', () => {
//
//     it('Returns a a value of 73', () => {
//       assert.equal(73, getCharCount(`This is a test string. @tonyedwardspz #kdat
//                                      https://kernowdat.co.uk`));
//     });
//
//   });
//
// });
