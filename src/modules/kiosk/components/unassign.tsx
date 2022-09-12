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
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react';
import {Formik, Form, Field} from 'formik';
import {useQueryClient} from 'react-query';
import {useListCompany, useListKiosk} from 'common/context/hooks';

import {
    INITIAL_VALUES_UNASSIGN_KIOSK,
    unAssignDeviceSchemaKiosk,
} from '../constants';

import {useUnAssign} from '../context/hooks';
import {useAuth} from '../../../lib/auth-provider/context';

function UnAssign(): JSX.Element {
  const {unassign, status, errorMessage, fieldErrors} = useUnAssign();

  const [user] = useAuth(state => [state.user], shallow);

  const queryClient = useQueryClient();
  const listKiosk = useListKiosk();

  const toast = useToast();

  const submitRegister = async (values: any, actions: any): Promise<void> => {
    try {
      await unassign(values);
      toast({
        title: 'Device has been UnAssigned',
        description: 'You’ve just UnAssigned a Device',
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
        initialValues={INITIAL_VALUES_UNASSIGN_KIOSK}
        validationSchema={unAssignDeviceSchemaKiosk}
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
                      /* eslint-disable */
                      <>
                      <FormControl>
                      <FormLabel htmlFor="deviceId">Device</FormLabel>
                      <Select
                        required
                        id='deviceId'
                        placeholder="Select Device"
                        isDisabled={isSubmitting}
                        {...field}
                      >
                        {listKiosk?.data?.data?.docs?.map((type: any) => (
                          <option key={type._id} value={type._id}>
                            {type.name}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{form.touched.deviceId &&
                          (form.errors.deviceId || fieldErrors?.deviceId)}
                      </FormErrorMessage>
                      </FormControl>
                      </>
                      /* eslint-enable */
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
                  UnAssign
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

export default UnAssign;
