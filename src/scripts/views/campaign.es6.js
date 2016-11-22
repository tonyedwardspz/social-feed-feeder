class CampaignView {
  constructor(){

  }

  getIndex(campaigns) {
    console.log('Campaign View: Get index');
    var campaignHTML = `<h2>Your Campaigns</h2>`;

    campaignHTML += `<div class="row">
                       <div class='column'>
                         <button id='campaign_new'>New Campaign</button>
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
      campaignHTML += `<div class="column column-33">
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

  new() {
    return `<h1>New Campaign</h1>
            <p>This is the new campaign view<p>
            <form name='form_campaign_new'>
            <label for='name'>Campaign Name</label>
            <input name='name' id='name' type="text"/>

            <label for='description'>Description</label>
            <textarea name='description' id='description'></textarea>

            <label for='expiry'>Expiry Date</label>
            <input name='expiry' id='expiry' type='date' />

            <label for='dailyPosts'>Daily Posts</label>
            <input name='dailyPosts' id='dailyPosts' type='number' min='0' max='10'/>

            <button id='campaign_save'>Save</button>
            <button id='campaign_index'>Cancel</button>
            </form>`;
  }

  show(campaign) {
    let date = convertDateToLocale(campaign.expiry);
    return `<h2 id="name">${campaign.name}</h2>
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

  edit(campaign) {
    return `<h1>Edit Campaign</h1>
            <p>This is the edit campaign view<p>
            <p>${campaign.name}</p>`;
  }
}
