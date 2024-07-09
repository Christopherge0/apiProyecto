import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

SelectSubCategoria.propTypes = {
  data: PropTypes.array,
  field: PropTypes.object,
  selectedCategoria: PropTypes.string, 
  setSelectedSubCategoriaId: PropTypes.func.isRequired,// Nueva prop para almacenar la categoría seleccionada
};

export function SelectSubCategoria({ field, data,setSelectedSubCategoriaId, selectedCategoria, }) {
  const [filteredSubCategorias, setFilteredSubCategorias] = useState([]);

  // Filtrar subcategorías cuando cambie la categoría seleccionada
  useEffect(() => {
    if (selectedCategoria && data) {
      const filteredSubCategorias = data.filter(subCategoria => subCategoria.idCategoria === selectedCategoria);
      setFilteredSubCategorias(filteredSubCategorias);
    } else {
      setFilteredSubCategorias([]); // Resetear las subcategorías cuando no hay una categoría seleccionada
    }
  }, [selectedCategoria, data]);

  // Función para manejar el cambio de selección
  const handleChange = (event) => {
    setSelectedSubCategoriaId(event.target.value); // Actualizar el estado de selectedCategoriaId
    field.onChange(event); // Llamar al onChange del controlador de react-hook-form
  };
  return (
    <>
      <InputLabel id='subcategoria'>Sub categoría</InputLabel>
      <Select
        {...field}
        labelId='subcategoria'
        label='Sub Categoría'
        defaultValue=''
        value={field.value}
        onChange={handleChange} // Agregar el evento onChange
      >
        {filteredSubCategorias.map((subCategoria) => (
          <MenuItem key={subCategoria.id} value={subCategoria.id}>
            {subCategoria.nombre}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}