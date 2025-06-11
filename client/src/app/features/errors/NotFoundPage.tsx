import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
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
          <Typography variant='h4'>
            We could not find what you are looking for.
          </Typography>
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
