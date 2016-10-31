class BaseController {
  constructor() {
    console.log('Base Controller');
  }

  updateShell(html) {
    clearDOM();
    app.shell.innerHTML = html;
  }
}
