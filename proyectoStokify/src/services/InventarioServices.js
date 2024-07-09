import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'Inventario';
class Inventario{
//Definición para Llamar al API y obtener el listado de Inventario
//localhost:81/apiProyecto/Producto

//Obtener un producto
//http://localhost:81/apiProyecto/AllInventario/2
getInventario(id){
    return axios.get(BASE_URL+"/allInventario/" + id)
  }
  getInventarioById(id){
    return axios.get(BASE_URL+"/" + id)
  }


}

export default new Inventario();