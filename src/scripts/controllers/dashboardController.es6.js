'use strict';

class DashboardController extends BaseController {
  constructor() {
    super();
    console.log('From Dashboard Controller');
  }

  index() {
    var html = app.dashboardView.getDashboard({id:1});
    this.updateShell(html);
  }
}
