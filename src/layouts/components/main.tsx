import {Box} from '@chakra-ui/react';

function Main({
  children,
  ...properties
}: {
  children: React.ReactNode;
  [key: string]: any;
}): JSX.Element {
  return <Box {...properties}>{children}</Box>;
}
export default Main;
