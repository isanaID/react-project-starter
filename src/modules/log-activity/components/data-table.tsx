import {useState, lazy, Suspense} from 'react';

import {
    Box,
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    HStack,
    VStack,
    Image,
    Text,
    useDisclosure,
  } from '@chakra-ui/react';
  import shallow from 'zustand/shallow';

  import {useTable} from 'react-table';
  
  import networkImage from 'assets/images/network.svg';
  import {
    DialogFallback,
  } from 'common/components';
  import TableSkeleton from 'common/components/table-skeleton';

  import {useLogState} from '../context';

  const DialogDetail = lazy(() => import('./dialog-detail'));
  
  function DataTable({
    columns, 
    data,
    isLoaded = false,
    ...props
  }: {
    columns: any;
    data: any;
    isLoaded?: boolean;
    [key: string]: any;
  }): JSX.Element {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
      useTable({columns, data});

      const [adminId, setAdminId] = useState<any>(null);
      const [companyName, setCompanyName] = useState<any>(null);

      const {
        isOpen: isOpenDialogDetail,
        onOpen: onOpenDialogDetail,
        onClose: onCloseDialogDetail,
      } = useDisclosure();

      const onOpenDialog = (admin: any, name:any): void => {
        setAdminId(admin);
        setCompanyName(name);
        onOpenDialogDetail();
      };

      const onCloseDialog = (): void => {
        setAdminId(null);
        setCompanyName(null);
        onCloseDialogDetail();
      };

  
    return (
      <Box {...props}>
        <Suspense fallback={<DialogFallback />}>
        {isOpenDialogDetail && (
          <DialogDetail
            adminId={adminId}
            companyName={companyName}
            isOpen={isOpenDialogDetail}
            onClose={onCloseDialog}
          />
        )}
      </Suspense>
        {!isLoaded && <TableSkeleton />}
        {isLoaded && data.length === 0 && (
          <VStack flexGrow={1} py={12} align="center" justify="center">
            <Image src={networkImage} />
            <Text fontSize="sm" lineHeight={5} color="gray.500" my={2}>
              No data available
            </Text>
          </VStack>
        )}
        {isLoaded && data.length > 0 && (
          <TableContainer>
            <Table variant="simple" {...getTableProps()}>
              <Thead>
                {headerGroups.map(headerGroup => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <Th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Tr 
                      _hover={{
                        background: 'teal.500',
                        transition: 'all 0.5s ease',
                        color: 'white',
                      }}
                      style={{cursor: 'pointer'}}
                    {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <Td 
                          onClick={() => {
                              /* eslint-disable */
                                // @ts-ignore
                                onOpenDialog(cell.row.original.userId, cell.row.original.companyName);
                                /* eslint-enable */
                          }}
                          {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
  }
  
  export default DataTable;
  