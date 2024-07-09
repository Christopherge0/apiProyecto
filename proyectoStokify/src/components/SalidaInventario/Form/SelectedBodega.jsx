import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

// Definición de propiedades para el componente SelectedBodega
SelectedBodega.propTypes = {
  data: PropTypes.array,
  field: PropTypes.string,
  setSelectedBodega: PropTypes.func.isRequired, // Asegurarnos que setSelectedBodega sea una función requerida
};

// Componente funcional SelectedBodega
export function SelectedBodega({ field, data, setSelectedBodega }) {
  // Manejador para eventos de cambio
  const handlechange = (event) => {
    setSelectedBodega(event.target.value);
    field.onChange(event);
  };

  // Renderizado del componente
  return (
    <>
      <InputLabel id="bodega-label">Bodegas</InputLabel>
      <Select
        labelId="bodega-label"
        id="bodega-select"
        label="Bodegas"
        defaultValue={[]} // Establecer un array vacío para selecciones múltiples
        onChange={handlechange} // Agregar el evento onchange
      >
        {data.map((bodega) => (
          <MenuItem 
            key={bodega.idBodega}
            value={bodega.idBodega}>
              {bodega.nombre}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
