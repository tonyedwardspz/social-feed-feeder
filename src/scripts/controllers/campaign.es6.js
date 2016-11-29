'use strict';

/** A class to control campaign actions */
class CampaignController extends BaseController {
  constructor() {
    super();
  }

  /**
  * Displays the users campaigns
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  index(updateHistory = true) {
    console.log('[Camapign Controller] Index');

    // Generate the HTML, passing in an array of campaign objects
    let campaigns = Campaign.getAllCampaigns();
    let html = app.campaignView.getIndex(campaigns);

    this.updateShell(html);
    this.updateHistory('campaign_index', updateHistory);
  }

  /**
  * Displays an individual camapign
  * @param {String} id The id of the campaign to show
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  show(id, updateHistory = true) {
    console.log('[Camapign Controller] Show: ' + id);

    // Find the requested campaign
    var campaign = Campaign.getByID(id, app.user.campaigns);
    let html = app.campaignView.show(campaign);

    this.updateShell(html);
    this.updateHistory('campaign_show', updateHistory, id);
  }

  /**
  * Displays the new campaign form
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  new(updateHistory = true) {
    console.log('[Camapign Controller] New');
    let html = app.campaignView.new();

    this.updateShell(html);
    this.updateHistory('campaign_new', updateHistory);
  }

  /**
  * Creates a new campaign, saving it both locally and remotley after validation.
  * Called from the new campaign view
  */
  create() {
    console.log('[Camapign Controller] Create');

    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      document.getElementById('campaign_save').disabled = true;

      let campaign = Campaign.createFromForm(form);

      app.user.campaigns.push(campaign);
      app.db.publish('/campaigns', campaign);

      this.show(campaign.campaignID);
    });
  }

  /**
  * Displays the edit camapign view
  * @param {String} id The id of the campaign to edit
  * @param {Boolean} [updateHistory=true] Whether to update the history object
  */
  edit(id, updateHistory = true) {
    console.log('[Camapign Controller] Edit: ' + id);
    let campaign = Campaign.getByID(id, Campaign.getAllCampaigns());
    let html = app.campaignView.edit(campaign);

    this.updateShell(html);
    this.updateHistory('campaign_edit', updateHistory, id);
  }

  /**
  * Updates a campaign, saving it locally and remotely.
  * Called from the edit view
  * @param {String} id The id of the campaign to be deleted
  */
  update(id) {
    console.log('[Camapign Controller] Update: ' + id);

    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      let campaign = Campaign.getByID(id, Campaign.getAllCampaigns());

      campaign.updateFromForm(form);
      app.db.publish(`/campaigns/${id}`, campaign, 'PUT');

      this.show(id);
    });
  }

  /**
  * Deletes a campaign both locally and remotely after user confirmation.
  * @param {String} id The id of the campaign to be deleted
  */
  delete(id) {
    console.log('[Camapign Controller] Delete: ' + id);

    let name = document.getElementById('name').innerHTML;

    if (! confirm(`Delete the "${name}" campaign and all related data?`)) {
      return;
    }

    Campaign.removeCampaign(id);
    app.db.publish(`/campaigns/${id}`, false, 'DELETE');

    this.index();
  }
}
