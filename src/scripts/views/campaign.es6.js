'use strict';

/** Class representing a campaigns Views */
class CampaignView {
  constructor(){

  }

  /**
  * Returns HTML for the 'campaign index' screen
  * @param {Array.<Campaign>} campaigns An array of campaign objects
  * @return {String} The HTML string for display
  */
  getIndex(campaigns) {
    console.log('Campaign View: Get index');
    let campaignHTML = `${getBreadcrumbs('campaign_index')}
                        <h2>Your Campaigns</h2>`;

    campaignHTML += `<div class="row">
                       <div class='column'>
                         <button id='campaign_new'>Add New Campaign</button>
                       </div>
                     </div>
                     <div class="row">
                        <div class='column'>
                          <hr />
                        </div>
                     </div>
                     <div class="row">
                    `;

    for(let i = 1; i < campaigns.length + 1; i++) {
      campaignHTML += `<div class="column">
                         <p>${campaigns[i -1].name}</p>
                         <p>${campaigns[i -1].description}</p>
                         <button class='campaign_show' data-id='${campaigns[i -1].campaignID}'>View Campaign</button>
                       </div>
                      `;
      if (i % 3 === 0) {
        campaignHTML += `</div><div class="row>"`;
      }
    }

    campaignHTML += `<hr /></div></div>`;

    return campaignHTML;
  }

  /**
  * Returns HTML for the 'new campaign' screen
  * @param {Campaign} [campaign] A campaign object
  * @return {String} The HTML string for display
  */
  new() {
    return `${getBreadcrumbs('campaign_new')}
            <h1>New Campaign</h1>
            <p>Create a new campaign<p>
            ${this.form()}
            `;
  }

  /**
  * Returns HTML for the 'new campaign' screen. If no campaign is passed an
  * empty object is generated.
  * @param {Campaign} [campaign] A campaign object
  * @return {String} The HTML string for display
  */
  form(campaign = new Campaign()) {
    let exists = campaign.name !== undefined ? true : false;
    let html = `<form name='form_campaign_new'>
                <label for='name'>Campaign Name</label>
                <input name='name' id='name' type="text"
                       value="${exists ? campaign.name : ''}"
                       />

                <label for='description'>Description</label>
                <textarea name='description'
                 id='description'>${exists ? campaign.description : ''}</textarea>

                <label for='expiry'>Expiry Date</label>
                <input name='expiry' id='expiry' type='date'
                 value="${exists ? convertDateForInput(campaign.expiry) : ''}"/>

                <label for='dailyPosts'>Daily Posts</label>
                <input name='dailyPosts' id='dailyPosts' type='number' min='0'
                       max='10' value='${exists ? campaign.dailyPosts : 1}'/>

                <button id="${!exists ? 'campaign_save' : 'campaign_save_edit'}"
                        data-id="${campaign.campaignID}">Save</button>
                <button id="${!exists ? 'campaign_index' : ''}"
                        class="${exists ? 'campaign_show' : ''}"
                        data-id="${campaign.campaignID}">Cancel</button>
                </form>
              `;
    return html;
  }

  /**
  * Returns HTML for the 'show campaign' screen
  * @param {Campaign} campaign A Campaign object to generate html for
  * @return {String} The HTML string for display
  */
  show(campaign) {
    let date = convertDateToLocale(campaign.expiry);
    return `${getBreadcrumbs('campaign_show')}
            <h2 id="name">${campaign.name}</h2>
            <p>${campaign.description}</p>
            <div class="row">
              <div class="column">
                <span>${campaign.dailyPosts}</span>
                <span>Daily Posts</span>
              </div>
              <div class="column">
                <span>${date}</span>
                <span>Expiry</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <button id="campaign_edit" data-campaignid="${campaign.campaignID}">Edit Campaign</button>
                <button id="campaign_delete" data-campaignid="${campaign.campaignID}">Delete Campaign</button>
                <button id="bucket_new" data-campaignid="${campaign.campaignID}">Add Bucket</button>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <h3>Campaign Buckets</h3>
              </div>
            </div>
            ${app.bucketView.bucketList(campaign.buckets)}
            `;

  }

  /**
  * Returns HTML for the 'edit campaign' screen
  * @param {Campaign} campaign - A Campaign object to generate html for
  * @return {String} The HTML string for display
  */
  edit(campaign) {
    return `${getBreadcrumbs('campaign_edit')}
            <h2>Edit: ${campaign.name} campaign</h2>
            <p>Update campaign details<p>
            ${this.form(campaign)}`;
  }
}
