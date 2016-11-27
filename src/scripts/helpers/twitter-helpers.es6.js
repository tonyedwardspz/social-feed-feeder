'use strict';

let registerTwiiterInputDetection = () => {
  document.getElementByID('message').addEventListener('keyup', e => {

    console.log('change detected');

  });
};
