import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import OrdenCompraServices from '../../services/OrdenCompraServices';
import OrdenCompraAllServises from '../../services/OrdenCompraAllServises';
import { toast } from 'react-hot-toast';

export function DetalleOrdenCompra() {
  const routeParams = useParams();
  const navigate = useNavigate();
  console.log(routeParams);

  // Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  // Error del API
  const [error, setError] = useState('');
  // Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  // Total de la orden de compra
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Llamar al API y obtener una orden de compra
    OrdenCompraServices.getOrdenCompraById(routeParams.id)
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

  // Calcular la suma total de los productos de la orden de compra
  useEffect(() => {
    if (data) {
      let subtotal = 0;
      data.Productos.forEach((producto) => {
        subtotal += producto.costoUnitario * producto.cantidad;
      });
      setTotal(subtotal);
    }
  }, [data]);

  // Función para tramitar la orden de compra
  const tramitarOrden = (data) => {
    data.idUsuarioQuienRecibe = 118510232;
    console.log(data);
    // Lógica para actualizar el estado de la orden en la base de datos
    OrdenCompraAllServises.update(data)
      .then((response) => {
        setError(response.error);
        if (response.data.results != null) {
          toast.success(response.data.results, {
            duration: 4000,
            position: 'top-center',
          });
          return navigate('/OrdenCompra');
        }
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          throw new Error('Respuesta no válida del servidor');
        }
      });
  };

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {data && (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" sx={{ mb: 1, textAlign: 'center' }}>
              {data.proveedorNombre}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mb: 2, textAlign: 'center' }}>
              Facturar a STOKIFY
            </Typography>

            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID de Factura</TableCell>
                    <TableCell>Fecha de Emisión</TableCell>
                    <TableCell>Fecha de Recepción</TableCell>
                    <TableCell>Estado de la Orden</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{formatDate(data.fechaGeneracion)}</TableCell>
                    <TableCell>{formatDate(data.fechaRecepcion)}</TableCell>
                    <TableCell>{data.estadoOrdenNombre}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Quién solicita
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Número de Identificación</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo Electrónico</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Ubicación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.idUsuarioRegistro}</TableCell>
                    <TableCell>{data.usuarioNombre}</TableCell>
                    <TableCell>{data.usuarioEmail}</TableCell>
                    <TableCell>{data.telefonoUsuario}</TableCell>
                    <TableCell>Bodega {data.bodegaNombre}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Quién recibe
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Número de Identificación</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo Electrónico</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Ubicación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.idUsuarioQuienRecibe}</TableCell>
                    <TableCell>{data.usuarioNombreQuienRecibe}</TableCell>
                    <TableCell>{data.usuarioEmailQuienRecibe}</TableCell>
                    <TableCell>{data.telefonoUsuarioQuienRecibe}</TableCell>
                    <TableCell>Bodega {data.bodegaNombre}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Detalles de la Orden de Compra
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Costo Unitario</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Llamado de la segunda parte del api */}
                  {data.Productos.map((producto) => (
                    <TableRow key={producto.idProducto}>
                      <TableCell>{producto.productoNombre}</TableCell>
                      <TableCell>{producto.productoDescripcion}</TableCell>
                      <TableCell>¢{producto.costoUnitario}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                      <TableCell>¢{producto.costoUnitario * producto.cantidad}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right">Total: </TableCell>
                    <TableCell align="left">¢{total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* Botón para tramitar la orden solo si el estado es "Sin Tramitar" */}
            {data.idEstadoOrden === '2' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => tramitarOrden(data)} // Pasar el objeto completo 'data'
                sx={{ mt: 2 }}
              >
                Tramitar
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
