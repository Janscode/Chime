import React, { useContext } from 'react';
import { auth, db } from '../firebase';
import PropTypes from 'prop-types';

const CampaignContext = React.createContext();

export function useCampaign() {
  return useContext(CampaignContext);
}

export function CampaignProvider({ children }) {
  const campaignsRef = db.collection('campaigns');
  // TODO: Refactor this into its own context
  const usersRef = db.collection('users');

  /**
   * Creates a new document in the campaigns collection.
   * @param {string} name name of the new campaign
   * @param {string} collabName identifier the collaborators use on their surveys. i.e. 'HR'
   * @param {string[]} owners list of ids for the owners of teh campaign
   * @param {string[]} recipients list of ids for the people who will recieve this survey
   * @return {Promise} document reference pointing to the new document
   */
  function addCampaign(name, collabName, owners = [], recipients = []) {
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

  function getCampaignById(id) {
    return campaignsRef
        .doc(id)
        .get();
  }

  function getCampaignsForCurrUser() {
    if (auth.currentUser) {
      return campaignsRef
          .where('collaborators', 'array-contains', String(auth.currentUser.uid))
          .get();
    } else {
      return null;
    }
  }

  function getCampaignQuestions(campaignId) {
    return campaignsRef
        .doc(campaignId)
        .collection('questions')
        .get();
  }

  function getUserByEmail(email) {
    return usersRef
        .where('email', '==', email)
        .limit(1)
        .get();
  }

  function getUserById(id) {
    return usersRef
        .where('uid', '==', id)
        .limit(1)
        .get();
  }

  const value = {
    addCampaign,
    addQuestionToCampaign,
    getCampaignById,
    getCampaignsForCurrUser,
    getCampaignQuestions,
    getUserByEmail,
    getUserById,
  };

  return (
    <CampaignContext.Provider value={value}>
      { children}
    </CampaignContext.Provider>
  );
}

CampaignProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
