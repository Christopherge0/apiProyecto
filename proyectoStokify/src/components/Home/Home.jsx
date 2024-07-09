import { useSpring, animated } from 'react-spring';
import Container from '@mui/material/Container';
import LogoImage from '../../assets/Logo.png'; // Importa la imagen

export function Home() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 5000 } // Ajusta la duración de la animación a 5000 milisegundos
  });

  const changeColor = useSpring({
    from: { filter: 'hue-rotate(0deg)' },
    to: { filter: 'hue-rotate(360deg)' },
    config: { duration: 5000, loop: true } // Cambia el color gradualmente durante 3000ms y repite indefinidamente
  });

  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <animated.div style={{ ...fadeIn, ...changeColor }}>
        <div style={{ textAlign: 'center' }}>
          <animated.img src={LogoImage} alt="Logo" style={{ width: '535px' }} />
        </div>
      </animated.div>
    </Container>
  );
}
