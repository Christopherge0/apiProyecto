import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SalidaInventarioServises from '../../services/SalidaInventarioServises';
import { Button } from '@mui/material';

export function TablaSalidaInventario() {
      /**
    Variable para Cambio desde el front end
    254016884
    118510233
    118160876
    654789644
    125420164
    254016884
    125876548
    */

  const id =  118510233;
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    SalidaInventarioServises.getSalidaInventario(id)
      .then((response) => {
        console.log(response)
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

  if (!loaded) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <List sx={{ p: 2 }}>
      <Grid container sx={{ p: 2 }} spacing={1}>
        <Grid item xs={1}>
          <Button
            variant="contained"
            component={Link}
            to={`/CrearSalidaInventaio`}
            sx={{
              marginBottom: 2,
              width: '165px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
            }}
          >
            Añadir al inventario
          </Button>
        </Grid>
      </Grid>
      {data && data.map((item) => (
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
          <Grid item xs={2}>
              <ListItemText primary={`Id Factura: ${item.id}`} />
            </Grid>
            <Grid item xs={3}>
              <ListItemText primary={`Bodega: ${item.nombre_bodega}`} />
            </Grid>
            <Grid item xs={4}>
              <ListItemText primary={`Usuario: ${item.nombre_usuario}`} />
            </Grid>
            <Grid item xs={3}>
              <ListItemText primary={`Fecha: ${item.fechaSalida}`} />
            </Grid>
            <Grid item xs={1}>
              {/* Botón 1 */}
              <ListItemSecondaryAction>
              <IconButton
                  component={Link}
                  to={`/DetalleSalidaInventario/${item.id}`}
                  aria-label="Detalle"
                >
                  <MoreHorizOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}
