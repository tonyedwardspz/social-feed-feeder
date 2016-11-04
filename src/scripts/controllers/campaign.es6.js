'use strict';

class CampaignsController extends BaseController {
  constructor() {
    super();
    console.log('From Campaign Controller');
  }

  /** Shows a list of campaigns */
  index() {
    // Generate the HTML, passing in an array of campaign objects
    var html = app.campaignView.getIndex([
      {'id' : '1', 'name': 'Campaign 1'},{'id':'2', 'name': 'Campaign 2'}
    ]);

    this.updateShell(html);
  }

  /** Shows an indevidual campaign */
  show(id) {
    var html = app.campaignView.show({'id' : id, 'name': 'Campaign 1'});
    this.updateShell(html);
  }

  /** Shows the new campaign screen */
  new() {
    var html = app.campaignView.new();
    this.updateShell(html);
  }

  /** Creates and saves a new campaign */
  create() {

  }

  /** Updates an existing campaign */
  update() {

  }

  /** Deletes an existing campaign */
  delete() {

  }
}
