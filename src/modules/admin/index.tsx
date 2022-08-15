import {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from 'layouts/dashboard';

const Admin = lazy(() => import('./views/admin'));

function Modules(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </Layout>
  );
}

export default Modules;
