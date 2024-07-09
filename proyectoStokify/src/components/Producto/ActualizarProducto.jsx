import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriaServices from '../../services/CategoriaServices';
import SubCategoriaServices from '../../services/SubCategoriaServices';
import ProductoMantenimientoServices from '../../services/ProductoMantenimientoServices';
import { SelectSubCategoria } from './Form/SelectSubCategoria';
import { SelectCategoria } from './Form/SelectCategoria';
import { toast } from 'react-hot-toast';

export function ActualizarProducto() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCategoriaId, setSelectedCategoriaId] = useState('');
  const [selectedSubCategoriaId, setSelectedSubCategoriaId] = useState('');
  const [categoriaSKU, setCategoriaSKU] = useState('');
  const [subCategoriaSKU, setSubCategoriaSKU] = useState('');
  const [skuValue, setSkuValue] = useState(''); 


  const [values,setValores]=useState(null);
  useEffect(() => {
    if(id!=undefined && !isNaN(Number(id))){
      ProductoMantenimientoServices.getProductoMantenimientoById(id)
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

  const productoSchema = yup.object({
    nombre: yup
      .string()
   
      .required('El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    descripcion: yup
      .string()
      .required('La descripción es requerida'),
    costoUnitario: yup
      .number()
      .typeError('Solo se permiten números')
      .required('El costo unitario es requerido')
      .positive('El costo debe ser un número positivo'),
    idCategoria: yup
      .string()
      .required('La categoría es requerida'),
    idSubCategoria: yup
      .string()
      .required('La subcategoría es requerida'),
    tipoConexion: yup
      .string()
      .matches(/^[^\d]+$/, 'El tipo de conexión no puede contener números')
      .required('El tipo de conexión es requerido'),
    fechaLanzamiento: yup
      .string()
      .required('La fecha de lanzamiento es requerida'),
  });
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      id: '',
      nombre:  '',
      descripcion: '',
      costoUnitario:'',
      idCategoria: '',
      idSubCategoria:  '',
      CodigoSKU:  '',
      cantidadStock:  0,
      tipoConexion:  '',
      fechaLanzamiento:  '',
    },
    //
    values,
    resolver: yupResolver(productoSchema),
  });
  
  const [error, setError] = useState('');
  const onError = (errors, e) => console.log(errors, e);
  const onSubmit = (data) => {
      console.log(data);
      ProductoMantenimientoServices.update(data)
        .then((response) => {

          setError(response.error);
          if (response.data.results != null) {
            toast.success(response.data.results, {
              duration: 4000,
              position: 'top-center',
            });
          return navigate('/Producto');
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

  const [dataCategoria, setDataCategoria] = useState([]);
  const [loadedCategoria, setLoadedCategoria] = useState(false);
  useEffect(() => {
    CategoriaServices.getCategoria()
      .then((response) => {
        setDataCategoria(response.data.results);
        setLoadedCategoria(true);
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error);
      });
  }, []);

  const [dataSubCategoria, setDataSubCategoria] = useState([]);
  const [loadedSubCategoria, setLoadedSubCategoria] = useState(false);
  useEffect(() => {
    SubCategoriaServices.getSubCategoria()
      .then((response) => {
        setDataSubCategoria(response.data.results);
        setLoadedSubCategoria(true);

      })
      .catch((error) => {
        console.error('Error al obtener las subcategorías:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategoriaId) {
      
      const filteredSubCategorias = dataSubCategoria.filter(subCategoria => subCategoria.idCategoria === selectedCategoriaId);
      setValue('idSubCategoria', ''); 
      setDataSubCategoria(filteredSubCategorias);
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ setValue]);

  useEffect(() => {
    const categoria = dataCategoria.find(c => c.id === selectedCategoriaId);
    if (categoria) {
      setCategoriaSKU(categoria.SKU);
    }
  }, [selectedCategoriaId, dataCategoria,setValue ]);

  useEffect(() => {
    const subCategoria = dataSubCategoria.find(sc => sc.id === selectedSubCategoriaId);
    if (subCategoria) {
      setSubCategoriaSKU(subCategoria.SKU);
    }
  }, [selectedSubCategoriaId, dataSubCategoria]);

  useEffect(() => {
    if (selectedCategoriaId && selectedSubCategoriaId) {
      // Asegurarse de que el ID siempre tenga dos dígitos
      const formattedId = id.padStart(2, '0');
      const sku = `${categoriaSKU}_${subCategoriaSKU}_${formattedId}`;
      setValue('CodigoSKU', sku);
      setSkuValue(sku);
    }
    
  }, [selectedCategoriaId, selectedSubCategoriaId, categoriaSKU, subCategoriaSKU, id, setValue]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              Actualizar Producto
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='id'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='id'
                    label='Id del producto'
                     disabled
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='nombre'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='nombre'
                    label='Nombre'
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='descripcion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='descripcion'
                    label='Descripción'
                    error={Boolean(errors.descripcion)}
                    helperText={errors.descripcion ? errors.descripcion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='costoUnitario'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='costoUnitario'
                    label='Costo unitario'
                    error={Boolean(errors.costoUnitario)}
                    helperText={errors.costoUnitario ? errors.costoUnitario.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='tipoConexion'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='tipoConexion'
                    label='Tipo de conexión'
                    error={Boolean(errors.tipoConexion)}
                    helperText={errors.tipoConexion ? errors.tipoConexion.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='fechaLanzamiento'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='fechaLanzamiento'
                    label='Fecha de lanzamiento'
                    error={Boolean(errors.fechaLanzamiento)}
                    helperText={errors.fechaLanzamiento ? errors.fechaLanzamiento.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='cantidadStock'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='cantidadStock'
                    label='Cantidad en el almacen'
                    value={0}  // Establecer el valor predeterminado en 0
                    readOnly  // Hacer que el campo sea de solo lectura
                    error={Boolean(errors.cantidadStock)}
                    helperText={errors.cantidadStock ? errors.cantidadStock.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {loadedCategoria && (
                <Controller
                  name='idCategoria'
                  control={control}
                  render={({ field }) => (
                    <SelectCategoria
                      field={field}
                      data={dataCategoria}
                      error={Boolean(errors.id)}
                      setSelectedCategoriaId={setSelectedCategoriaId} 
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.idCategoria ? errors.idCategoria.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              {loadedSubCategoria && (
                <Controller
                  name='idSubCategoria'
                  control={control}
                  render={({ field }) => (
                    <SelectSubCategoria
                      field={field}
                      data={dataSubCategoria}
                      selectedCategoria={selectedCategoriaId}
                      setSelectedSubCategoriaId={setSelectedSubCategoriaId} 
                      error={Boolean(errors.id)}
                    />
                  )}
                />
              )}
              <FormHelperText sx={{ color: '#d32f2f' }}>
                {errors.idSubCategoria ? errors.idSubCategoria.message : ' '}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='CodigoSKU'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='codigoSKU'
                    label='Código SKU'
                    value={skuValue} 
                    data ={skuValue}  // Mostrar el valor del SKU desde la variable skuValue
                    error={Boolean(errors.cantidadStock)}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
