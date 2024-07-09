import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import OrdenCompraServices from '../../services/OrdenCompraServices';


export function ListaOrdenCompra() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState(null); // Estado del filtro

  useEffect(() => {
    OrdenCompraServices.getOrdenCompras()
      .then((response) => {
        console.log(response);
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          setLoaded(false);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  }, []);

  const filtrarPorEstado = (estado) => {
    setFiltroEstado(estado);
  };

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar los datos si hay un filtro de estado aplicado
  const dataFiltrada = filtroEstado
    ? data.filter((item) => item.idEstadoOrden === filtroEstado)
    : data;

  return (
    <>
      {/* Agregar botones para filtrar por estado */}
      <Button
        variant={filtroEstado === null ? 'contained' : 'outlined'}
        onClick={() => filtrarPorEstado(null)}
        sx={{ mr: 1 }}
      >
        Todos
      </Button>
      <Button
        variant={filtroEstado === '1' ? 'contained' : 'outlined'}
        onClick={() => filtrarPorEstado('1')}
        sx={{ mr: 1 }}
      >
        Tramitado
      </Button>
      <Button
        variant={filtroEstado === '2' ? 'contained' : 'outlined'}
        onClick={() => filtrarPorEstado('2')}
      >
        Sin Tramitar
      </Button>

      {/* Agregar botón para crear una orden de compra */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/CrearOrdenCompra"
        style={{ display: 'block', marginTop: '25px', width: '240px' }}
      >
        Crear Orden de Compra
      </Button>

      {/* Lista de órdenes de compra */}
      <List sx={{ p: 2 }}>
        {dataFiltrada.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              borderBottom: '1px solid #ccc',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ListItemText
                  primary={`Proveedor:`}
                  secondary={item.proveedorNombre}
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemText
                  primary={`Estado de la orden:`}
                  secondary={item.estadoOrdenNombre}
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={`Usuario el cual solicitó:`}
                  secondary={item.usuarioNombre}
                />
              </Grid>
              <Grid item xs={1}>
                <ListItemSecondaryAction>
                  <IconButton
                    component={Link}
                    to={`/OrdenCompra/${item.id}`}
                    aria-label="Detalle"
                  >
                    <LocalGroceryStoreRoundedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
}
