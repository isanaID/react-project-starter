import shallow from 'zustand/shallow';
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
import {formatDateTime} from 'lib/helper/helper';

import {useLogState} from '../context';
import {useLogTraffic} from '../context/hooks';

function LogTraffic(): JSX.Element {
    const LIMIT = 10;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const [dateRange] = useLogState(
        state => [state.dateRange],
        shallow,
      );

    const {
        status,
        data: response,
        errorMessage,
        refetch,
    } = useLogTraffic({
        page,
        search,
        limit: LIMIT,
        dateRange,
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
        dateRange,
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
                Header: 'User',
                accessor: 'fullname',
              },
              {
                Header: 'Company',
                accessor: 'companyName',
              },
              {
                Header: 'Date Time',
                accessor: (row: any): string =>
                  row?.createdAt === null ? '-' : formatDateTime(row?.createdAt),
              },
              {
                Header: 'Request',
                accessor: 'request',
              },
              {
                Header: 'Response Code',
                accessor: 'responseCode',
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
          {/* <Flex direction="row" justify="start" align="start">
            <Text
              hidden={useBreakpointValue({base: true, md: false})}
              fontSize="sm"
              lineHeight={5}
              color="gray.500"
            >
              ADMIN LIST
            </Text>
          </Flex> */}
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

export default LogTraffic;