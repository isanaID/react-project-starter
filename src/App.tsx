import {Suspense, lazy, useEffect} from 'react';
import shallow from 'zustand/shallow';
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  useRoutes,
} from 'react-router-dom';

import {useAuth} from 'lib/auth-provider/context';
import {useProfile} from 'lib/auth-provider/context/hooks';

import {FullPageSpinner} from 'common/components';

const FullPageError = lazy(() => import('common/components/full-page-error'));

const LoginModules = lazy(() => import('./modules/login'));
const Home = lazy(() => import('./modules/home'));
const Admin = lazy(() => import('./modules/admin'));
const Company = lazy(() => import('./modules/company'));
const Kiosk = lazy(() => import('./modules/kiosk'));
const Fatmor = lazy(() => import('./modules/fatmor'));

function App(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [getAuth] = useAuth(state => [state.getAuth], shallow);

  const {refetch: getProfile} = useProfile();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [location, navigate]);

  useEffect(() => {
    const currentUser = getAuth();
    if (currentUser.token) {
      getProfile();
    }
  }, [getAuth, getProfile]);

  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route path="/login/*" element={<LoginModules />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/company/*" element={<Company />} />
        <Route path="/kiosk/*" element={<Kiosk />} />
        <Route path="/fatmor/*" element={<Fatmor />} />
      </Routes>
    </Suspense>
  );
}

export default App;
