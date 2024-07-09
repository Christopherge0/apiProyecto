import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import {PageNotFound} from './components/Home/PageNotFound.jsx'
import { ListaProductos } from './components/Producto/ListaProductos.jsx'
import { DetalleProductos} from './components/Producto/DetalleProductos.jsx'
import { ListaOrdenCompra} from './components/OrdenCompra/ListaOrdenCompra.jsx'
import { DetalleOrdenCompra} from './components/OrdenCompra/DetalleOrdenCompra.jsx'
import { TablaInventario } from './components/Inventario/TablaInventario.jsx'
import { DetalleInventario } from './components/Inventario/DetalleInventario.jsx'
import { Grafico } from './components/Grafico/Grafico.jsx'
import { GraficoUnoMuchos } from './components/Grafico/GraficoUnoMuchos.jsx'
import { CrearProducto } from './components/Producto/CrearProducto.jsx'
import { ActualizarProducto } from './components/Producto/ActualizarProducto.jsx'
import { ListaProveedor } from './components/Proveedor/ListaProveedor.jsx'
import { DetalleProveedor } from './components/Proveedor/DetalleProveedor.jsx'
import { CrearProveedor } from './components/Proveedor/CrearProvedor.jsx'
import { ActualizarProveedor } from './components/Proveedor/ActualizarProveedor.jsx'
import { CrearInventario } from './components/Inventario/CrearInventario.jsx'
import { ActualizarInventario } from './components/Inventario/ActualizarInventario.jsx'
import { CrearOrdenCompra } from './components/OrdenCompra/CrearOrdenCompra.jsx'
import { TablaSalidaInventario } from './components/SalidaInventario/TablaSalidaInventario.jsx'
import { CrearSalidaInventaio } from './components/SalidaInventario/CrearSalidaInventaio.jsx'
import { DetalleSalidaInventario } from './components/SalidaInventario/DetalleSalidaInventario.jsx'

TablaSalidaInventario
const rutas=createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path:'/',
        element: <Home />
      },

      {
        path:'*',
        element:<PageNotFound />
        },

        {
          path:'/Producto',
          element:<ListaProductos />
          },

        {
            path:'/Producto/:id',
            element:<DetalleProductos />
            },
         
        {
          path:'/OrdenCompra',
          element:<ListaOrdenCompra />
        },

        {
          path:'/OrdenCompra/:id',
          element:<DetalleOrdenCompra />
        },

        {
          path:'/Inventario',
          element:<TablaInventario />
        },

        {
          path:'/Inventario/:id',
          element:<DetalleInventario />
        },
        
        {
          path: '/Grafico',
          element:<Grafico />
        },
        {
          path: '/GraficoUnoMuchos',
          element:<GraficoUnoMuchos />
        },
        {
          path: '/ProductoAll',
          element:<CrearProducto />
        },
        {
          path: '/ProductoAll/:id',
          element:<ActualizarProducto />
        },
        {
          path: '/Proveedor',
          element:<ListaProveedor />
        },
        {
          path:'/getProveedorLista/:id',
          element:<DetalleProveedor />
        },
        {
          path:'/Proveedores',
          element:<CrearProveedor />
        },
        {
          path:'/getProveedorActualizar/:id',
          element:<ActualizarProveedor />
        },
        {
          path:'/getComboBoxBodega/:id',
          element:<CrearInventario />
        },
        {
          path:'/getInventarioAllById/:id/:id2',
          element:<ActualizarInventario />
        },
        {
          path:'/CrearOrdenCompra/',
          element:<CrearOrdenCompra />
        },   
        {
          path:'/TablaSalidaInventario/',
          element:<TablaSalidaInventario />
        },
        {
          path:'/CrearSalidaInventaio/',
          element:<CrearSalidaInventaio />
        },
        {
          path:'/DetalleSalidaInventario/:id',
          element:<DetalleSalidaInventario/>
        }
        
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rutas} />
  </React.StrictMode>,
)

