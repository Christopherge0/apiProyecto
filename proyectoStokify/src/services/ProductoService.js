  import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'Producto';
class ProductoService{
//Definición para Llamar al API y obtener el listado de productos
//localhost:81/apiProyecto/Producto
getProductos(){
return axios.get(BASE_URL);
}
//Obtener un producto
//http://localhost:81/apiProyecto/Producto/2
getProductoById(id){
    return axios.get(BASE_URL+"/getProductoCategoria/"+id)
  }
}
export default new ProductoService();