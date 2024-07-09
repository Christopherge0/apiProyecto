import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'Categoria';
class CategoriaServices{
//Definición para Llamar al API y obtener el listado de productos
//localhost:81/apiProyecto/Producto
getCategoria(){
return axios.get(BASE_URL);
}

}
export default new CategoriaServices();