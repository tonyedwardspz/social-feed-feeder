class CampaignView {
  constructor(){

  }

  getIndex(campaigns) {
    console.log('Campaign View: Get index');
    var campaignHTML = `<h1>Campaign Index<h1>`;

    for(let i = 0; i < campaigns.length; i++) {
      console.log(campaigns[i].id);
      campaignHTML += `<button>Campaign ${campaigns[i].name}</button>`;
    }

    campaignHTML += `<button class='new'>New</button>`;
    console.log(campaignHTML);
    return campaignHTML;
  }

  getNew(campaign) {
    return `<h1>New Campaign<h1>
            <p>This is the new campaign view<p>`;
  }

  show(campaign) {
    return `<h1>Show Campaign<h1>
            <p>This is the show campaign view<p>`;
  }

  edit(campaign) {
    return `<h1>Edit Campaign<h1>
            <p>This is the edit campaign view<p>`;
  }
}
