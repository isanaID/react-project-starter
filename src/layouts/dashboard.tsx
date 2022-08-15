import SecretPage from 'common/components/secret-page';

import {App} from './components/app';

function BasicLayout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <SecretPage>
      <App>{children}</App>
    </SecretPage>
  );
}

export default BasicLayout;
