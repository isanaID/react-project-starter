import {lazy} from 'react';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
  Text
} from '@chakra-ui/react';

import NavBreadcrumb from 'common/components/nav-breadcrumb';

const AdminCollections = lazy(() => import('../components/admin-collections'));

function Detail(): JSX.Element {
  return (
    <Box>
      <NavBreadcrumb
        items={[
          {text: 'Company', to: '/company'},
          {text: 'Detail', to: '#', isCurrentPage: true},
        ]}
      />
        <AdminCollections />
    </Box>
  );
}

export default Detail;
