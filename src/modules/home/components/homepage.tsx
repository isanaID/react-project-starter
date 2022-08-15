import {Box, Image, Text, Link, } from '@chakra-ui/react';
import { useState } from 'react';
import Jamil from 'assets/images/jamil.png';

function Homepage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const [easterEgg, setEasterEgg] = useState('Meong');

  const handleHidden = (): void => {
    setCounter(counter + 1);
    if(counter === 1) {
      setEasterEgg('Dont Click That')
      }
    if(counter === 2) {
      setEasterEgg('Dont Click That Again Meow!')
      }
    if(counter === 3) {
    alert('I TOLD YOU NOT TO CLICK THAT!');
    setIsOpen(true);
    }
  }
  return (
    <Box>
      {isOpen? <Link href='https://www.youtube.com/watch?v=pH3ob999V7k'><Image src={Jamil} alt="jamil" /></Link> : <Text onClick={handleHidden}>{easterEgg}</Text> }
    </Box>
  );
}
  
export default Homepage;