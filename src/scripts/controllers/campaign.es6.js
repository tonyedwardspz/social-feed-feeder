'use strict';

class CampaignController extends BaseController {
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
    console.log('[Camapign Controller] Show: ' + id);

    // Find the requested campaign
    var campaign = Campaign.getByID(id, app.user.campaigns);
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
    let form = document.querySelector('form');

    // validate
    this.validateFormData(form, () => {
      // Disable the save button to prevent duplicate submissions
      document.getElementById('campaign_save').disabled = true;

      let campaign = Campaign.createFromForm(form);

      app.user.campaigns.push(campaign);
      app.db.publish('/campaigns', campaign);

      this.show(campaign.campaignID);
      console.log(campaign);
    });
  }

  /** Displays the edit campaign screen */
  edit(id) {
    let campaign = Campaign.getByID(id, Campaign.getAllCampaigns());
    let html = app.campaignView.edit(campaign);

    this.updateShell(html);
  }

  /** Updates an existing campaign */
  update(id) {
    let campaign = Campaign.getByID(id, Campaign.getAllCampaigns());
    let form = document.querySelector('form');

    campaign.updateFromForm(form);
    app.db.publish(`/campaigns/${id}`, campaign, 'PUT');

    this.show(id);
  }

  /** Deletes an existing campaign */
  delete(id) {
    let name = document.getElementById('name').innerHTML;

    if (! confirm(`Delete the "${name}" campaign and all related data?`)) {
      return;
    }

    Campaign.removeCampaign(id);
    app.db.publish(`/campaigns/${id}`, false, 'DELETE');

    this.index();
  }
}
