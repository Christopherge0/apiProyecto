import { Container, Grid, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
export function Footer() {
  return (
    <Toolbar
      sx={{
        px:2,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '4.5rem',
        backgroundColor: 'primary.main',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              Copyright © Derechos Reservados 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="body1">
              {`${new Date().getFullYear()}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  );
}