import {
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
    Image,
    Text
  } from '@chakra-ui/react';
  import {useNavigate} from 'react-router-dom';
  import {useTable} from 'react-table';
  
  import networkImage from 'assets/images/network.svg';
  import TableSkeleton from './table-skeleton';
  
  function CompanyTable({
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
    const navigate = useNavigate();
  
    return (
      <Box {...props}>
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
                    {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <Td 
                          onClick={() => {
                            /* eslint-disable */
                            navigate(
                              // @ts-ignore: Unreachable code error
                              `/company-detail/${cell.row.original._id}`,
                            );
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
  
  export default CompanyTable;
  