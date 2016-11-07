'use strict';

class CampaignsController extends BaseController {
  constructor() {
    super();
    console.log('From Campaign Controller');
  }

  /** Shows a list of campaigns */
  index() {
    // Generate the HTML, passing in an array of campaign objects
    let html = app.campaignView.getIndex([
      {'id' : '1', 'name': 'Campaign 1'},{'id':'2', 'name': 'Campaign 2'}
    ]);

    this.updateShell(html);
  }

  /** Shows an indevidual campaign */
  show(id) {
    let html = app.campaignView.show({'id' : id, 'name': 'Campaign 1'});
    this.updateShell(html);
  }

  /** Shows the new campaign screen */
  new() {
    let html = app.campaignView.new();
    this.updateShell(html);
  }

  /** Creates and saves a new campaign */
  create() {
    let form = document.querySelector('form');
    let campaign = Campaign.createFromForm(form);
    app.db.publish('/campaigns', campaign);
    console.log(campaign);
  }

  /** Updates an existing campaign */
  update() {

  }

  /** Deletes an existing campaign */
  delete() {

  }
}
