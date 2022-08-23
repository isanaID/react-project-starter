import {
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
  } from '@chakra-ui/react';
  
  import {Formik, Form, Field} from 'formik';
  import {TextField} from 'lib/components';
  import {useEffect} from 'react';
  
  import {useUpdate} from '../context/hooks';
  
  import {
    INITIAL_VALUES_REGISTER_KIOSK,
    RegisterDeviceSchemaKiosk,
  } from '../constants';
  
  function DialogForm({
    isOpen,
    onClose,
    deviceId,
  }: {
    isOpen: boolean;
    onClose: () => void;
    deviceId: any;
  }): JSX.Element {
    // const {
    //   status,
    //   data: response,
    //   refetch,
    //   errorMessage,
    // } = useDetailFatmor({
    // });
  
    const update = useUpdate({
      onSuccess: () => {
        onClose();
      },
    });
  
    const isLoading = update.status === 'loading';
  
    const errors = {
      ...update.errors,
    };
  
    useEffect(() => {
      console.log(deviceId);
    }, []);
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody px={6} py={38}>
            <Text mb={5}>Update Setting</Text>
            <Formik
              initialValues={deviceId}
              onSubmit={values => {
                if (deviceId) {
                  update.mutate({
                    // eslint-disable-next-line no-underscore-dangle
                    deviceId: deviceId._id,
                    ...values,
                  });
                }
                // else {
                //   create.mutate(values);
                // }
              }}
            >
              {() => (
                <Form>
                  <Grid
                    templateColumns={{
                      base: 'repeat(1, 1fr)',
                      md: 'repeat(2, 1fr)',
                    }}
                    gap="20px 52px"
                  >
                    <GridItem>
                <Field name="imei">
                  {({
                    field,
                    form,
                  }: {
                    // eslint-disable-next-line react/no-unused-prop-types
                    field: any;
                    // eslint-disable-next-line react/no-unused-prop-types
                    form: any;
                  }) => (
                    <TextField
                      id="imei"
                      label="IMEI Device"
                      placeholder="IMEI Device"
                      type="text"
                      errorMessage={
                        form.touched.imei &&
                        (form.errors.imei || errors?.imei)
                      }
                      inputProps={{...field}}
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="macAddress">
                  {({
                    field,
                    form,
                  }: {
                    // eslint-disable-next-line react/no-unused-prop-types
                    field: any;
                    // eslint-disable-next-line react/no-unused-prop-types
                    form: any;
                  }) => (
                    <TextField
                      id="macAddress"
                      label="Mac Device Address"
                      placeholder="Mac Device Address"
                      type="text"
                      errorMessage={
                        form.touched.macAddress &&
                        (form.errors.macAddress || errors?.macAddress)
                      }
                      inputProps={{...field}}
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="name">
                  {({
                    field,
                    form,
                  }: {
                    // eslint-disable-next-line react/no-unused-prop-types
                    field: any;
                    // eslint-disable-next-line react/no-unused-prop-types
                    form: any;
                  }) => (
                    <TextField
                      id="name"
                      label="Device Name"
                      placeholder="Device Name"
                      type="text"
                      errorMessage={
                        form.touched.name &&
                        (form.errors.name || errors?.name)
                      }
                      inputProps={{...field}}
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="address">
                  {({
                    field,
                    form,
                  }: {
                    // eslint-disable-next-line react/no-unused-prop-types
                    field: any;
                    // eslint-disable-next-line react/no-unused-prop-types
                    form: any;
                  }) => (
                    <TextField
                      id="address"
                      label="Location"
                      placeholder="Location"
                      type="text"
                      errorMessage={
                        form.touched.address &&
                        (form.errors.address || errors?.address)
                      }
                      inputProps={{...field}}
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="coordinate">
                  {({
                    field,
                    form,
                  }: {
                    // eslint-disable-next-line react/no-unused-prop-types
                    field: any;
                    // eslint-disable-next-line react/no-unused-prop-types
                    form: any;
                  }) => (
                    <TextField
                      id="coordinate"
                      label="coordinate"
                      placeholder="-7.750740, 110.418389"
                      type="text"
                      errorMessage={
                        form.touched.coordinate &&
                        (form.errors.coordinate || errors?.coordinate)
                      }
                      inputProps={{...field}}
                      disabled={isLoading}
                    />
                  )}
                </Field>
              </GridItem>
                  </Grid>
                  <Spacer mt={4} />
                  <Flex align="end" justify="end" gap={3}>
                    <Button
                      size="md"
                      colorScheme="blue"
                      type="submit"
                      width="110px"
                    >
                      Update
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  
  export default DialogForm;
  