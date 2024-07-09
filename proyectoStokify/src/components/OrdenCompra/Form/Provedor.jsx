import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

// Definición de propiedades para el componente SelectedBodega
Provedor.propTypes = {
  data: PropTypes.array,
  field: PropTypes.string,

};

// Componente funcional SelectedBodega
export function Provedor({ field, data,  }) {
  // Manejador para eventos de cambio
  const handlechange = (event) => {

    field.onChange(event);
  };

  // Renderizado del componente
  return (
    <>
      <InputLabel id="">Provedor</InputLabel>
      <Select
        labelId="bodega-label"
        id="bodega-select"
        label="Provedor"
        defaultValue={[]} // Establecer un array vacío para selecciones múltiples
        onChange={handlechange} // Agregar el evento onchange
      >
        {data.map((dataProvedor) => (
          <MenuItem 
            key={dataProvedor.id}
            value={dataProvedor.id}>
              {dataProvedor.nombre}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
