import {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from 'layouts/dashboard';

const Company = lazy(() => import('./views/company'));

function Modules(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Company />} />
      </Routes>
    </Layout>
  );
}

export default Modules;
