import {useEffect, useState, useMemo} from 'react';
import {SearchIcon} from '@chakra-ui/icons';
import {
  Box,
  Text,
  Flex,
  useBreakpointValue,
  Badge,
  InputGroup,
  Input,
  InputLeftElement,
  Link,
  Image,
} from '@chakra-ui/react';

import {DataTable, Pagination, ErrorAlert} from 'common/components';

import {useListAdmin} from '../context/hooks';

function AdminCollections(): JSX.Element {
    const LIMIT = 10;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const {
        status,
        data: response,
        errorMessage,
        refetch,
    } = useListAdmin({
        page,
        search,
        limit: LIMIT,
    });

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>,
      ): void => {
        const {value} = event.target;
        setPage(1);
        setSearch(value);
      };

      useEffect(() => {
        refetch();
      }, [
        page,
        search,
        refetch,
        ]);

    const columns = useMemo(
        () => [
              {
                Header: 'No',
                id: 'no',
                accessor: (row: any, index: number): number => index + 1,
              },
              {
                Header: 'Name',
                accessor: 'fullname',
              },
              {
                Header: 'Role',
                accessor: 'role',
              },
              {
                Header: 'Email',
                accessor: 'email',
              },
              {
                Header: 'Company Name',
                accessor: (row: any): string => row.companyId?.name,
              },
              {
                Header: 'Company Web',
                accessor: (row: any): string => row.companyId?.website,
              },
            ],
            [],
          );

    return (
        <Box>
      <Box
        borderColor="gray.200"
        borderWidth="1px"
        px={6}
        borderRadius="12px"
        height="100%"
      >
        <Flex
          direction={{base: 'column', md: 'row'}}
          justify="space-between"
          align="end"
          my={5}
        >
          <Flex direction="row" justify="start" align="start">
            <Text
              hidden={useBreakpointValue({base: true, md: false})}
              fontSize="sm"
              lineHeight={5}
              color="gray.500"
            >
              ADMIN LIST
            </Text>
          </Flex>
          <InputGroup maxW={{base: '100%', md: '320px'}}>
            <InputLeftElement>
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              onChange={handleSearchChange}
              value={search}
              type="search"
              placeholder="Search"
            />
          </InputGroup>
        </Flex>
        {status !== 'error' && (
          <>
            <DataTable
              isLoaded={status === 'success'}
              columns={columns}
              data={response?.data?.docs || []}
            />

            {status === 'success' && (
              <Pagination
                currentPage={page}
                pageCount={response?.data.totalPages || 0}
                totalItems={response?.data.totalDocs || 0}
                perPage={response?.data.limit || 0}
                maxVisible={3}
                gotoPage={p => {
                  setPage(p);
                }}
                previousPage={() => {
                  setPage(p => p - 1);
                }}
                nextPage={() => {
                  setPage(p => p + 1);
                }}
              />
            )}
          </>
        )}
        {status === 'error' && (
          <ErrorAlert message={errorMessage} onRetry={refetch} />
        )}
      </Box>
    </Box>
    )
}

export default AdminCollections;