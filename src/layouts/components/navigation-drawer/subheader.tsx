import {Text} from '@chakra-ui/react';

function Subheader({title}: {title: string}): JSX.Element {
  return (
    <Text
      fontSize="xs"
      lineHeight={4}
      fontWeight="semibold"
      textTransform="uppercase"
      color="gray.400"
      px={4}
    >
      {title}
    </Text>
  );
}
export {Subheader};
