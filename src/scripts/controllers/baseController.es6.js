'use strict';

class BaseController {
  constructor() {

  }

  updateShell(html) {
    clearDOM();
    app.shell.innerHTML = html;
  }

  // provides REALLY basic form validation
  validateFormData(form, cb) {
    let emptyInputs = inputsHaveValues(form.elements);
    if (emptyInputs.length >= 1) {
      // alert('Empty Inputs');
      highlightErrors(emptyInputs, form);
      return;
    }
    cb();
  }
}
