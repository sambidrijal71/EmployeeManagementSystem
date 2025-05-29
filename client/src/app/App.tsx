import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Container, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl'>
        <Outlet />
      </Container>
    </>
  );
};
export default App;
