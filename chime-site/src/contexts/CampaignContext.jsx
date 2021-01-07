import React, { useContext } from 'react';
import { auth, db } from '../firebase';
import PropTypes from 'prop-types';

const CampaignContext = React.createContext();

export function useCampaign() {
  return useContext(CampaignContext);
}

export function CampaignProvider({ children }) {
  const campaignsRef = db.collection('campaigns');

  function getCampaigns() {
    if (auth.currentUser) {
      return campaignsRef
          .where('owners', 'array-contains', String(auth.currentUser.uid))
          .get();
    } else {
      return null;
    }
  }

  /**
   * Creates a new document in the campaigns collection.
   * @param {string} name name of the new campaign
   * @param {string[]} owners list of ids for the owners of teh campaign
   * @param {string} collabName identifier the collaborators use on their surveys. i.e. 'HR'
   * @param {string[]} recipients list of ids for the people who will recieve this survey
   * @return {Promise} document reference pointing to the new document
   */
  function addCampaign(name, owners, collabName, recipients) {
    return campaignsRef
        .add({
          name: name,
          collaborators: owners,
          collabName: collabName,
          recipients: recipients,
          lastModified: new Date(),
        });
  }

  const value = {
    getCampaigns,
    addCampaign,
  };

  return (
    <CampaignContext.Provider value={value}>
      { children }
    </CampaignContext.Provider>
  );
}

CampaignProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
