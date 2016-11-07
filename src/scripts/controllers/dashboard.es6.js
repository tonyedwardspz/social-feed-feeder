'use strict';

class DashboardController extends BaseController {
  constructor() {
    super();
    console.log('From Dashboard Controller');
  }

  index(user) {

    app.db.retrieve('/getAllData', user, data => {
      console.log('DASH-User: ' + data.campaigns[0].name);
      var html = app.dashboardView.getDashboard(data.campaigns,
                                                data.campaigns,
                                                data.campaigns);
      this.updateShell(html);
    });


  }
}
