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

const RegisterFatmor = lazy(() => import('../components/register-fatmor'));
const Assign = lazy(() => import('../components/assign'))
const UnAssign = lazy(() => import('../components/unassign'))
const DeviceCollections = lazy(() => import('../components/device-collections'))

function List(): JSX.Element {
  return (
    <Box>
      <NavBreadcrumb
        items={[
          {text: 'Device', to: '/'},
          {text: 'Face Recognition', to: '/fatmor', isCurrentPage: true},
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
          <Tab>Register Fatmor</Tab>
          <Tab>Assign</Tab>
          <Tab>UnAssign</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <RegisterFatmor />
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
