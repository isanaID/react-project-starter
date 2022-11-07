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

import Filter from '../components/filter';

const LogDashboard = lazy(() => import('../components/log-dashboard'));
const LogTraffic = lazy(() => import('../components/log-traffic'));
const TotalAccess = lazy(() => import('../components/log-access'));

function List(): JSX.Element {
  return (
    <Box>
      <NavBreadcrumb
        items={[
          {text: 'Log', to: '/'},
          {text: 'Log', to: '/log', isCurrentPage: true},
        ]}
      />
        <Filter />
      <Tabs
        isFitted={useBreakpointValue({base: true, md: false})}
        variant="solid-rounded"
        colorScheme="blue"
        my="10"
        isLazy
      >
        <TabList>
          <Tab>Log Dashboard</Tab>
          <Tab>Traffic API</Tab>
          <Tab>Total Access</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <LogDashboard />
          </TabPanel>
          <TabPanel px={0}>
            <LogTraffic />
          </TabPanel>
          <TabPanel px={0}>
            <TotalAccess />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default List;
