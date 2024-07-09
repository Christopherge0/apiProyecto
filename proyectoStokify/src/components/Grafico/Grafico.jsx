import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import GraficoServices from '../../services/GraficoServices';
import Box from '@mui/material/Box';

// Componente de React para visualizar gráficos de barras
export function Grafico() {
  // Estados para manejar los datos, la carga y los errores
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Hook useEffect para obtener datos al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener los datos de la API
    const fetchData = async () => {
      try {
        // Llamada a la API para obtener los datos
        const response = await GraficoServices.getGrafico();
        const apiData = response.data;

        // Verificar si la respuesta es exitosa
        if (apiData.status === 200) {
          // Transformar los datos para agruparlos por idOrdenCompra
          const transformedData = apiData.results.reduce((acc, item) => {
            const fecha = item.fechaGeneracionCompra;
            // Crear un nuevo grupo si no existe
            if (!acc[item.idOrdenCompra]) {
              acc[item.idOrdenCompra] = { fecha, productos: [] };
            }
            // Agregar el producto al grupo correspondiente
            acc[item.idOrdenCompra].productos.push({
              name: item.nombreProducto,
              value: parseInt(item.cantidad, 10)
            });
            return acc;
          }, {});
          // Actualizar el estado con los datos transformados
          setData(transformedData);
          setLoaded(true);
        } else {
          // Manejar errores en la respuesta
          setError('Error en la solicitud: ' + apiData.status);
          setLoaded(false);
        }
      } catch (error) {
        // Manejar errores en la obtención de datos
        console.error(error);
        setError('Error al obtener los datos del servidor');
        setLoaded(false);
      }
    };

    // Llamar a la función de obtención de datos
    fetchData();
  }, []);

  // Colores para los gráficos
  const colors = ['#68DDBD', '#5271FF'];
  // Estilos para las cajas de los gráficos
  const boxSx = {
    boxShadow: '0px 0px 5px 0px #1e716b',
    border: '1px solid #5271FF',
    borderRadius: '5px'
  };

  // Renderizar el componente
  return (
    <div>
      {/* Verificar si los datos están cargados */}
      {loaded ? (
        <div>
          {/* Mapear los datos y renderizar un gráfico para cada idOrdenCompra */}
          {Object.entries(data).map(([idOrdenCompra, { fecha, productos }], index) => (
            <div key={idOrdenCompra}>
              {/* Aplicar estilos a la caja del gráfico */}
              <Box sx={boxSx} p={2} mb={3}>
                {/* Mostrar información de la orden de compra */}
                <h3 style={{ marginBottom: '0.5em' }}>Orden de Compra: {idOrdenCompra}</h3>
                <h4 style={{ marginBottom: '0.5em' }}>Fecha: {fecha}</h4>
                {/* Renderizar el gráfico de barras */}
                <BarChart
                  xAxis={[
                    {
                      data: productos.map(item => item.name),
                      scaleType: 'band',
                    },
                  ]}
                  series={[
                    {
                      data: productos.map(item => item.value),
                      stack: '1',
                      label: 'Cantidad:',
                      color: colors[index % colors.length]
                    },
                  ]}
                  margin={{ top: 10, right: 10 }}
                  height={220}
                  slotProps={{
                    legend: {
                      hidden: true,
                    },
                  }}
                  tooltip={{ trigger: 'axis' }}
                />
              </Box>
            </div>
          ))}
        </div>
      ) : (
        // Mostrar mensaje de carga si los datos aún no están listos
        <div>Cargando...</div>
      )}
      {/* Mostrar mensaje de error si ocurre alguno */}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
