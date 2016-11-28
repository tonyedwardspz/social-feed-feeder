'use strict';

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

// This is really dirty code!
let highlightErrors = (elements, form) => {
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
          app.shell.addEventListener('click', e => {
            if (e.target.id === domElement.id) {
              domElement.classList.remove('invalid');
            }
          });
        }
      }
    }
  }
};
