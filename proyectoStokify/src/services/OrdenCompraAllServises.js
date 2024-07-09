import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL+'OrdenCompraAll';
class OrdenCompraAll{
//Definición para Llamar al API y obtener el listado de Inventario
//localhost:81/apiProyecto/Producto

//Obtener un producto
//http://localhost:81/apiProyecto/AllInventario/2
  getOrdenCompraAll(){
    return axios.get(BASE_URL);
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

export default new OrdenCompraAll();