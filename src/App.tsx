import {Suspense, lazy, useEffect} from 'react';
import shallow from 'zustand/shallow';
import {useLocation, useNavigate} from 'react-router-dom';

import {FullPageSpinner} from './common/components/full-page-spinner';

import {useAuth} from './lib/auth-provider/context';

const LoginModules = lazy(() => import('./modules/login'));

function SecretPage({children}: {children: JSX.Element}): JSX.Element {
  const navigate = useNavigate();
  const [getAuth] = useAuth(state => [state.getAuth], shallow);

  useEffect(() => {
    const currentUser = getAuth();
    if (!currentUser.token) {
      navigate('/login');
    }
  }, [getAuth, navigate]);

  return children;
}

function App(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login');
    }
  }, [location, navigate]);
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <LoginModules />
    </Suspense>
  );
}

export default App;
