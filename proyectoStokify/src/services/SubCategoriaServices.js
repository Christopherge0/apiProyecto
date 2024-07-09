import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'SubCategoria';
class SubCategoriaServices{
//Definición para Llamar al API y obtener el listado de productos
//localhost:81/apiProyecto/Producto
getSubCategoria(){
return axios.get(BASE_URL);
}

}
export default new SubCategoriaServices();