<?php
/* Mostrar errores */
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', "C:/xampp/htdocs/api/php_error_log");
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');
/*--- Requerimientos Clases o librerías*/
require_once "models/MySqlConnect.php";
/***--- Agregar todos los modelos*/
require_once "models/ProductoModel.php";
require_once "models/OrdenCompraModel.php";
require_once "models/DetalleOrdenModel.php";
require_once "models/ProveedorModel.php";
require_once "models/BodegaModel.php";
require_once "models/UsuarioModel.php";
require_once "models/CategoriaModel.php";
require_once "models/SubCategoriaModel.php";
require_once "models/InventarioModel.php";
require_once "models/GraficoModel.php";
require_once "models/GraficoUnoMuchosModel.php";
require_once "models/ProductoAllModel.php";
require_once "models/BodegaUsuarioModel.php";
require_once "models/InventarioAllModel.php";
require_once "models/OrdenCompraAllModel.php";
require_once "models/SalidaDeInventarioModel.php";


/***--- Agregar todos los controladores*/

require_once "controllers/ProductoControler.php";
require_once "controllers/OrdenCompra.php";
require_once "controllers/DetalleOrden.php";
require_once "controllers/Proveedor.php";
require_once "controllers/Bodega.php";
require_once "controllers/Usuario.php";
require_once "controllers/SubCategoria.php";
require_once "controllers/Categoria.php";
require_once "controllers/Inventario.php";
require_once "controllers/Grafico.php";
require_once "controllers/GraficoUnoMuchos.php";
require_once "controllers/ProductoAllControler.php";
require_once "controllers/BodegaUsuario.php";
require_once "controllers/InventarioAll.php";
require_once "controllers/OrdenCompraAll.php";
require_once "controllers/SalidaDeInventario.php";


//Enrutador
//RoutesController.php
require_once "controllers/RoutesController.php";
$index = new RoutesController();
$index->index();

