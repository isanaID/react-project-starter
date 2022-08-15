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
    INITIAL_VALUES_REGISTER_ADMIN,
    RegisterAdminSchema,
  } from '../constants';
  
  import {useRegister} from '../context/hooks';
  
  function FormRegister(): JSX.Element {
    const {register, status, errorMessage, fieldErrors} = useRegister();
    const queryClient = useQueryClient();
  
    const toast = useToast();
  
    const submitRegister = async (values: any, actions: any): Promise<void> => {
      try {
        await register(values);
        toast({
          title: 'Admin has been added',
          description: 'You’ve just added a new Admin',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        queryClient.invalidateQueries('admin-collections');
        queryClient.invalidateQueries('admin-collections-summary');
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
          initialValues={INITIAL_VALUES_REGISTER_ADMIN}
          validationSchema={RegisterAdminSchema}
          onSubmit={(values, actions) => {
            submitRegister(values, actions);
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <Grid
                templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)'}}
                gap="20px 52px"
              >
                <GridItem>
                  <Field name="fullname">
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
                        id="fullname"
                        label="Fullname"
                        placeholder="Fullname"
                        type="text"
                        errorMessage={
                          form.touched.fullname &&
                          (form.errors.fullname || fieldErrors?.fullname)
                        }
                        inputProps={{...field}}
                        disabled={isSubmitting}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name="email">
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
                        id="email"
                        label="Email"
                        placeholder="email"
                        type="email"
                        errorMessage={
                          form.touched?.email &&
                          (form.errors?.email || fieldErrors?.email)
                        }
                        inputProps={{...field}}
                        disabled={isSubmitting}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name="phone">
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
                        id="phone"
                        label="phone"
                        placeholder="Phone"
                        type="text"
                        errorMessage={
                          form.touched.phone &&
                          (form.errors.phone || fieldErrors?.phone)
                        }
                        inputProps={{...field}}
                        disabled={isSubmitting}
                      />
                    )}
                  </Field>
                </GridItem>
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
                        placeholder="companyId"
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
                    Register Admin
                  </Button>
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
        <Alert status="info" variant="left-accent" maxW="500px" mt={10}>
          <AlertIcon />
          We make sure to always secure and keep your data safely
        </Alert>
      </Box>
    );
  }
  
  export default FormRegister;
  