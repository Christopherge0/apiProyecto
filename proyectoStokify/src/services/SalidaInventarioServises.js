import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'SalidaDeInventario';
class SalidaInventarioServises{
//Definición para Llamar al API y obtener el listado de productos
//localhost:81/apiProyecto/Producto
getSalidaInventario(){
return axios.get(BASE_URL);
}
getInventarioById(id){
  return axios.get(BASE_URL+"/"+id)
}
getComboBoxProducto(id){
  return axios.get(BASE_URL+"/ComboBoxProducto/"+id)
}
create(data) {
  return axios.post(BASE_URL, data);
}
update(data) {
  return axios.put(BASE_URL, data);
}

}

export default new SalidaInventarioServises();