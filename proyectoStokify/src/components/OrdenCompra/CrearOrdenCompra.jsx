import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText, } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, Toaster } from 'react-hot-toast';
import OrdenCompraAllServises from '../../services/OrdenCompraAllServises';
import InventarioMantenientoServices from '../../services/InventarioMantenientoServices';
import { SelectedBodega } from './Form/SelectedBodega';
import { Provedor } from './Form/Provedor';
import { Compras } from './Form/Compras';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import {
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
export function CrearOrdenCompra() {
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


  const id  = 118160876;

  const [selectedBodega, setSelectedBodega] = useState(null);

  const inventarioSchema = yup.object().shape({
    idProveedor: yup.string().required('Seleccione un proveedor'),
    idBodega: yup.string().required('Seleccione una bodega'),
    detalleProducto: yup.array().of(
      yup.object().shape({
        idProducto: yup.string().required('Seleccione un producto'),
        cantidad: yup.number().typeError('La cantidad debe ser un número').min(1, 'La cantidad debe ser al menos 1').required('Ingrese una cantidad'),
        precio: yup.number().min(0, 'El precio debe ser mayor o igual a 0').required('Ingrese un precio'),
        subtotal: yup.number().min(0, 'El subtotal debe ser mayor o igual a 0').required('Ingrese un subtotal'),
      })
    ),
  });
  
  
  




  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue

  } = useForm({
    defaultValues: {
      idProveedor: '',
      idBodega: '',
      idUsuarioRegistro: id,
      fechaGeneracion: formattedDateTime,
      fechaRecepcion: '0000-00-00',
      estado: '2',
      detalleProducto: [
        {
          idProducto: '',
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
    OrdenCompraAllServises.create(data)
      .then((response) => {
        console.log(data);
        console.log(response);
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
      OrdenCompraAllServises.getComboBoxProducto(selectedBodega)
      .then((response) => {
        setDataProductos(response.data.results);
        setLoadedProducto(true);
      })
      .catch((error) => {
        console.error('Error al obtener los Productos:', error);
      });
    // }
  }, [selectedBodega]);


  const [dataProvedor, setDataProvedor] = useState([]);
  const [loadedProvedor, setLoadedProvedor] = useState(false);

  useEffect(() => {
    OrdenCompraAllServises.getOrdenCompraAll(id)
      .then((response) => {
        setDataProvedor(response.data.results);
        setLoadedProvedor(true);
      })
      .catch((error) => {
        console.error('Error al obtener las Bodegas:', error);
      });
  }, []);


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detalleProducto',
  });
  // Eliminar Reserva de listado
  const removeProducto = (index) => {
    if (fields.length === 1) {
      return;
    }
    remove(index);
  };
  // Agregar un nuevo Reserva
  const addNewProducto = () => {
    append({
      idProducto: '',
      cantidad: 1,
      precio: 0,
      subtotal: 0,
    });
  };


  //Seguimiento de la variable Reservas Watch
   const watchReservas = watch('detalleProducto');

 //  OnChange para realizar los calculos
   const handleInputChange = (index, name, value) => {
     let total = 0;
     let subtotal = 0;
     //Obtener y establecer precio del producto
     if(dataProductos && 
       name == `detalleProducto.${index}.idProducto` && 
       value){
       let producto=dataProductos.find((item)=> item.idProducto == value)
       setValue(`detalleProducto.${index}.precio`,producto.precio)
     }
       //Calcular subtotal
     if(watchReservas[index]){
       subtotal=
         parseFloat(watchReservas[index].cantidad)*
         parseFloat(watchReservas[index].precio)
 
       setValue(`detalleProducto.${index}.subtotal`,subtotal)
     }
 
     //Calcular total
     watchReservas.map((item)=>{
       total+=item.subtotal
     })
     setValue('total',total)
   };

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
                name='fechaGeneracion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='fechaGeneracion'
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
              {loadedProvedor && (
                <Controller
                  name='idProveedor'
                  control={control}
                  render={({ field }) => (
                    <>
                      <Provedor
                        field={field}
                        data={dataProvedor}
                        error={Boolean(errors.idProveedor)}
                      />
                      <FormHelperText sx={{ color: '#d32f2f' }}>
                        {errors.idProveedor ? errors.idProveedor.message : ''}
                      </FormHelperText>
                    </>
                  )}
                />
              )}
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
          <Grid item xs={12} sm={12}>
            <Typography variant='h6' gutterBottom>
              Productos
              <Tooltip title='Agregar Reserva'>
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
                      <TableCell>Cantidad</TableCell>
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
                          Total{' '}
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={2} sx='font-weigh:800'>
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
              {/* Array de reservas */}
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
