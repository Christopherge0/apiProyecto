<?php
class GraficoModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }


    public function all(){
        try {
            // Crear instancia del modelo de Categoría    
            // Consulta SQL para obtener las subcategorías y su cantidad de stock
            $vSql = " SELECT 
                detalleOrdenCompra.idOrdenCompra AS idOrdenCompra,
                detalleOrdenCompra.idProducto AS idProducto,
                producto.nombre AS nombreProducto,
                detalleOrdenCompra.cantidad AS cantidad,
                ordenCompra.fechaGeneracion AS fechaGeneracionCompra
            FROM detalleOrdenCompra
            JOIN producto ON detalleOrdenCompra.idProducto = producto.id
            JOIN ordenCompra ON detalleOrdenCompra.idOrdenCompra = ordenCompra.id;";
            // Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);  
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}