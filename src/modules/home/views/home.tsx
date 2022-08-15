import NavBreadcrumb from 'common/components/nav-breadcrumb';

import { Box } from '@chakra-ui/react';

import Homepage from '../components/homepage';

function Home(): JSX.Element {
    return (
        <Box>
            <NavBreadcrumb
            items={[{text: 'Home', to: '/home', isCurrentPage: true}]}
            />
            <Homepage />
        </Box>
    );
}

export default Home;