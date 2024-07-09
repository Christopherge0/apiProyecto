import { TextField, InputAdornment, TableCell, TableRow } from '@mui/material';
import { Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { Producto } from './Producto';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'; // Importa el icono del carrito de compras

Compras.propTypes = {
  data: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  handleChange: PropTypes.func,
  disableRemoveButton: PropTypes.bool,
  field: PropTypes.object,
};

export function Compras({
  data,
  control,
  index,
  onRemove,
  handleChange,
  disableRemoveButton,
  // eslint-disable-next-line no-unused-vars
  field,
}) {
  return (
    <TableRow
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='th' scope='row'>
        {index}
      </TableCell>
      <TableCell>
        <Controller
          key={index}
          name={`detalleProducto.${index}.idProducto`}
          control={control}
          render={({ field }) => (
            <Producto
              field={field}
              data={data}
              index={index}
              handleValueChange={handleChange}
              Producto
            />
          )}
        />
      </TableCell>
      <TableCell>
        <Controller
          key={index}
          name={`detalleProducto.${index}.cantidadDisponible`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Cantidad Disponible '
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon />
                  </InputAdornment>
                ),
                readOnly: true, // Hace que el campo no sea editable
              }}
              onChange={(e) => {
                field.onChange(e)
                handleChange(
                  index,
                  `detalleProducto.${index}.cantidadDisponible`,
                  e.target.value)
              }}
            />
          )}
        />
      </TableCell>
      <TableCell>
        <Controller
          key={index}
          name={`detalleProducto.${index}.cantidad`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Cantidad '
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ShoppingCartCheckoutIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                field.onChange(e)
                handleChange(
                  index,
                  `detalleProducto.${index}.cantidad`,
                  e.target.value)
              }}
            />
          )}
        />
      </TableCell>
      <TableCell>
        <Controller
          key={index}
          name={`detalleProducto.${index}.precio`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id='precio'
              label='Precio'
              InputProps={{
                readOnly: true,
                startAdornment: <InputAdornment position="start">&cent;</InputAdornment>,
              }}
            />
          )}
        />
      </TableCell>
      <TableCell>
        <Controller
          key={index}
          name={`detalleProducto.${index}.subtotal`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id='subtotal'
              label='Subtotal'
              InputProps={{
                readOnly: true,
                startAdornment: <InputAdornment position="start">&cent;</InputAdornment>,
              }}
            />
          )}
        />
      </TableCell>
      <TableCell>
        <Tooltip title={`Eliminar Producto ${index + 1}`}>
          <span>
            <IconButton
              key={index}
              edge='end'
              disabled={disableRemoveButton}
              onClick={() => onRemove(index)}
              aria-label='Eliminar'
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
