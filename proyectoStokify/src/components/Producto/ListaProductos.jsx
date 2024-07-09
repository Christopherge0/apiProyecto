import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'; // Agregar Button desde Material-UI
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import PaymentIcon from '@mui/icons-material/Payment';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Link } from 'react-router-dom';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'; // Agregar el ícono que deseas utilizar
import { useEffect, useState } from 'react';
import ProductoService from '../../services/ProductoService';

export function ListaProductos() {
  
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  //Llamar al API y obtener la lista de productos
  useEffect(() => {
    ProductoService.getProductos()
      .then((response) => {
        console.log(     )
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

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      <Grid item xs={12}> {/* Ajustar el ancho del botón */}
        <Button 
          variant="contained" 
          component={Link} 
          to="/ProductoAll" 
          sx={{ marginBottom: 2 }} // Espacio debajo del botón
        >
          Crear Nuevo Producto
        </Button>
      </Grid>
      {data && data.map((item)=>( 
        <Grid item xs={4} key={item.id}>
          <Card
            sx={{
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 0px 10px 3px #5271FF',
                transform: 'scale(1.05)',
              },
            }}
          >
            
            <CardHeader
              
              sx={{
                p: 0,
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white,
              }}
              style={{ textAlign: 'center' }}
              title={item.productoNombre}
              subheader={item.descripcion}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <CategoryTwoToneIcon />{item.categoriaNombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <SubdirectoryArrowRightIcon /> {item.subCategoriaNombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <PaymentIcon /> ¢{item.productoCostoUnitario}
              </Typography>
            </CardContent>
            
            <CardActions
              disableSpacing
              sx={{
                backgroundColor: (theme) => theme.palette.action.focus,
                color: (theme) => theme.palette.common.white,
              }}
            >
              <IconButton
                component={Link}
                to={`/Producto/${item.id}`}
                aria-label="Detalle"
                sx={{ ml: 'auto' }}
              >
                <ViewInArOutlinedIcon />
              </IconButton>
              <IconButton
                component={Link}
                to={`/ProductoAll/${item.id}`}
                aria-label="Ver todos los productos"
              >
                <TipsAndUpdatesOutlinedIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
