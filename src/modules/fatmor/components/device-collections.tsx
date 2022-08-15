import {useEffect, useState, lazy, useMemo} from 'react';
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
  Icon,
  HStack,
  Button,
  Image,
  useDisclosure,
} from '@chakra-ui/react';

import {DataTable, Pagination, ErrorAlert} from 'common/components';
import {BiTrashAlt} from 'react-icons/bi';

import {useListDevice} from '../context/hooks';

const DialogDelete = lazy(() => import('./dialog-delete'));

function Actions({
  rows,
  onOpenDialogDeleteDevice,
}: {
  rows: any;
  onOpenDialogDeleteDevice: (device: any) => void;
}): JSX.Element {
  const {
    row: {original},
  } = rows;
  return (
    <HStack gap={1}>
      <Button
        size="xs"
        variant="outline"
        onClick={() => onOpenDialogDeleteDevice(original)}
      >
        <Icon as={BiTrashAlt} color="red.600" />
      </Button>
    </HStack>
  );
}

function DeviceCollections(): JSX.Element {
    const LIMIT = 10;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedDevice, setSelectedDevice] = useState(null);

    const {
        status,
        data: response,
        errorMessage,
        refetch,
    } = useListDevice({
        page,
        search,
        limit: LIMIT,
    });

    const {
      isOpen: isOpenDialogDelete,
      onOpen: onOpenDialogDelete,
      onClose: onCloseDialogDelete,
    } = useDisclosure();

    const onOpenDialogDeleteDevice = (device: any): void => {
      setSelectedDevice(device);
      onOpenDialogDelete();
    };

    const onCloseDialog = (): void => {
      setSelectedDevice(null);
      onCloseDialogDelete();
    };

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
                Header: 'Device Name',
                accessor: 'name',
              },
              /* eslint no-underscore-dangle: 0 */
              {
                Header: 'Device ID',
                accessor: (row: any): string => row?._id,
              },
              {
                Header: 'ASSIGN TO',
                accessor: (row: any): string => row?.companyId?.name,
              },
              {
                Header: 'IMEI',
                accessor: 'imei',
              },
              {
                Header: 'Mac Address',
                accessor: 'macAddress',
              },
              {
                Header: 'Location',
                accessor: 'address',
              },
              {
                Header: 'Actions',
                // eslint-disable-next-line react/no-unstable-nested-components
                Cell: (rows: any) => (
                  <Actions
                    rows={rows}
                    onOpenDialogDeleteDevice={onOpenDialogDeleteDevice}
                  />
                ),
              },
            ],
            [],
          );

    return (
        <Box mt={2}>
          {isOpenDialogDelete && (
          <DialogDelete
            selectedDevice={selectedDevice}
            isOpen={isOpenDialogDelete}
            onClose={onCloseDialog}
          />
        )}
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
              DEVICE LIST
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

export default DeviceCollections;