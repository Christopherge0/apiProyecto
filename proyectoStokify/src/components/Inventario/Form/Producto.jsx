import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

// Definición de propiedades para el componente SelectedBodega
Producto.propTypes = {
  data: PropTypes.array,
  field: PropTypes.string,

};

// Componente funcional SelectedBodega
export function Producto({ field, data }) {
  // Manejador para eventos de cambio
  const handlechange = (event) => {
   // setSelectedBodega(event.target.value);
    field.onChange(event);
  };

  // Renderizado del componente
  return (
    <>
      <InputLabel id="producto">Productos</InputLabel>
      <Select
        labelId="producto"
        id="producto-select"
        label="Producto"
        defaultValue={[]} // Establecer un array vacío para selecciones múltiples
        onChange={handlechange} // Agregar el evento onchange
      >
        {data.map((bodega) => (
          <MenuItem 
            key={bodega.Id}
            value={bodega.Id}>
              {bodega.nombre}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
