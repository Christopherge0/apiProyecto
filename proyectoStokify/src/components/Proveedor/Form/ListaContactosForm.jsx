import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import Tooltip from '@mui/material/Tooltip';

import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

ListaContactosForm.propTypes = {
  data: PropTypes.array,
  control: PropTypes.object,
  index: PropTypes.number,
  onRemove: PropTypes.func,
  disableRemoveButton: PropTypes.bool,
  field: PropTypes.object,
};

export function ListaContactosForm({
  control,
  index,
  onRemove,
  disableRemoveButton,
  // eslint-disable-next-line no-unused-vars
  field,
}) {
  return (
    <section key={index}>
      <List sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ListItem>
          <ListItemIcon>
            <Tooltip title={`Contactos ${index + 1}`}>
              <IconButton>
                <PermContactCalendarOutlinedIcon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <Controller
            key={index}
            name={`provedorContacto.${index}.nombre`}
            control={control}
            render={({ field }) => (
              <TextField {...field} label='Nombre' size="medium" sx={{ width: '300px' }} />
            )}
          />
        </ListItem>
        <ListItem>
          <Controller
            key={index}
            name={`provedorContacto.${index}.telefono`}
            control={control}
            render={({ field }) => (
              <TextField {...field} label='Teléfono' size="medium" sx={{ width: '300px' }} />
            )}
          />
        </ListItem>
        <ListItem>
          <Controller
            key={index}
            name={`provedorContacto.${index}.correo`}
            control={control}
            render={({ field }) => (
              <TextField {...field} label='Correo' size="medium" sx={{ width: '300px' }} />
            )}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Tooltip title={`Eliminar Contacto ${index + 1}`}>
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
          </ListItemIcon>
        </ListItem>
      </List>
    </section>
  );
}