import React, { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { getUserOrgs } from '../../utils/Org';
import Loading from '../Loading/Loading';
import OrgHome from './OrgHome/OrgHome';
import { Route } from 'react-router-dom';
import OrgManage from './OrgManage/OrgManage';

function Organization() {
  const [docs, setDocs] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(async () => {
    let mount = true;

    try {
      const d = await getUserOrgs();
      if (mount) {
        setDocs(d);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    return () => {
      mount = false;
    };
  }, []);

  if (!loading) {
    return (
      <Container className="p-3">
        {error && <Alert variant="danger">{error}</Alert>}
        <Route path="/organizations" exact>
          <OrgHome docs={docs} />
        </Route>
        <Route path="/organizations/:orgId">
          <OrgManage />
        </Route>
      </Container>
    );
  } else {
    return <Loading />;
  }
}

export default Organization;
