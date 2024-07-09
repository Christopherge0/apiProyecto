import axios from 'axios';
//Base de puerto 80 y el nombre de lo que sigue en el postman en este caso Grafico
const BASE_URL = import.meta.env.VITE_BASE_URL + 'Grafico';

class GraficoServices {

  getGrafico() {
    return axios.get(BASE_URL);
  }

  
}

export default new GraficoServices();
