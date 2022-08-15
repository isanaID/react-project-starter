import {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from 'layouts/dashboard';

const Fatmor = lazy(() => import('./views/fatmor'));

function Modules(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Fatmor/>} />
      </Routes>
    </Layout>
  );
}

export default Modules;
