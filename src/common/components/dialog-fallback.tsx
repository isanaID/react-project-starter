import {Box, Spinner} from '@chakra-ui/react';

function DialogFallback(): JSX.Element {
  return (
    <Box
      bg="white"
      opacity=".4"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex={10}
      backdropFilter="auto"
      backdropBlur="8px"
    >
      <Spinner
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        size="xl"
        color="blue.500"
      />
    </Box>
  );
}

export default DialogFallback;
