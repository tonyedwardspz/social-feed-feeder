class CampaignView {
  constructor(){

  }

  getIndex(campaigns) {
    console.log('Campaign View: Get index');
    var campaignHTML = `<h1>Campaign Index<h1>`;

    for(let i = 0; i < campaigns.length; i++) {
      console.log(campaigns[i].id);
      campaignHTML += `<button class='campaign_show' data-id='${campaigns[i].id}'>Campaign ${campaigns[i].name}</button>`;
    }

    campaignHTML += `<button id='campaign_new'>New</button>`;
    console.log(campaignHTML);
    return campaignHTML;
  }

  new() {
    return `<h1>New Campaign<h1>
            <p>This is the new campaign view<p>
            <button id='campaign_index'>Cancel</button>`;
  }

  show(campaign) {
    return `<h1>Show Campaign<h1>
            <p>This is the show campaign view. ID: ${campaign.id}<p>`;
  }

  edit(campaign) {
    return `<h1>Edit Campaign<h1>
            <p>This is the edit campaign view<p>`;
  }
}
