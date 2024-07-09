import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { appTheme } from './Theme/Theme'
import { Layout } from './components/Layout/Layout'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme /> 
      <Layout> 
        <Outlet />
      </Layout>
    </ThemeProvider>
  )
}

export default App