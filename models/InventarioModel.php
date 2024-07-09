<?php
class InventarioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM inventario;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    /*Obtener */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT 
                inventario.idProducto AS idProducto,
                producto.nombre AS productoNombre,
                producto.descripcion AS productoDescripcion,
                producto.costoUnitario AS productoCosto,
                producto.sku AS productoSku,
                inventario.cantidadDisponible AS inventarioCantidadDisponible,
                inventario.cantidadMinima AS inventarioCantidadMinima,
                inventario.cantidadMaxima AS inventarioCantidadMaxima,
                categoria.nombre AS categoriaNombre,
                categoria.id AS idCategoria,
                subCategoria.nombre AS subCategoriaNombre,
                subCategoria.id AS idsubCategoria,
                inventario.idBodega AS idbodega,
                bodega.nombre AS bodegaNombre,
                bodega.dimensione AS bodegaDimension,
                bodega.capacidad AS bodegaCapacidad,
                bodega.tieneCajaSeguridad AS bodegaCajaSeguridad,
                ubicacion.nombre AS bodegaUbicacion,
                ubicacion.provincia AS bodegaProvincia,
                ubicacion.canton AS bodegaCanton,
                ubicacion.distrito AS bodegaDistrito,
                ubicacion.direccionExacta AS bodegaDireccion,
                inventario.idUsuarioRegistro AS idUsuarioRegistroInventario,
                usuario_registro.nombre AS nombreUsuarioRegistro,
                usuario_registro.email AS emailUsuarioRegistro,
                usuario_registro.telefono AS telefonoUsuarioRegistro,
                usuario_registro.estado AS estadoUsuarioRegistro,
                inventario.fechaRegistro AS fechaRegistro,
                inventario.idUsuarioActualizacion AS idUsuarioActualizacionInventario,
                usuario_actualizacion.nombre AS nombreUsuarioActualizacion,
                usuario_actualizacion.email AS emailUsuarioActualizacion,
                usuario_actualizacion.telefono AS telefonoUsuarioActualizacion,
                usuario_actualizacion.estado AS estadoUsuarioActualizacion,
                inventario.fechaActualizacion AS fechaActualizacion
                FROM inventario
                INNER JOIN bodega ON inventario.idBodega = bodega.id
                INNER JOIN ubicacion ON bodega.idUbicacion = ubicacion.id
                INNER JOIN producto ON inventario.idProducto = producto.id
                INNER JOIN subCategoria ON producto.idSubCategoria = subCategoria.id
                INNER JOIN categoria ON producto.idCategoria = categoria.id
                INNER JOIN usuario AS usuario_registro ON inventario.idUsuarioRegistro = usuario_registro.id
                INNER JOIN usuario AS usuario_actualizacion ON inventario.idUsuarioActualizacion = usuario_actualizacion.id
                WHERE inventario.idInventario = $id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) 
        {
			die ( $e->getMessage () );
		}
    }
    public function allInventario($id)
    {
        try 
        {
            $vSql =" SELECT 
            inventario.idInventario AS id,
            bodegaUsuario.idUsuario AS idUsuarioBodega, 
            rol.descripccion AS rolUsuario,
            usuario.estado AS estadoUsuario,
            bodegaUsuario.idBodega AS idBodegaUsuario, 
            bodega.id AS idBodega, 
            bodega.nombre AS nombreBodega, 
            producto.id AS idProducto,
            producto.nombre AS nombreProducto,
            producto.costoUnitario AS costoUnitarioProducto, 
            inventario.cantidadDisponible AS cantidadDisponibleInventario
        FROM usuario
        INNER JOIN rol ON usuario.idRol = rol.id
        INNER JOIN bodegaUsuario ON usuario.id = bodegaUsuario.idUsuario
        INNER JOIN bodega ON bodegaUsuario.idBodega = bodega.id
        INNER JOIN ubicacion ON bodega.idUbicacion = ubicacion.id
        INNER JOIN inventario ON bodega.id = inventario.idBodega
        INNER JOIN producto ON inventario.idProducto = producto.id
        INNER JOIN subCategoria ON producto.idSubCategoria = subCategoria.id
        INNER JOIN categoria ON subCategoria.idCategoria = categoria.id
        WHERE bodegaUsuario.idUsuario = $id
        ORDER BY bodega.id DESC;";
            $vResultado = $this->enlace->executeSQL($vSql);
            return $vResultado;
        }catch (Exception $e) {
            die($e->getMessage());
        }
    }   
}