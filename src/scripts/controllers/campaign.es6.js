/* globals Campaign, BaseController */
 /*exported CampaignsController */
'use strict';

class CampaignsController extends BaseController {
  constructor() {
    super();
  }

  /** Shows a list of campaigns */
  index() {
    // Generate the HTML, passing in an array of campaign objects
    let campaigns = Campaign.getAllCampaigns();

    let html = app.campaignView.getIndex(campaigns);

    this.updateShell(html);
  }

  /** Shows an individual campaign */
  show(id) {
    console.log(id);
    // find the campaign by ID
    var campaign = Campaign.getByID(id, app.user.campaigns);
    console.log(campaign);

    let html = app.campaignView.show(campaign);
    this.updateShell(html);
  }

  /** Shows the new campaign screen */
  new() {
    let html = app.campaignView.new();
    this.updateShell(html);
  }

  /** Creates and saves a new campaign */
  create() {
    // disable the save button to prevent duplicate submissions
    document.getElementById('campaign_save').disabled = true;

    let form = document.querySelector('form');
    let campaign = Campaign.createFromForm(form);
    app.db.publish('/campaigns', campaign);

    window.location = '?campaigns';
    console.log(campaign);
  }

  /** Updates an existing campaign */
  update() {

  }

  /** Deletes an existing campaign */
  delete() {

  }
}
