import {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from 'layouts/dashboard';

const Detail = lazy(() => import('./views/detail'));

function Modules(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Detail />} />
      </Routes>
    </Layout>
  );
}

export default Modules;
