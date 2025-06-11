import {
  Container,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';

interface Props {
  message?: string;
}
const LoadingComponent = ({ message = 'Loading, please wait!!' }: Props) => {
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
          <CircularProgress />
          <Typography variant='h2'>{message}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};
export default LoadingComponent;
