<?php

class OrdenCompraModel
{
    public $enlase;
    public function __construct()
    {
        $this->enlase = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT
            ordenCompra.id,
            ordenCompra.fechaGeneracion,
            ordenCompra.fechaRecepcion,
            ordenCompra.idProveedor,
            proveedor.nombre AS proveedorNombre,
            ordenCompra.idBodega,
            bodega.nombre AS bodegaNombre,
            ordenCompra.idUsuarioRegistro,
            usuario.nombre AS usuarioNombre,
            usuario.email AS usuarioEmail,
            usuario.telefono AS telefonoUsuario,
            estadoOrdenCompra.id AS idEstadoOrden,
            estadoOrdenCompra.descripccion AS estadoOrdenNombre
        FROM ordenCompra
        INNER JOIN proveedor ON ordenCompra.idProveedor = proveedor.id
        INNER JOIN bodega ON ordenCompra.idBodega = bodega.id
        INNER JOIN usuario ON ordenCompra.idUsuarioRegistro = usuario.id
        INNER JOIN estadoOrdenCompra ON ordenCompra.estado = estadoOrdenCompra.id
        ORDER BY ordenCompra.id DESC;";
            //Ejecutar la consulta
            $vResultado = $this->enlase->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function get($id)
    {

        try {
            //Consulta sql
            $vSql = "SELECT * FROM ordencompra where id=$id;";

            //Ejecutar la consulta
            $vResultado = $this->enlase->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado[0];
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function allOrdenes($id)
    {
        try {

            $vSql = "SELECT 
            ordenCompra.id, 
            ordenCompra.fechaGeneracion, 
            ordenCompra.fechaRecepcion, 
            ordenCompra.idProveedor, 
            proveedor.nombre AS proveedorNombre, 
            ordenCompra.idBodega, 
            bodega.nombre AS bodegaNombre, 
            ordenCompra.idUsuarioRegistro AS idUsuarioRegistro, 
            usuario1.nombre AS usuarioNombre, 
            usuario1.email AS usuarioEmail,
            usuario1.telefono AS telefonoUsuario,
            usuario2.id AS idUsuarioQuienRecibe,
            usuario2.nombre AS usuarioNombreQuienRecibe,
            usuario2.email AS usuarioEmailQuienRecibe,
            usuario2.telefono AS telefonoUsuarioQuienRecibe,
            estadoOrdenCompra.id AS idEstadoOrden,
            estadoOrdenCompra.descripccion AS estadoOrdenNombre
        FROM ordenCompra 
        INNER JOIN proveedor ON ordenCompra.idProveedor = proveedor.id
        INNER JOIN bodega ON ordenCompra.idBodega = bodega.id
        INNER JOIN usuario AS usuario1 ON ordenCompra.idUsuarioRegistro = usuario1.id
        INNER JOIN usuario AS usuario2 ON ordenCompra.idUsuarioResepccion = usuario2.id
        INNER JOIN estadoOrdenCompra ON ordenCompra.estado = estadoOrdenCompra.id
        WHERE ordenCompra.id = $id;";
            $vResultado = $this->enlase->executeSQL($vSql);
            if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];
                $Producto = $this->getOrdenDetalle($id);
                $vResultado->Productos = $Producto;

            }
            return $vResultado;

        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function getOrdenDetalle($id)
    {
        try {
            $vSql = "SELECT 
                detalleOrdenCompra.idProducto,
                producto.nombre AS productoNombre,
                producto.descripcion AS productoDescripcion,
                producto.costoUnitario,
                detalleOrdenCompra.cantidad,
                subCategoria.nombre AS subCategoriaNombre,
                categoria.nombre AS categoriaNombre
                FROM  detalleOrdenCompra 
                INNER JOIN producto ON detalleOrdenCompra.idProducto = producto.id
                INNER JOIN subCategoria ON producto.idSubCategoria = subCategoria.id
                INNER JOIN categoria ON subCategoria.idCategoria = categoria.id
                WHERE detalleOrdenCompra.idOrdenCompra = $id;";
            $vResultado = $this->enlase->executeSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    
}

