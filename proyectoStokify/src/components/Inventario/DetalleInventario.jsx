import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetalleInventarios from '../../services/DetalleInventarioServices';

export function DetalleInventario() {
  const routeParams = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    DetalleInventarios.getInventarioById(routeParams.id)
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, [routeParams.id]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric', // Agregado para incluir los segundos
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" sx={{ mb: 1, textAlign: 'center' }}>
              Bodega {data.bodegaNombre}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mb: 2, textAlign: 'center' }}>
              Ubicación: {data.bodegaDireccion}
            </Typography>

            {/* Detalles de Producto */}
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Producto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/*La variant="body1" lo que hace es dar formato al texto de acuerdo con las convenciones de estilo de Material-UI*/}
                <Typography variant="body1">Nombre: {data.productoNombre}</Typography>
                <Typography variant="body1">Codigo: {data.productoSku}</Typography>
                <Typography variant="body1">Descripción: {data.productoDescripcion}</Typography>
                <Typography variant="body1">Categoría: {data.categoriaNombre}</Typography>
                <Typography variant="body1">Subcategoría: {data.subCategoriaNombre}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Stock Disponible: {data.inventarioCantidadDisponible}</Typography>
                <Typography variant="body1">Stock Mínimo: {data.inventarioCantidadMinima}</Typography>
                <Typography variant="body1">Stock Máximo: {data.inventarioCantidadMaxima}</Typography>
                <Typography variant="body1">Precio por unidad: ¢{data.productoCosto}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />

            {/* Información de quien registra */}
            <Typography variant="h6" component="div" sx={{ mt: 2, mb: 2 }}>
              Quien Registra
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Número de Identificación: {data.idUsuarioRegistroInventario}</Typography>
                <Typography variant="body1">Nombre: {data.nombreUsuarioRegistro}</Typography>
                <Typography variant="body1">Correo Electrónico: {data.emailUsuarioRegistro}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Teléfono: {data.telefonoUsuarioRegistro}</Typography>
                <Typography variant="body1">Fecha y Hora de Registro: {formatDate(data.fechaRegistro)}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />

            {/* Información de quien Actualiza */}
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Quien Actualiza
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Número de Identificación: {data.idUsuarioActualizacionInventario}</Typography>
                <Typography variant="body1">Nombre: {data.nombreUsuarioActualizacion}</Typography>
                <Typography variant="body1">Correo Electrónico: {data.emailUsuarioActualizacion}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Teléfono: {data.telefonoUsuarioActualizacion}</Typography>
                <Typography variant="body1">Fecha de Actualización: {formatDate(data.fechaActualizacion)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
