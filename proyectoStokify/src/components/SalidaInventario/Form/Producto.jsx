import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import { ListItemText, Typography } from '@mui/material';

Producto.propTypes = {
  data: PropTypes.array,
  index: PropTypes.number,
  field: PropTypes.object,
  handleValueChange: PropTypes.func
};

export function Producto({ field, data, index, handleValueChange }) {
  // Función para formatear las fechas
  return (
    <>
      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
        <InputLabel id='idProducto'>Producto</InputLabel>
        <Select
          {...field}
          labelId='idProducto'
          label='Productos Disponibles'
          defaultValue=''
          value={field.value}
           //OnChange
           onChange={(e)=>{
            field.onChange(e)
            handleValueChange(
              index,
              `detalleProducto.${index}.idProducto`,
              e.target.value)
           }}
        >
          {data &&
            data.map((showtime) => (
              <MenuItem key={showtime.idProducto} value={showtime.idProducto}>
                <ListItemText>
                  <Typography variant="subtitle2">{showtime.productoNombre}</Typography>
                
                </ListItemText>
               
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
