import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText, } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, Toaster } from 'react-hot-toast';
import InventarioMantenientoServices from '../../services/InventarioMantenientoServices';
import { SelectedBodega } from './Form/SelectedBodega';
import { Producto } from './Form/Producto';
import { useNavigate, useParams } from 'react-router-dom';

export function CrearInventario() {
  const navigate = useNavigate();
  const formattedDateTime = (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0'); // Added seconds
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  })();


  const { id } = useParams();

  const [selectedBodega, setSelectedBodega] = useState(null);

  const inventarioSchema = yup.object().shape({
    idBodega: yup.string().required('Seleccione una bodega'),
    idProducto: yup.string().required('Seleccione un producto'),
    cantidadMinima: yup.number()
      .min(0, 'La cantidad mínima debe ser mayor o igual a 0')
      .test('menor-que-maxima', 'Debe ser menor que la cantidad máxima', function (value) {
        const cantidadMaxima = parseFloat(this.parent.cantidadMaxima);
        return value < cantidadMaxima;
      })
      .positive('La cantidad mínima debe ser un número positivo')
      .required('Este campo es obligatorio'),
    cantidadMaxima: yup.number()
      .min(0, 'La cantidad máxima debe ser mayor o igual a 0')
      .test('mayor-que-minima', 'Debe ser mayor que la cantidad mínima', function (value) {
        const cantidadMinima = parseFloat(this.parent.cantidadMinima);
        return value > cantidadMinima;
      })
      .positive('La cantidad máxima debe ser un número positivo')
      .required('Este campo es obligatorio'),
    cantidadDisponible: yup.number()
      // Asegúrate de que cantidadMinima y cantidadMaxima estén definidas antes de esta validación.
      .min(yup.ref('cantidadMinima'), 'La cantidad disponible debe ser mayor o igual que la cantidad mínima')
      .max(yup.ref('cantidadMaxima'), 'La cantidad disponible debe ser menor o igual que la cantidad máxima')
      .positive('La cantidad disponible debe ser un número positivo')
      .required('Este campo es obligatorio'),
  });
  
  




  const {
    control,
    handleSubmit,
    formState: { errors },

  } = useForm({
    defaultValues: {
      idProducto: '',
      idBodega: '',
      cantidadDisponible: '',
      cantidadMinima: '',
      cantidadMaxima: '',
      idUsuarioRegistro: id,
      idUsuarioActualizacion: id,
      fechaRegistro: formattedDateTime,
      fechaActualizacion: formattedDateTime,
    },
    resolver: yupResolver(inventarioSchema),

  });

  const [error, setError] = useState('');

  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (data) => {


    InventarioMantenientoServices.create(data)
      .then((response) => {
        console.log(response);
        setError(response.error);
        if (response.data.results != null) {
          toast.success(response.data.results, {
            duration: 4000,
            position: 'top-center',
          });
          return navigate('/Inventario');
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

  const [dataBodegas, setDataBodegas] = useState([]);
  const [loadedBodegas, setLoadedBodegas] = useState(false);

  useEffect(() => {
    InventarioMantenientoServices.getComboBoxBodega(id)
      .then((response) => {
        setDataBodegas(response.data.results);
        setLoadedBodegas(true);
      })
      .catch((error) => {
        console.error('Error al obtener las Bodegas:', error);
      });
  }, []);


  const [dataProductos, setDataProductos] = useState([]);
  const [producto, setLoadedProducto] = useState(false);


  useEffect(() => {
    // if (selectedBodega) {
    InventarioMantenientoServices.getComboBoxProducto(selectedBodega)
      .then((response) => {
        setDataProductos(response.data.results);
        setLoadedProducto(true);
      })
      .catch((error) => {
        console.error('Error al obtener los Productos:', error);
      });
    // }
  }, [selectedBodega]);




  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Añadir al Inventario
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='idUsuarioRegistro'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='idUsuarioRegistro'
                    label='Id usuario registro'
                    disabled
                    error={Boolean(errors.tipoConexion)}
                    helperText={errors.tipoConexion ? errors.tipoConexion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='fechaRegistro'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='fechaRegistro'
                    label='Fecha del registro'
                    disabled
                    error={Boolean(errors.fechaLanzamiento)}
                    helperText={errors.fechaLanzamiento ? errors.fechaLanzamiento.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }} >
              {loadedBodegas && (
                <Controller
                  name='idBodega'
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectedBodega
                        field={field}
                        data={dataBodegas}
                        error={Boolean(errors.idBodega)}
                        setSelectedBodega={setSelectedBodega}
                      />
                      <FormHelperText sx={{ color: '#d32f2f' }}>
                        {errors.idBodega ? errors.idBodega.message : ''}
                      </FormHelperText>
                    </>
                  )}
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {producto && (
                <Controller
                  name='idProducto'
                  control={control}
                  render={({ field }) => (
                    <>
                      <Producto
                        field={field}
                        data={dataProductos}
                        error={Boolean(errors.idProducto)}
                      />
                      <FormHelperText sx={{ color: '#d32f2f' }}>
                        {errors.idProducto ? errors.idProducto.message : ''}
                      </FormHelperText>
                    </>
                  )}
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 3 }}>
              <Controller
                name='cantidadDisponible'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='nombre'
                    type="number"
                    label='Cantidad Disponible'
                    error={Boolean(errors.cantidadDisponible)}
                    helperText={errors.cantidadDisponible ? errors.cantidadDisponible.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 3 }}>
              <Controller
                name="cantidadMinima"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cantidad Mínima"
                    type="number"
                    variant="outlined"
                    error={!!errors.cantidadMinima}
                    helperText={errors.cantidadMinima?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 3 }}>
              <Controller
                name="cantidadMaxima"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Cantidad Máxima"
                    variant="outlined"
                    error={!!errors.cantidadMaxima}
                    helperText={errors.cantidadMaxima?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary'>
              Añadir
            </Button>
          </Grid>
        </Grid>
      </form>
      <Toaster />
    </>
  );
} 
