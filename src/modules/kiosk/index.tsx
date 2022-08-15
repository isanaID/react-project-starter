import {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import Layout from 'layouts/dashboard';

const Kiosk = lazy(() => import('./views/kiosk'));

function Modules(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Kiosk/>} />
      </Routes>
    </Layout>
  );
}

export default Modules;
