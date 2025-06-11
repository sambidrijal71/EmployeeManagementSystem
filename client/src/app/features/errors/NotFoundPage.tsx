import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const messageDetail =
    state.error !== null
      ? state.error.detail
      : 'We could not find what you are looking for.';
  return (
    <Container>
      <Paper elevation={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <Typography variant='h1'>404</Typography>
          <Typography variant='h4'>{messageDetail}</Typography>
          <Button
            variant='outlined'
            sx={{ px: 8, py: 4, mt: 4 }}
            onClick={() => navigate('/')}
          >
            Go back to home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default NotFoundPage;
