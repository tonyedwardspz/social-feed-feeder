'use strict';

// TODO: Time allowing.... come back and improve this or replace with validation
// library

let inputsHaveValues = (elements) => {
  let emptyInputs = [];
  console.log(elements);

  for (let i = 0; i < elements.length; i++) {
    let input = elements[i];
    if (input.type !== 'submit') {
      if (input.value.length <= 0) {
        emptyInputs.push(input);
      }
    }
  }

  return emptyInputs;
};

// This is really dirty code! Makes me feel naughty and slightly ashamed....
// TODO: Come back and improve.
let highlightErrors = (elements, form, extraClass = null) => {
  let isError = false;
  for (let i = 0; i < form.elements.length; i++) {
    for (let j = 0; j < elements.length; j++) {
      if (form.elements[i] === elements[j]) {
        let domElement = document.getElementById(elements[j].name);
        domElement.classList.add('invalid');
        if (domElement.type === 'text' ||
            domElement.type === 'textarea' ||
            domElement.type === 'date') {
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
