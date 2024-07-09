import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'InventarioAll';
class InventarioMantenientoServices{
//Definición para Llamar al API y obtener el listado de productos
//localhost:81/apiProyecto/Producto
    getInventarioAll(){
        return axios.get(BASE_URL);
    }
    getInventarioAllById(id){
        return axios.get(BASE_URL+"/"+id)
    }
    getComboBoxBodega(id){
        return axios.get(BASE_URL+"/ComboBoxBodega/"+id)
    }
    getComboBoxProducto(id){
        return axios.get(BASE_URL+"/ComboBoxProducto/"+id)
    }
    getNombreUsuario(id){
        return axios.get(BASE_URL+"/NombreUsuario/"+id)
    }
    create(data){
        return axios.post(BASE_URL, data);
    }
    update(data){
        return axios.put(BASE_URL, data);
    }
}
export default new InventarioMantenientoServices();