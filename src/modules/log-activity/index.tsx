import {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from 'layouts/dashboard';

const Log = lazy(() => import('./views'));

function Modules(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Log/>} />
      </Routes>
    </Layout>
  );
}

export default Modules;
