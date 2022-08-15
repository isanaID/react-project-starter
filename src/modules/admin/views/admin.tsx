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
const RegisterAdmin = lazy(() => import('../components/register-admin'));

function List(): JSX.Element {
  return (
    <Box>
      <NavBreadcrumb
        items={[
          {text: 'Admin', to: '/'},
          {text: 'Admin', to: '/admin', isCurrentPage: true},
        ]}
      />
      <Tabs
        isFitted={useBreakpointValue({base: true, md: false})}
        variant="solid-rounded"
        colorScheme="blue"
        my="10"
        isLazy
      >
        <TabList>
          <Tab>Admin list</Tab>
          <Tab>Register Admin</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <AdminCollections />
          </TabPanel>
          <TabPanel px={0}>
            <RegisterAdmin />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default List;
