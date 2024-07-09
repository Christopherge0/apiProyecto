import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ListaContactosForm } from "./Form/ListaContactosForm";
import ProveedorService from "../../services/ProveedorService";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export function ActualizarProveedor() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [selectedProvincia, setSelectedProvincia] = useState("");
    const [selectedCanton, setSelectedCanton] = useState("");
    const [selectedDistrito, setSelectedDistrito] = useState("");
    const [values, setValores] = useState(null);

    const proveedorSchema = yup.object().shape({
        nombre: yup.string().required("El nombre es requerido"),
        provincia: yup.string().required("La provincia es requerida"),
        canton: yup.string().required("El cantón es requerido"),
        distrito: yup.string().required("El distrito es requerido"),
        direccionExacta: yup.string().required("La dirección es requerida"),
        provedorContacto: yup.array().of(
            yup.object().shape({
                nombre: yup.string().required("El nombre del contacto es requerido"),
                telefono: yup.string().matches(/^[0-9]{8}$/, 'El teléfono debe tener 8 dígitos').required("El teléfono del contacto es requerido"),
                correo: yup.string()
                    .email("El correo electrónico del contacto debe ser válido, por ejemplo: ejemplo@dominio.com")
                    .required("El correo electrónico del contacto es requerido"),

            })
        ),
    });

    useEffect(() => {
        if (id != undefined && !isNaN(Number(id))) {
            ProveedorService.getProveedorActualizar(id)
                .then((response) => {
                    const provedorContacto = response.data.results.provedorContacto.map(
                        (item) => ({
                            nombre: item.nombre,
                            telefono: item.telefono,
                            correo: item.correo
                        })
                    );
                    response.data.results.Proveedor = provedorContacto;
                    setValores(response.data.results);
                    setSelectedProvincia(response.data.results.provincia);
                    setSelectedCanton(response.data.results.canton);
                    setSelectedDistrito(response.data.results.distrito);
                    setError(response.error);
                })
                .catch((error) => {
                    if (error instanceof SyntaxError) {
                        setError(error);
                        throw new Error("Respuesta no válida del servidor");
                    }
                });
        }
    }, [id]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: id,
            nombre: "",
            provincia: "",
            canton: "",
            distrito: "",
            direccionExacta: "",
            provedorContacto: [
                {
                    nombre: "",
                    telefono: "",
                    correo: "",
                },
            ],
        },
        values, resolver: yupResolver(proveedorSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "provedorContacto",
    });

    const removeContacto = (index) => {
        if (fields.length === 1) {
            return;
        }
        remove(index);
    };

    const addContacto = () => {
        append({
            nombre: "",
            telefono: "",
            correo: "",
        });
    };

    const handleProvinciaChange = (e) => {
        const newProvincia = e.target.value;
        setSelectedProvincia(newProvincia);
        cargarCantones(newProvincia);
        setSelectedCanton("");
        setCantones([]);
        setDistritos([]);
    };

    const handleCantonChange = (e) => {
        const newCanton = e.target.value;
        setSelectedCanton(newCanton);
        cargarDistritos(selectedProvincia, newCanton);
        setSelectedDistrito("");
        setDistritos([]);
    };

    useEffect(() => {
        const fetchProvincias = async () => {
            try {
                const response = await fetch(
                    "https://ubicaciones.paginasweb.cr/provincias.json"
                );
                if (!response.ok) {
                    throw new Error("Error fetching provincias");
                }
                const data = await response.json();
                const provinciasArray = Object.entries(data).map(([value, label]) => ({
                    value,
                    label,
                }));
                setProvincias(provinciasArray);
            } catch (error) {
                console.error("Error fetching provincias:", error);
            }
        };

        fetchProvincias();
    }, []);

    const [error, setError] = useState('');
    const onError = (errors, e) => console.log(errors, e);

    const onSubmit = async (data) => {
        console.log("Formulario:");
        console.log(data);
        try {
            // Cambiar IDs por nombres en los datos del formulario
            data.provincia = provincias.find(p => p.value === data.provincia)?.label || data.provincia;
            data.canton = cantones.find(c => c.value === data.canton)?.label || data.canton;
            data.distrito = distritos.find(d => d.value === data.distrito)?.label || data.distrito;

            const response = await ProveedorService.update(data);
            console.log(response);
            if (response.data.results != null) {
                toast.success(response.data.results, {
                    duration: 6000,
                    position: "top-center",
                });
                navigate("/proveedor");
            }
        } catch (error) {
            console.error("Error creating provider:", error);
            setError(error.message);
        }
    };

    if (error) return <p>Error: {error.message}</p>;

    const cargarCantones = async (provinciaId) => {
        try {
            const response = await fetch(
                `https://ubicaciones.paginasweb.cr/provincia/${provinciaId}/cantones.json`
            );
            if (!response.ok) {
                throw new Error("Error fetching cantones");
            }
            const data = await response.json();
            const cantonesArray = Object.entries(data).map(([value, label]) => ({
                value,
                label,
            }));
            setCantones(cantonesArray);
            setSelectedCanton("");
            setSelectedDistrito("");
        } catch (error) {
            console.error("Error fetching cantones:", error);
        }
    };

    const cargarDistritos = async (provinciaId, cantonId) => {
        try {
            const response = await fetch(
                `https://ubicaciones.paginasweb.cr/provincia/${provinciaId}/canton/${cantonId}/distritos.json`
            );
            if (!response.ok) {
                throw new Error("Error fetching distritos");
            }
            const data = await response.json();
            const distritosArray = Object.entries(data).map(([value, label]) => ({
                value,
                label,
            }));
            setDistritos(distritosArray);
            setSelectedDistrito("");
        } catch (error) {
            console.error("Error fetching distritos:", error);
        }
    };

    return (
        <>
             <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Actualizar Proveedor
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Nombre" error={Boolean(errors.nombre)} helperText={errors.nombre ? errors.nombre.message : ""} />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
            <FormControl variant="standard" fullWidth>
              <Controller
                name="provincia"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    onChange={(e) => {
                      field.onChange(e);
                      handleProvinciaChange(e);
                    }}
                    value={selectedProvincia}
                    error={Boolean(errors.provincia)}
                    placeholder="Seleccione Provincia"
                  >
                    <MenuItem value="" disabled>
                      Seleccione provincia
                    </MenuItem>
                    {provincias.map((provincia) => (
                      <MenuItem key={provincia.value} value={provincia.value}>
                        {provincia.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.provincia && (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.provincia.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
            <FormControl variant="standard" fullWidth>
              <Controller
                name="canton"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    onChange={(e) => {
                      field.onChange(e);
                      handleCantonChange(e);
                    }}
                    value={selectedCanton}
                    error={Boolean(errors.canton)}
                    placeholder="Seleccione Cantón"
                  >
                    <MenuItem value="" disabled>
                      Seleccione cantón
                    </MenuItem>
                    {cantones.map((canton) => (
                      <MenuItem key={canton.value} value={canton.value}>
                        {canton.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.canton && (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.canton.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
            <FormControl variant="standard" fullWidth>
              <Controller
                name="distrito"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectedDistrito(e.target.value);
                    }}
                    value={selectedDistrito}
                    error={Boolean(errors.distrito)}
                    placeholder="Seleccione Distrito"
                  >
                    <MenuItem value="" disabled>
                      Seleccione distrito
                    </MenuItem>
                    {distritos.map((distrito) => (
                      <MenuItem key={distrito.value} value={distrito.value}>
                        {distrito.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.distrito && (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.distrito.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <FormControl variant="standard" fullWidth>
              <Controller
                name="direccionExacta"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dirección"
                    error={Boolean(errors.direccionExacta)}
                    helperText={
                      errors.direccionExacta ? errors.direccionExacta.message : ""
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={4}>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' gutterBottom>
                Contactos
                <Tooltip title='Agregar Contacto'>
                  <span>
                    <IconButton color='secondary' onClick={addContacto}>
                      <AddIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Typography>
              <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                {
                  fields.map((field, index) => (
                    <div key={index}>
                      <ListaContactosForm
                        name='provedorContacto'
                        field={field}
                        key={field.id}
                        index={index}
                        onRemove={removeContacto}
                        control={control}
                        disableRemoveButton={fields.length === 1}
                      />
                      {/* Mostrar errores de validación para el nombre del contacto */}
                      {errors?.provedorContacto && errors?.provedorContacto[index]?.nombre && (
                        <FormHelperText sx={{ color: '#d32f2f' }}>
                          {errors?.provedorContacto[index]?.nombre?.message}
                        </FormHelperText>
                      )}

                      {/* Mostrar errores de validación para el teléfono del contacto */}
                      {errors?.provedorContacto && errors?.provedorContacto[index]?.telefono && (
                        <FormHelperText sx={{ color: '#d32f2f' }}>
                          {errors?.provedorContacto[index]?.telefono?.message}
                        </FormHelperText>
                      )}

                      {/* Mostrar errores de validación para el correo electrónico del contacto */}
                      {errors?.provedorContacto && errors?.provedorContacto[index]?.correo && (
                        <FormHelperText sx={{ color: '#d32f2f' }}>
                          {errors?.provedorContacto[index]?.correo?.message}
                        </FormHelperText>
                      )}
                    </div>
                  ))
                }
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary'>
             Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Toaster />
    </>
  );
}
