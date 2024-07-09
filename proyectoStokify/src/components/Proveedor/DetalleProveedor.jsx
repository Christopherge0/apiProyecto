
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ProveedorService from '../../services/ProveedorService';

export function DetalleProveedor() {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ProveedorService.getProveedorLista(id)
      .then((response) => {
        setProveedor(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, [id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      {proveedor && (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" sx={{ mb: 1, textAlign: 'center' }}>
              {proveedor.nombre}
            </Typography>
            <Typography variant="body1" component="div" sx={{ mb: 2, textAlign: 'center' }}>
              Dirección: {proveedor.provincia}, {proveedor.canton}, {proveedor.distrito}, {proveedor.direccionExacta}
            </Typography>

            {proveedor.provedorContacto && proveedor.provedorContacto.length > 0 && (
              <div>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  Contactos del Proveedor
                </Typography>
                <TableContainer component={Paper} sx={{ mb: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Correo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {proveedor.provedorContacto.map((contacto) => (
                        <TableRow key={contacto.id}>
                          <TableCell>{contacto.nombre}</TableCell>
                          <TableCell>{contacto.telefono}</TableCell>
                          <TableCell>{contacto.correo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
