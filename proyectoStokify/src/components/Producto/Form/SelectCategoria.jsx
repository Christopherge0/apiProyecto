import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectCategoria.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  setSelectedCategoriaId: PropTypes.func.isRequired, // Agregar la nueva prop
};

export function SelectCategoria({ field, data, setSelectedCategoriaId }) {
  // Filtrar elementos duplicados por categoría_id
  const uniqueData = data.filter(
    (value, index, self) =>
      index ===
      self.findIndex((item) => item.id === value.id)
  );

  const handleChange = (event) => {
    setSelectedCategoriaId(event.target.value); // Actualizar el estado de selectedCategoriaId
    field.onChange(event); // Llamar al onChange del controlador de react-hook-form
  };

  return (
    <>
      <InputLabel id='categoria'>Categoría</InputLabel>
      <Select
        {...field}
        labelId='id'
        label='Categoria'
        defaultValue=''
        value={field.value}
        onChange={handleChange} // Agregar el evento onChange
      >
        {uniqueData.map((categoria) => (
          <MenuItem
            key={categoria.id}
            value={categoria.id}
          >
            {categoria.nombre}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}