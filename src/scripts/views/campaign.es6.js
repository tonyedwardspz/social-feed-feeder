class CampaignView {
  constructor(){

  }

  getIndex(campaigns) {
    console.log('Campaign View: Get index');
    var campaignHTML = `<h1>Campaign Index<h1>`;

    for(let i = 0; i < campaigns.length; i++) {
      campaignHTML += `<button class='campaign_show' data-id='${campaigns[i].campaignID}'>Campaign ${campaigns[i].name}</button>`;
    }

    campaignHTML += `<button id='campaign_new'>New</button>`;
    return campaignHTML;
  }

  new() {
    return `<h1>New Campaign<h1>
            <p>This is the new campaign view<p>
            <form name='form_campaign_new'>
            <label for='name'>Campaign Name</label>
            <input name='name' id='name'/>

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
    return `<h1>Show Campaign<h1>
            <p>This is the show campaign view. ID: ${campaign.campaignID}<p>
            <p>Name: ${campaign.name}</p>`;

  }

  edit(campaign) {
    return `<h1>Edit Campaign<h1>
            <p>This is the edit campaign view<p>`;
  }
}
