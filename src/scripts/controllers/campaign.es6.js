'use strict';

class CampaignController extends BaseController {
  constructor() {
    super();
  }

  /** Shows a list of campaigns */
  index(updateHistory = true) {
    // Generate the HTML, passing in an array of campaign objects
    let campaigns = Campaign.getAllCampaigns();
    let html = app.campaignView.getIndex(campaigns);

    this.updateShell(html);
    this.updateHistory('campaign_index', updateHistory);

  }

  /** Shows an individual campaign */
  show(id, updateHistory = true) {
    console.log('[Camapign Controller] Show: ' + id);

    // Find the requested campaign
    var campaign = Campaign.getByID(id, app.user.campaigns);
    let html = app.campaignView.show(campaign);

    this.updateShell(html);
    this.updateHistory('campaign_show', updateHistory, id);
  }

  /** Shows the new campaign screen */
  new(updateHistory = true) {
    let html = app.campaignView.new();

    this.updateShell(html);
    this.updateHistory('campaign_new', updateHistory);
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
  edit(id, updateHistory = true) {
    let campaign = Campaign.getByID(id, Campaign.getAllCampaigns());
    let html = app.campaignView.edit(campaign);

    this.updateShell(html);
    this.updateHistory('campaign_edit', updateHistory, id);
  }

  /** Updates an existing campaign */
  update(id) {
    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      let campaign = Campaign.getByID(id, Campaign.getAllCampaigns());

      campaign.updateFromForm(form);
      app.db.publish(`/campaigns/${id}`, campaign, 'PUT');

      this.show(id);
    });
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
