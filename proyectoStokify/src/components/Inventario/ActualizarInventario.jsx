import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';

import InventarioMantenientoServices from '../../services/InventarioMantenientoServices';
import { toast } from 'react-hot-toast';

export function ActualizarInventario() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { id2 } = useParams();
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
  
  const [values,setValores]=useState(null);
  //Obtener la pelicula del API
  useEffect(() => {
    if(id!=undefined && !isNaN(Number(id))){
        InventarioMantenientoServices.getInventarioAllById(id)
      .then((response) => { 

        console.log(response)
        setValores(response.data.results);
        setError(response.error);

      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          console.log(error);
          setError(error);
          
          throw new Error('Respuesta no válida del servidor');
        }
      });
    }
  }, [id]);
  
  // Define el esquema de validación con yup
const schemacantidadMinima = yup.object().shape({
  cantidadMinima: yup.number()
    .positive('La cantidad mínima debe ser un número positivo')
    .min(0, 'La cantidad mínima debe ser mayor o igual a 0')
    .test('menor-que-maxima', 'Debe ser menor que la cantidad máxima', function (value) {
      const cantidadMaxima = parseFloat(this.parent.cantidadMaxima);
      return value < cantidadMaxima;
    })
    .required('Este campo es obligatorio'),
  cantidadMaxima: yup.number()
    .positive('La cantidad mínima debe ser un número positivo')
    .min(0, 'La cantidad máxima debe ser mayor o igual a 0')
    .test('mayor-que-minima', 'Debe ser mayor que la cantidad mínima', function (value) {
      const cantidadMinima = parseFloat(this.parent.cantidadMinima);
      return value > cantidadMinima;
    })
    .required('Este campo es obligatorio'),
});


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idProducto: '',
      idBodega:  '',
      cantidadDisponible: '',
      cantidadMinima:'',
      cantidadMaxima: '',
      idUsuarioRegistro:  '',
      idUsuarioActualizacion:  id2,
      fechaRegistro:  '',
      fechaActualizacion:  formattedDateTime,
      idInventario:  '',
    },
    //
    values,
    //resolver: yupResolver(productoSchema),
    resolver: yupResolver(schemacantidadMinima),
  });
  

  const [error, setError] = useState('');
  const onError = (errors, e) => console.log(errors, e);
  const onSubmit = (data) => {

      data.idUsuarioActualizacion = id2;
      data.fechaActualizacion = formattedDateTime;
      console.log(data);
      InventarioMantenientoServices.update(data)
        .then((response) => {

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


    

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Actualizar en Inventario
            </Typography>
          </Grid>
          <Grid item xs={20} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='idProducto'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='idProducto'
                    label='Id del producto'
                    disabled
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='idInventario'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='idInventario'
                    label='Id del inventario'
                    disabled
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='idBodega'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='idBodega'
                    label='Id de la bodega'
                    disabled
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='cantidadDisponible'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='cantidadDisponible'
                    label='Cantidad disponible'
                    disabled
                    error={Boolean(errors.descripcion)}
                    helperText={errors.descripcion ? errors.descripcion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
          <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name="cantidadMinima"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Cantidad mínima"
                    variant="outlined"
                    error={!!errors.cantidadMinima}
                    helperText={errors.cantidadMinima?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name="cantidadMaxima"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Cantidad máxima"
                    variant="outlined"
                    error={!!errors.cantidadMaxima}
                    helperText={errors.cantidadMaxima?.message}
                  />
                )}
              />
            </FormControl>
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
                    disabled
                    label='Id del usuario que registro'
                    error={Boolean(errors.fechaLanzamiento)}
                    helperText={errors.fechaLanzamiento ? errors.fechaLanzamiento.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <TextField
                id='idUsuarioActualizacion'
                label='Id del usuario que actualiza'
                value={id2 || ''}
                disabled
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
          <Grid item xs={12} sm={5}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <TextField
                id='fechaActualizacion'
                label='Fecha de actualización'
                value={formattedDateTime || ''}
                disabled
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}