import React from 'react';
import PropTypes from 'prop-types';

function CampaignCard({ campaign }) {
  return (
    <div>
      {JSON.stringify(campaign)}
    </div>
  );
}

CampaignCard.propTypes = {
  campaign: PropTypes.object,
};

export default CampaignCard;
