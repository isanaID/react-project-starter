import shallow from 'zustand/shallow';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Grid,
  GridItem,
  useToast,
  Flex,
  Text,
  Link,
} from '@chakra-ui/react';
import {Formik, Form, Field} from 'formik';
import {useQueryClient} from 'react-query';

import {TextField, Select} from '../../../lib/components';

import {
  INITIAL_VALUES_REGISTER_KIOSK,
  RegisterDeviceSchemaKiosk,
} from '../constants';

import {useRegister} from '../context/hooks';
import {useAuth} from '../../../lib/auth-provider/context';

function FormRegisterKiosk(): JSX.Element {
  const {register, status, errorMessage, fieldErrors} = useRegister();

  const [user] = useAuth(state => [state.user], shallow);

  const queryClient = useQueryClient();

  const toast = useToast();

  const submitRegister = async (values: any, actions: any): Promise<void> => {
    try {
      await register(values);
      toast({
        title: 'Device has been added',
        description: 'You’ve just added a new Device',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      queryClient.invalidateQueries('list-kiosk-collections');
      queryClient.invalidateQueries('kiosk-collections-summary');
      actions.resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={INITIAL_VALUES_REGISTER_KIOSK}
        validationSchema={RegisterDeviceSchemaKiosk}
        onSubmit={(values, actions) => {
          submitRegister(values, actions);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Grid
              templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}}
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
                        (form.errors.imei || fieldErrors?.imei)
                      }
                      inputProps={{...field}}
                      disabled={isSubmitting}
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
                        (form.errors.macAddress || fieldErrors?.macAddress)
                      }
                      inputProps={{...field}}
                      disabled={isSubmitting}
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
                        (form.errors.name || fieldErrors?.name)
                      }
                      inputProps={{...field}}
                      disabled={isSubmitting}
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
                        (form.errors.address || fieldErrors?.address)
                      }
                      inputProps={{...field}}
                      disabled={isSubmitting}
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
                      label="Coordinate"
                      placeholder="-7.750740, 110.418389"
                      type="text"
                      errorMessage={
                        form.touched.coordinate &&
                        (form.errors.coordinate || fieldErrors?.coordinate)
                      }
                      inputProps={{...field}}
                      disabled={isSubmitting}
                    />
                  )}
                </Field>
              </GridItem>
              <GridItem mt="auto">
                <Button
                  size="lg"
                  variant="solid"
                  colorScheme="blue"
                  color="white"
                  isFullWidth
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
              </GridItem>
            </Grid>
          </Form>
        )}
      </Formik>
      {/* <Alert status="info" variant="left-accent" maxW="500px" mt={10}>
          <AlertIcon />
          We make sure to always secure and keep your data safely
        </Alert> */}
    </Box>
  );
}

export default FormRegisterKiosk;
