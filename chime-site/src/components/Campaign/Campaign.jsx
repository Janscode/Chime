import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { campaign } from '../../sample-data/campaign';
import './Campaign.scss';
// import { Container, Row } from 'react-bootstrap';
import { useCampaign } from '../../contexts/CampaignContext';
import CampaignDetails from './CampaignDetails/CampaignDetails';
import CampaignHome from './CampaignHome/CampaignHome';
import CampaignNew from './CampaignNew/CampaignNew';

function Campaign() {
  const { getCampaigns } = useCampaign();

  getCampaigns()
      .then((docs) => {
        if (docs !== null) {
          if (docs.empty) {
            console.log('No docs');
          } else {
            docs.forEach((doc) => {
              console.log(doc.data());
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <Switch>
      <Route path="/campaigns/home" exact>
        <CampaignHome />
      </Route>
      <Route path="/campaigns/new" exact>
        <CampaignNew />
      </Route>
      <Route path="*">
        <CampaignDetails></CampaignDetails>
      </Route>
    </Switch>
  );
}

export default Campaign;

