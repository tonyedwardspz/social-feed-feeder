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
      highlightErrors(emptyInputs, form);
      return;
    }
    if (form.expiry){
      if (!isDateAfterToday(form.expiry.value)) {
        highlightErrors([form.expiry], form);
        return;
      }
    }

    console.log('Form validated');
    cb();
  }

  updateHistory(view, id = null) {
    console.log('[History] update for view: ' + view);

    let controller = view.split('_')[0];
    let action = view.split('_')[1];

    console.log(controller);
    console.log(action);

    let state = {
      id: id,
      controller: controller,
      action: action
    };

    history.pushState(state, 'Random Page', view);
  }
}
