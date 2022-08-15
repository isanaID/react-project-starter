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

const CompanyCollections = lazy(() => import('../components/company-collections'));
const RegisterCompany = lazy(() => import('../components/register-company'));

function List(): JSX.Element {
  return (
    <Box>
      <NavBreadcrumb
        items={[
          {text: 'User', to: '/'},
          {text: 'Patient', to: '/patient', isCurrentPage: true},
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
          <Tab>Company list</Tab>
          <Tab>Register Company</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <CompanyCollections />
          </TabPanel>
          <TabPanel px={0}>
            <RegisterCompany />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default List;
