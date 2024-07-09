import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'Proveedor';
class ProveedorService{
//Definición para Llamar al API y obtener el listado de productos
//localhost:81/apiProyecto/Producto
    getProveedor(){
        return axios.get(BASE_URL);
    }
    getProveedorById(id){
        return axios.get(BASE_URL+"/"+id)
    }
    getProveedorActualizar(id){
        return axios.get(BASE_URL+"/getProvedor/"+id)
    }
    getProveedorLista(id){
        return axios.get(BASE_URL+"/getProveedorLista/"+id)
    }
    create(data) {
        return axios.post(BASE_URL, data);
      }
    update(data) {
        return axios.put(BASE_URL, data);
    }
}
export default new ProveedorService();