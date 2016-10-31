'use strict';

class CampaignsController extends BaseController {
  constructor() {
    super();
    console.log('From Campaign Controller');
  }

  /** Shows a list of campaigns */
  index() {
    // Generate the HTML, passing in an array of campaign objects
    var campaignIndexHTML = app.campaignView.getIndex([
      {'id' : '1', 'name': 'Campaign 1'},{'id':'2', 'name': 'Campaign 2'}
    ]);

    this.updateShell(campaignIndexHTML);
  }

  /** Shows an indevidual campaign */
  show(id) {

  }

  /** Shows the new campaign screen */
  new() {

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
