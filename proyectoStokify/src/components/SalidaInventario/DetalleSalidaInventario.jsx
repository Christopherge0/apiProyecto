import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SalidaInventarioServises from '../../services/SalidaInventarioServises';

export function DetalleSalidaInventario() {
  const routeParams = useParams();
  console.log(routeParams);

  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState('');
  // Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  // Total de la factura
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Llamar al API y obtener un producto
    SalidaInventarioServises.getInventarioById(routeParams.id)
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

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Calcular la suma total de los subtotales
  useEffect(() => {
    if (data) {
      let subtotal = 0;
      data.producto.forEach((producto) => {
        subtotal += producto.costo_unitario * producto.cantidad;
      });
      setTotal(subtotal);
    }
  }, [data]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center' }}>
              Tiquete Electrónico Stokify
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID de Salida Inventario</TableCell>
                    <TableCell>Fecha de Emisión</TableCell>
                    <TableCell>Nombre de la Bodega</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.idSalidaInventario}</TableCell>
                    <TableCell>{formatDate(data.fechaSalida)}</TableCell>
                    <TableCell>{data.nombreBodega}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Quién Tramita
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Número de Identificación</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo Electrónico</TableCell>
                    <TableCell>Teléfono</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.idUsuarioRegistro}</TableCell>
                    <TableCell>{data.nombreUsuario}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.telefono}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Observaciones
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead></TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.observacion}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Detalles de Salida de Inventario
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Costo Unitario</TableCell>
                    <TableCell>Sub Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.producto.map((producto) => (
                    <TableRow key={producto.idProducto}>
                      <TableCell>{producto.nombre_producto}</TableCell>
                      <TableCell>{producto.descripcion_producto}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                      <TableCell>¢{producto.costo_unitario}</TableCell>
                      <TableCell>¢{producto.costo_unitario * producto.cantidad}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right">Total: </TableCell>
                    <TableCell align="left">¢{total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
