import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Menu, MenuItem, MenuList, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="a" 
            color='secondary' 
            href='/' 
            sx={{ flexGrow: 1, textDecoration: 'none' }} // Aquí agregamos la propiedad textDecoration
          >
            Inicio
          </Typography>

          {/* Menu de Matenimientos */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button color="secondary" component={Link} to='/Producto'>
              <Typography textAlign="center">Producto</Typography>
            </Button>
            <Button color="secondary" component={Link} to='/OrdenCompra'>
              <Typography textAlign="center">Orden de Compra</Typography>
            </Button>
            <Button color="secondary" component={Link} to='/Proveedor'>
              <Typography textAlign="center">
                Provedores
              </Typography>
            </Button>
            <Button color="secondary" component={Link} to='/inventario'>
              <Typography textAlign="center">
                Inventario
              </Typography>
            </Button>
            <Button color="secondary" component={Link} to='/TablaSalidaInventario'>
              <Typography textAlign="center">
                Salida Inventario
              </Typography>
            </Button>
            <Button color="secondary" component={Link} to='/Grafico'>
              <Typography textAlign="center">
                Graficos
              </Typography>
            </Button>
            <Button color="secondary" component={Link} to='/GraficoUnoMuchos'>
              <Typography textAlign="center">
                Grafico2
              </Typography>
            </Button>
          </Box>
          {/* Menu de Matenimientos */}
          {/* Menu Usuarios */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usuario">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon style={{ fill: 'white' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
                <MenuItem component="a" href="/user/login">
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem component="a" href="/user/create">
                  <Typography textAlign="center">Registrarse</Typography>
                </MenuItem>
              </MenuList>
              <MenuList>
                <MenuItem>
                  <Typography variant="subtitle1" gutterBottom>
                    Email usuario
                  </Typography>
                </MenuItem>
                <MenuItem color="secondary" component="a" href="/user/logout">
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          {/* Menu Usuarios */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}