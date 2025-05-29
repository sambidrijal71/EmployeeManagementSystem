import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

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

const NavBar = () => {
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display={'flex'}>
          <Typography variant='h6' sx={navStyle} component={NavLink} to='/'>
            EMS
          </Typography>
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
