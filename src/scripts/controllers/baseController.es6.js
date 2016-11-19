class BaseController {
  constructor() {

  }

  updateShell(html) {
    clearDOM();
    app.shell.innerHTML = html;
  }
}
