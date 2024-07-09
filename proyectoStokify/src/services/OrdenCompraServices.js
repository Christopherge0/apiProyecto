import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'OrdenCompra';
class OrdenCompraService{
//Definición para Llamar al API y obtener el listado de ordenes
//localhost:81/apiProyecto/Producto
getOrdenCompras(){
return axios.get(BASE_URL);
}
//Obtener un producto
//http://localhost:81/apiProyecto/OrdenDetalle/2
getOrdenCompraById(id){
    return axios.get(BASE_URL+"/getOrdenDetalle/"+id)
  }
}

export default new OrdenCompraService();