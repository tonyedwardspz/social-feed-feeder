'use strict';

/**
* Methods for basic validation. Time allowing, come back and improve or
* replace with a library. This works at a really basic level, fine for my
* personal use of the app
*/

/**
* Checks that the passed elements have had a value entered
* @param {Array.String} elements An array of elements to check.
* @return {Array.String} An array of elements which have failed validation
*/
let inputsHaveValues = (elements) => {
  let emptyInputs = [];

  for (let i = 0; i < elements.length; i++) {
    let input = elements[i];
    if (input.type !== 'submit' && input.type !== 'file' && input.type !== 'hidden') {
      if (input.value.length <= 0) {
        emptyInputs.push(input);
      }
    }
  }

  return emptyInputs;
};

/**
* Highlights errors on the passed form and sets listners to remove errors
* highlighting on change
* @param {Array.String} elements Elements which have errors
* @param {String} form The form which needs errors highlighting
* @param {Array.String} [ids] An heirrarchical array of ids leading to
* @todo  Come back and improve, this makes me feel REALLY dirty!
*/
let highlightErrors = (elements, form) => {
  let isError = false;
  for (let i = 0; i < form.elements.length; i++) {
    for (let j = 0; j < elements.length; j++) {

      if (form.elements[i] === elements[j]) {
        let domElement = document.getElementById(elements[j].name);

        if (domElement.type === 'text' ||
            domElement.type === 'textarea' ||
            domElement.type === 'date' ||
            domElement.type === 'email') {
          domElement.classList.add('invalid');
          app.shell.addEventListener('keyup', e => {
            if (e.target.id === domElement.id && e.target.value.length > 0) {
              domElement.classList.remove('invalid');
            }
          });
        }

        if (domElement.type === 'date') {
          domElement.classList.add('before-today');
          app.shell.addEventListener('click', e => {
            if (e.target.id === domElement.id) {
              domElement.classList.remove('invalid');
              domElement.classList.remove('before-today');
            }
          });
        }
      }
    }
  }
};
