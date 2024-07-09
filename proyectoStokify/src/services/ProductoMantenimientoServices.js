import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'ProductoAll';
class ProductoMantenimientoServices{
//Definición para Llamar al API y obtener el listado de productos
//localhost:81/apiProyecto/Producto
getProductoMantenimiento(){
return axios.get(BASE_URL);
}
getProductoMantenimientoById(id){
  return axios.get(BASE_URL+"/"+id)
}
create(data) {
  return axios.post(BASE_URL, data);
}
update(data) {
  return axios.put(BASE_URL, data);
}

}

export default new ProductoMantenimientoServices();