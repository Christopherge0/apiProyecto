import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { toast, Toaster } from 'react-hot-toast';
import SalidaInventarioServises from '../../services/SalidaInventarioServises';
import InventarioMantenientoServices from '../../services/InventarioMantenientoServices';
import { SelectedBodega } from './Form/SelectedBodega';
import { Compras } from './Form/Compras';
import { useNavigate } from 'react-router-dom';

export function CrearSalidaInventaio() {
  const navigate = useNavigate();
  const formattedDateTime = (() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  })();

  const id = 118160876;

  const [selectedBodega, setSelectedBodega] = useState(null);

  const inventarioSchema = yup.object().shape({
    idBodega: yup.string().required('Seleccione una bodega'),
    observacion: yup.string().required('La observación es requerida'),
    detalleProducto: yup.array().of(yup.object().shape({
      idProducto: yup.string().required('Seleccione un producto'),
      cantidad: yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser mayor que 0')
        .test('maxCantidad', 'La cantidad debe ser menor o igual a la cantidad disponible', function(value) {
          const cantidadDisponible = parseFloat(this.parent.cantidadDisponible);
          return value <= cantidadDisponible;
        })
        .required('La cantidad es requerida'),
      cantidadDisponible: yup.number().required('La cantidad disponible es requerida'),
    })),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      idBodega: '',
      idUsuarioRegistro: id,
      fechaSalida: formattedDateTime,
      observacion: '',
      detalleProducto: [
        {
          idProducto: '',
          cantidadDisponible: '',
          cantidad: 1,
          precio: 0,
          subtotal: 0,
        },
      ],
    },
    resolver: yupResolver(inventarioSchema),
  });

  const [error, setError] = useState('');
  const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (data) => {
    if (!data.idBodega || !data.observacion) {
      toast.error('Por favor complete todos los campos obligatorios.');
      return;
    }

    SalidaInventarioServises.create(data)
      .then((response) => {
        setError(response.error);
        if (response.data.results != null) {
          toast.success(response.data.results, {
            duration: 4000,
            position: 'top-center',
          });
          return navigate('/TablaSalidaInventario');
        }
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
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
    SalidaInventarioServises.getComboBoxProducto(selectedBodega)
      .then((response) => {
        setDataProductos(response.data.results);
        setLoadedProducto(true);
      })
      .catch((error) => {
        console.error('Error al obtener los Productos:', error);
      });
  }, [selectedBodega]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detalleProducto',
  });

  const removeProducto = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };

  const addNewProducto = () => {
    append({
      idProducto: '',
      cantidadDisponible: '',
      cantidad: 1,
      precio: 0,
      subtotal: 0,
    });
  };

  const watchReservas = watch('detalleProducto');

  const handleInputChange = (index, name, value) => {
    let total = 0;
    let subtotal = 0;

    if (dataProductos && name === `detalleProducto.${index}.idProducto` && value) {
      let producto = dataProductos.find((item) => item.idProducto === value);
      setValue(`detalleProducto.${index}.precio`, producto.precio);
      setValue(`detalleProducto.${index}.cantidadDisponible`, producto.cantidadDisponible);
    }

    if (watchReservas[index]) {
      subtotal = parseFloat(watchReservas[index].cantidad) * parseFloat(watchReservas[index].precio);
      setValue(`detalleProducto.${index}.subtotal`, subtotal);
    }

    watchReservas.forEach((item) => {
      total += item.subtotal;
    });

    setValue('total', total);
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Salida del Inventario
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
                name='fechaSalida'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='fechaSalida'
                    label='Fecha de la salida'
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
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='observacion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='observacion'
                    label='Observacion'
                    error={Boolean(errors.observacion)}
                    helperText={errors.observacion ? errors.observacion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant='h6' gutterBottom>
              Productos
              <Tooltip title='Agregar Producto'>
                <span>
                  <IconButton color='secondary' onClick={addNewProducto}>
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Typography>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='Reservas'>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#5271FF' }}>
                      <TableCell>#</TableCell>
                      <TableCell style={{ width: 400 }}>Producto</TableCell>
                      <TableCell>Cantidad En Bodega</TableCell>
                      <TableCell>Pedido</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Subtotal</TableCell>
                      <TableCell>Eliminar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {producto &&
                      fields.map((field, index) => (
                        <Compras
                          name='detalleProducto'
                          field={field}
                          data={dataProductos}
                          key={field.id}
                          index={index}
                          onRemove={removeProducto}
                          handleChange={handleInputChange}
                          control={control}
                          disableRemoveButton={fields.length === 1}
                          error={Boolean(errors.detalleProducto?.[index]?.cantidad)}
                          helperText={errors.detalleProducto?.[index]?.cantidad && "La cantidad debe ser menor o igual a la cantidad disponible"}
                        />
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow
                      sx={{ borderTop: 'solid', borderColor: '#5271FF' }}
                    >
                      <TableCell
                        colSpan={4}
                        align='right'
                        sx={{ color: '#5271FF', fontWeight: 800 }}
                      >
                        <Typography variant='h6' component='h6'>
                          Total
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={5} sx='font-weigh:800' align='right'>
                        <Controller
                          name='total'
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id='total'
                              label='Total'
                              InputProps={{
                                readOnly: true,
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    &cent;
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
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
