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
    INITIAL_VALUES_ASSIGN_KIOSK,
    AssignDeviceSchemaKiosk,
} from '../constants';

import {useAssign} from '../context/hooks';
import {useAuth} from '../../../lib/auth-provider/context';

function Assign(): JSX.Element {
  const {assign, status, errorMessage, fieldErrors} = useAssign();

  const [user] = useAuth(state => [state.user], shallow);

  const queryClient = useQueryClient();

  const toast = useToast();

  const submitRegister = async (values: any, actions: any): Promise<void> => {
    try {
      await assign(values);
      toast({
        title: 'Device has been Assigned',
        description: 'You’ve just Assigned a new Device',
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
        initialValues={INITIAL_VALUES_ASSIGN_KIOSK}
        validationSchema={AssignDeviceSchemaKiosk}
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
                <Field name="companyId">
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
                      id="companyId"
                      label="Company ID"
                      placeholder="Company ID"
                      type="text"
                      errorMessage={
                        form.touched.companyId &&
                        (form.errors.companyId || fieldErrors?.companyId)
                      }
                      inputProps={{...field}}
                      disabled={isSubmitting}
                    />
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="deviceId">
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
                      id="deviceId"
                      label="Device ID"
                      placeholder="Device ID"
                      type="text"
                      errorMessage={
                        form.touched.deviceId &&
                        (form.errors.deviceId || fieldErrors?.deviceId)
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
                  Assign
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

export default Assign;
