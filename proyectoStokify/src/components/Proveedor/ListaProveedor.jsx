import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import ProveedorService from '../../services/ProveedorService';

export function ListaProveedor() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ProveedorService.getProveedor()
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

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>

      <Grid container sx={{ p: 2 }} spacing={1}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component={Link}
            to="/Proveedores"
            sx={{ marginBottom: 0, width: '165px', fontSize: '12px' }} // Ajustar tamaño del botón
          >
            Nuevo Proveedor
          </Button>
        </Grid>
      </Grid>

      <List sx={{ p: 2 }}>
        {data &&
          data.map((proveedor) => (
            <ListItem
              key={proveedor.id}
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
                    primary={proveedor.nombre}
       
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    primary={`Dirección: ${proveedor.provincia}, ${proveedor.canton}, ${proveedor.distrito},`}
                    secondary={`${proveedor.direccionExacta}`}
                  />
                </Grid>
                <Grid item xs={3}>
                  {/* En este caso, como no tenemos costo unitario o stocks, no los mostramos */}
                </Grid>
                <Grid item xs={1}>
                  <ListItemSecondaryAction>
                    <IconButton
                      component={Link}
                      to={`/getProveedorActualizar/${proveedor.id}`} //AQUIIIII 
                      aria-label="Actualizar"
                    >
                      <UpdateOutlinedIcon />
                    </IconButton>
                    <IconButton
                      component={Link}
                      to={`/getProveedorLista/${proveedor.id}`}
                      aria-label="Detalle"
                    >
                      <InfoOutlinedIcon />
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