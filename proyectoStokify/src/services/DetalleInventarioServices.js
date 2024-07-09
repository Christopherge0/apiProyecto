import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'Inventario';
class DetalleInventario{
//Definición para Llamar al API y obtener el listado de películas
//localhost:81/apiProyecto/Producto

//Obtener un producto
//http://localhost:81/apiProyecto/Producto/2
  getInventarioById(id){
    return axios.get(BASE_URL+"/" + id)
  }
}

export default new DetalleInventario();