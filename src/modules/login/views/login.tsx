import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';

function Login(): JSX.Element {
  return (
    <Flex minHeight="100vh">
      <Box w="100%" minHeight="100%">
        <Flex direction="column" justify="center" minHeight="100%">
          <Box width={420} mx="auto">
            <Box mb={14} mt={10}>
              <Text mb={3} fontSize="3xl" lineHeight={9} fontWeight="bold">
                Login
              </Text>
              <Text fontSize="xl" lineHeight={7} fontWeight="medium">
                to access the dashboard
              </Text>
            </Box>
            <form>
              <FormControl my={4} isInvalid={false}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" placeholder="Email" />
                <FormErrorMessage>Email must be filled</FormErrorMessage>
              </FormControl>
              <FormControl my={4} isInvalid={false}>
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input id="password" type="password" placeholder="Password" />
                <FormErrorMessage>
                  The password does not match any account. Please try again.
                </FormErrorMessage>
              </FormControl>
              <Button
                variant="solid"
                size="md"
                colorScheme="blue"
                color="white"
                width="100%"
                shadow="lg"
              >
                Login
              </Button>
            </form>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export {Login};
