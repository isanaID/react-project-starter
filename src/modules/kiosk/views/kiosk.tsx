import {lazy} from 'react';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from '@chakra-ui/react';

import NavBreadcrumb from 'common/components/nav-breadcrumb';

const RegisterKiosk = lazy(() => import('../components/register-kiosk'));
const Assign = lazy(() => import('../components/assign'))
const UnAssign = lazy(() => import('../components/unassign'))
const DeviceCollections = lazy(() => import('../components/device-collections'))

function List(): JSX.Element {
  return (
    <Box>
      <NavBreadcrumb
        items={[
          {text: 'Device', to: '/'},
          {text: 'Health Kiosk', to: '/kiosk', isCurrentPage: true},
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
          <Tab>Register Kiosk</Tab>
          <Tab>Assign</Tab>
          <Tab>UnAssign</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <RegisterKiosk />
            <DeviceCollections />
          </TabPanel>
          <TabPanel px={0}>
            <Assign />
          </TabPanel>
          <TabPanel px={0}>
            <UnAssign />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default List;
