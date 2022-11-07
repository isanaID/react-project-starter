import shallow from 'zustand/shallow';

import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Spacer,
    Text,
    Grid,
    GridItem,
    FormLabel,
    Switch,
    useDisclosure,
    HStack,
    Square
  } from '@chakra-ui/react';

  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

  import {useEffect, useState, Suspense, lazy} from 'react';
  
  import {useDetailAccess} from '../context/hooks';
  import {useLogState} from '../context';
  
  function DialogDetail({
    isOpen,
    onClose,
    adminId,
    companyName,
  }: {
    isOpen: boolean;
    onClose: () => void;
    adminId: any;
    companyName: any;
  }): JSX.Element {

    const [nameMeasurement, setNameMeasurement] = useState<any>(null);
    const [typeCheck, setTypeCheck] = useState<any>(null);

    const [dateRange] = useLogState(
      state => [state.dateRange],
      shallow,
    );

    const {
      isOpen: isOpenDialogUsers,
      onOpen: onOpenDialogUsers,
      onClose: onCloseDialogUsers,
    } = useDisclosure();

    const onOpenDialog = (name:any, type:any): void => {
      setNameMeasurement(name);
      setTypeCheck(type);
      onOpenDialogUsers();
    };

    const onCloseDialog = (): void => {
      setNameMeasurement(null);
      setTypeCheck(null);
      onCloseDialogUsers();
    };
    
    const {
        status,
        data: response,
        refetch,
        errorMessage,
      } = useDetailAccess({
        adminId,
        dateRange,
        });
  
    useEffect(() => {
      console.log(adminId);
    }, []);

    useEffect(() => {
        refetch();
      }, [
        adminId,
        refetch,
      ]);
  
    return (
      <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody px={4} py={38}>
            <Text mb={5}>{companyName}</Text>
            {response?.data?.total > 0 && response?.data?.docs?.length > 0 && (

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={response?.data?.docs || []} maxBarSize={10}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis axisLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--chakra-colors-teal-300)" />
            </BarChart>
          </ResponsiveContainer>
      )}
                
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  
  export default DialogDetail;
  