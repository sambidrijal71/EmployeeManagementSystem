import { Box, AppBar, Toolbar, Typography, ButtonGroup } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { DarkMode, LightMode } from '@mui/icons-material';

interface Props {
  handleThemeChange: () => void;
}
const navStyle = {
  typography: 'h6',
  textDecoration: 'none',
  color: 'white',
  '&:hover': {
    color: 'secondary.main',
  },
  '&.active': {
    color: 'text.primary',
  },
};

const NavBar = ({ handleThemeChange }: Props) => {
  const { darkMode } = useAppSelector((state) => state.uiSlice);
  return (
    <AppBar position='fixed'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h6' sx={navStyle} component={NavLink} to='/'>
            EMS
          </Typography>
          <ButtonGroup onClick={handleThemeChange} sx={{ paddingLeft: 2 }}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
          </ButtonGroup>
        </Box>
        <Box>
          <Typography
            variant='h6'
            sx={navStyle}
            component={NavLink}
            to='/employees'
          >
            Employees
          </Typography>
        </Box>
        <Box display={'flex'}>
          <Typography
            marginRight={4}
            variant='h6'
            sx={navStyle}
            component={NavLink}
            to='/login'
          >
            Login
          </Typography>
          <Typography
            variant='h6'
            sx={navStyle}
            component={NavLink}
            to='/register'
          >
            Register
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
