import {useEffect, useState, useMemo} from 'react';
import {SearchIcon} from '@chakra-ui/icons';
import {useQueryClient} from 'react-query';
import Swal from 'sweetalert2';
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
  Button,
  useToast,
  Icon
} from '@chakra-ui/react';
import { IoMdExit } from 'react-icons/io';
import { AiOutlineCopy } from 'react-icons/ai';
import shallow from 'zustand/shallow';
import {useParams} from 'react-router-dom';
import {DataTable, Pagination, ErrorAlert} from 'common/components';
import {useSummaryCompanyDetailState} from '../context';
import * as TYPES from '../constants';
import * as services from '../services';
import {useListAdmin} from '../context/hooks';

function AdminCollections(): JSX.Element {
    // const [companyId, setcompanyId] = useSummaryCompanyDetailState(
    //     state => [state.companyId, state.setcompanyId],
    //     shallow,
    //   );
    const {companyid} = useParams();

    // const getCompanyId = (): void => {
    //     setcompanyId(companyid);
    // };
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
        companyId : companyid,
        limit: LIMIT,
    });
    const toast = useToast();
    const queryClient = useQueryClient();

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
                Header: 'Action',
                /* eslint-disable */
                Cell: (rows: any) => {
                  return(
                    <>
                    {/* {console.log(rows.row.original.userId)} */}
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => {Swal.fire({
                        title: 'Are you sure?',
                        text: 'You won\'t be able to revert this!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true,
                      }).then(async (result) => {
                        if (result.value) {
                          const actions = await services.deleteAdmin(rows.row.original._id)
                          if(actions.status) {
                            toast({
                              title: 'Success',
                              description: 'Admin has been deleted',
                              status: 'success',
                              duration: 5000,
                              isClosable: true,
                              position: 'top',
                            });
                            queryClient.invalidateQueries(TYPES.FETCH_LIST);
                          } else {
                            toast({
                              title: 'Error',
                              description: 'Admin has not been deleted',
                              status: 'error',
                              duration: 5000,
                              isClosable: true,
                              position: 'top',
                            });
                          }
                        }});
                      }}
                    >
                      <Icon as={IoMdExit} color="red.600" />
                    </Button>
                    </>
                  )
                }
              }
            ],
            [],
          );

    return (
        <Box>
          <Flex
          direction={{base: 'column', md: 'row'}}
          justify="start"
          align="end"
          my={5}
        >
            <Text>
              ID Company : {companyid}
            </Text>
            <AiOutlineCopy onClick={() => {
              navigator.clipboard.writeText(`${companyid}`);
              toast({
                title: 'Success',
                description: 'ID Company has been copied to clipboard',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
              });
              }} size="1.5rem" color="gray.600" />
            </Flex>
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