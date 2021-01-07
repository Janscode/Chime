import React, { useContext } from 'react';
import { auth, db } from '../firebase';
import PropTypes from 'prop-types';

const CampaignContext = React.createContext();

export function useCampaign() {
  return useContext(CampaignContext);
}

export function CampaignProvider({ children }) {
  const campaignsRef = db.collection('campaigns');

  function getCampaignsForCurrUser() {
    if (auth.currentUser) {
      return campaignsRef
          .where('collaborators', 'array-contains', String(auth.currentUser.uid))
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
          active: true,
          name: name,
          collaborators: owners,
          collabName: collabName,
          recipients: recipients,
          lastModified: new Date(),
          questions: [],
        });
  }

  function getCampaignById(id) {
    return campaignsRef
        .doc(id)
        .get();
  }

  function addQuestionToCampaign(campaignId, text, type, author = '', options = []) {
    return campaignsRef
        .doc(campaignId)
        .collection('questions')
        .add({
          active: true,
          author: author,
          lastModified: new Date(),
          text: text,
          type: type,
          options: options,
        });
  }

  function getCampaignQuestions(campaignId) {
    return campaignsRef
        .doc(campaignId)
        .collection('questions')
        .get();
  }

  const value = {
    getCampaignsForCurrUser,
    getCampaignById,
    getCampaignQuestions,
    addCampaign,
    addQuestionToCampaign,
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
