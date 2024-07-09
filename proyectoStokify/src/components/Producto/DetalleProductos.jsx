import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';
import ticket from '../../assets/Stokify.jpg';  // Reemplaza con la ruta correcta de tu imagen
import ProductoService from '../../services/ProductoService';

export function DetalleProductos() {
  const routeParams = useParams();
  console.log(routeParams);

  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState('');
  // Booleano para establecer si se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Llamar al API y obtener un producto
    ProductoService.getProductoById(routeParams.id)
      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, [routeParams.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                alt="Producto"
                height="140"
                image={ticket}  // Reemplaza con la ruta correcta de tu imagen
              />
              <CardContent>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }} align='center'>
                  {data.productoNombre}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" gutterBottom>
                <Box fontWeight="bold" display="inline">
                  Descripción:
                  </Box>{' '} 
                  {data.descripcion}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Categoría:
                  </Box>{' '}
                  {data.categoriaNombre}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Plataforma:
                  </Box>{' '}
                  {data.subCategoriaNombre}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Código:
                  </Box>{' '}
                  {data.producto_sku}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Tipo Conexión:
                  </Box>{' '}
                  {data.tipoConexion}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Fecha de lanzamiento:
                  </Box>{' '}
                  {data.fechaLanzamiento}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Cantidad Disponible:
                  </Box>{' '}
                  {data.cantidadStock}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  <Box fontWeight="bold" display="inline">
                    Precio ¢:
                  </Box>{' '}
                  {data.productoCostoUnitario}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

