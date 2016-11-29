'use strict';

/** A base class for other controllers to inherit from */
class BaseController {
  constructor() {

  }

  /** Removes content from the application shell*/
  clearDOM() {
    app.shell.innerHTML = '';
  }

  /**
  * Updates the application shell with the passed HTML string
  * @param {String} html The html representing the current view
  */
  updateShell(html) {
    this.clearDOM();
    app.shell.innerHTML = html;
  }

  /**
  * Provides basic validation for forms. Checks that inputs are not empty and
  * that dates entered are in the future. Returns without running the call backup
  * function if validation fails
  * @callback cb
  * @param {String} form HTML object represnting the currently used form
  * @return if errors found to prevent further execution
  */
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

  /**
  * Updates the browser history whenever a visible view is changed. Does not
  * update if the back button is pressed, which would prevent further backwards
  * navigation
  * @param {String} view Represents the controller/action currently viewed
  * @param {Boolean} [updateHistory=true] Whether to actually update history
  * @param {String} [id=null] The id of the currently viewed object
  */
  updateHistory(view, updateHistory = true, id = null) {
    if (updateHistory) {
      try{
        console.log('[History] update for view: ' + view);
        updateBrowserHistory(view, id);
      } catch (error) {
        console.warn('There was an error updating the browsers history', error);
      }
    }
  }
}
