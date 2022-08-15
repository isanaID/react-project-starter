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
    INITIAL_VALUES_REGISTER_COMPANY,
    RegisterCompanySchema,
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
          title: 'Company has been added',
          description: 'You’ve just added a new company',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        queryClient.invalidateQueries('company-collections');
        queryClient.invalidateQueries('company-collections-summary');
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
          initialValues={INITIAL_VALUES_REGISTER_COMPANY}
          validationSchema={RegisterCompanySchema}
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
                        label="Company Name"
                        placeholder="Company Name"
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
                  <Field name="companySector">
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
                        id="companySector"
                        label="Company Sector"
                        placeholder="Company Sector"
                        type="text"
                        errorMessage={
                          form.touched.companySector &&
                          (form.errors.companySector || fieldErrors?.companySector)
                        }
                        inputProps={{...field}}
                        disabled={isSubmitting}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name="website">
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
                        id="website"
                        label="Website"
                        placeholder="website"
                        type="text"
                        errorMessage={
                          form.touched.website &&
                          (form.errors.website || fieldErrors?.website)
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
                        placeholder="Email"
                        type="email"
                        errorMessage={
                          form.touched.email &&
                          (form.errors.email || fieldErrors?.email)
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
                        label="Phone"
                        placeholder="Phone"
                        type="tel"
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
                  <Field name="tax">
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
                        id="tax"
                        label="Tax"
                        placeholder="Tax"
                        type="text"
                        errorMessage={
                          form.touched.tax &&
                          (form.errors.tax || fieldErrors?.tax)
                        }
                        inputProps={{...field}}
                        disabled={isSubmitting}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name="companyCode">
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
                        id="companyCode"
                        label="Company Code (Optional)"
                        placeholder="Company Code"
                        type="text"
                        errorMessage={
                          form.touched.companyCode &&
                          (form.errors.companyCode || fieldErrors?.companyCode)
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
                    Add Company
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
  