import { Container, Divider, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ServerErrorPage = () => {
  const { state } = useLocation();

  return (
    <Container>
      {state.error ? (
        <Paper elevation={4} sx={{ padding: 2 }}>
          <Typography variant='h3' color='secondary'>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant='body1' padding={2}>
            {state.error.detail ??
              'Something went wrong, please try again later.'}
          </Typography>
        </Paper>
      ) : (
        <Typography variant='h3' color='secondary'>
          {state.error.title}
        </Typography>
      )}
    </Container>
  );
};
export default ServerErrorPage;
