import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
  name: string;
}

const Greetings = ({ name }: Props) => {
  const [greeting, setGreeting] = useState<string>(`Hello, ${name}!`);
  const handleClick = () => {
    setGreeting(`Welcome, ${name}!`);
  };
  return (
    <Container>
      <Typography data-testid='greeting' variant='h6'>
        {greeting}
      </Typography>
      <Button onClick={handleClick}>Change Greetings</Button>
    </Container>
  );
};
export default Greetings;
