import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from './store/store';
import { setDarkMode } from './layout/uiSlice';
import { ToastContainer, Bounce } from 'react-toastify';

const App = () => {
  const { darkMode } = useAppSelector((state) => state.uiSlice);
  const dispatch = useAppDispatch();

  const paletteMode = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: { default: paletteMode === 'light' ? '#121212' : '#eaeaea' },
    },
  });

  const handleThemeChange = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        theme={darkMode ? 'dark' : 'light'}
        transition={Bounce}
      />
      <NavBar handleThemeChange={handleThemeChange} />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? 'radial-gradient(circle, #1e3aBa, #111B27)'
            : 'radial-gradient(circle, #baecf9, #f0f9ff)',
          py: 6,
        }}
      >
        <Container maxWidth='xl' sx={{ marginTop: 5 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default App;
