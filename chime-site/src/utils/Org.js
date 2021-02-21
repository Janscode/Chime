import { auth, db } from '../firebase';

const orgRef = db.collection('organizations');
// TODO: Paginate
export function getUserOrgs() {
  return orgRef
      .where('members', 'array-contains', auth.currentUser.email)
      .get();
}

export function createOrg(Org) {
  return orgRef
      .add({
        ...Org,
      });
};
