import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Campaign.scss';
import CampaignDetails from './CampaignDetails/CampaignDetails';
import CampaignHome from './CampaignHome/CampaignHome';
import CampaignNew from './CampaignNew/CampaignNew';
import NewQuestion from './NewQuestion/NewQuestion';

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
      <Route path="/campaigns/:campaignId/add-question" exact>
        <NewQuestion></NewQuestion>
      </Route>
    </Switch>
  );
}

export default Campaign;

