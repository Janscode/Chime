import { auth, db } from '../firebase';

const orgRef = db.collection('organizations');

export function createOrg(org) {
  return orgRef
      .add({
        ...org,
      });
};
export function getOrgById(oid) {
  return orgRef
      .doc(oid)
      .get();
}

// TODO: Paginate
export function getUserOrgs() {
  return orgRef
      .where('members', 'array-contains', auth.currentUser.email)
      .get();
}

export function updateOrg(oid, org) {
  return orgRef
      .doc(oid)
      .update({
        ...org,
      });
};
