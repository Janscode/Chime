import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Campaign.scss';
import CampaignDetails from './CampaignDetails/CampaignDetails';
import CampaignHome from './CampaignHome/CampaignHome';
import CampaignNew from './CampaignNew/CampaignNew';
import ManageQuestion from './ManageQuestion/ManageQuestion';

function Campaign() {
  return (
    <Switch>
      <Route path="/campaigns/home" exact>
        <CampaignHome />
      </Route>
      <Route path="/campaigns/new" exact>
        <CampaignNew />
      </Route>
      <Route path="/campaigns/:campaignId" exact>
        <CampaignDetails></CampaignDetails>
      </Route>
      <Route path="/campaigns/:campaignId/question/:qid" exact>
        <ManageQuestion></ManageQuestion>
      </Route>
    </Switch>
  );
}

export default Campaign;

