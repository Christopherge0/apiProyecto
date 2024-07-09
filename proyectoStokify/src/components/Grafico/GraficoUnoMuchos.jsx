import { PieChart } from '@mui/x-charts';
import { useState, useEffect } from 'react';
import GraficoServices from '../../services/GraficoUnoMuchosServices';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function GraficoUnoMuchos() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    GraficoServices.getGrafico()
      .then((response) => {
        console.log(response.data);
        setData(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setError('Error al obtener los datos del servidor');
        setLoaded(false);
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalUsuarios = data.reduce((total, item) => total + parseInt(item.cantidad_usuarios, 10), 0);

  // Definición de colores personalizados
  const colors = {
    Administrador: '#5271FF', // Color púrpura para los administradores
    Otro: '#68DDBD', // Color azul para los demás roles
  };

  const pieChartData = data.map(item => ({
    value: (parseInt(item.cantidad_usuarios, 10) / totalUsuarios) * 100,
    label: item.rol,
    // Asigna el color personalizado según el rol
    color: colors[item.rol] || colors['Otro'], // Si el rol no tiene color personalizado, usa el color 'Otro'
  }));

  return (
    <Card sx={{ boxShadow: '0px 0px 10px 3px #5271FF', textAlign: 'center', width: '50%', margin: '10% auto 0 auto' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <Typography variant="h5" component="h2" style={{ marginBottom: '20px' }}>
            Gráfico de Pastel
          </Typography>
        </div>
        <PieChart
          series={[
            {
              data: pieChartData,
            },
          ]}
          tooltip={{ trigger: 'item' }}
          height={400}
          sx={{
            '& .legend': {
              marginTop: '10px', // Ajustar el espaciado entre los cuadros de colores y el título
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
