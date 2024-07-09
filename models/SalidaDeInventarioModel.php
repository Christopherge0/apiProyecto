<?php

class SalidaDeInventarioModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    
    public function all()
    {
        try {
            $vSql = "  SELECT s.id, s.fechaSalida, s.observacion, u.nombre AS nombre_usuario, b.nombre AS nombre_bodega
            FROM salidaInventario s
            INNER JOIN usuario u ON s.idUsuarioRegistro = u.id
            INNER JOIN bodega b ON s.idBodega = b.id;";
            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function get($id)
    {

        try {
            //Consulta sql
            $vSql = "SELECT 
            si.id AS idSalidaInventario,
            si.idBodega,
            b.nombre AS nombreBodega,
            si.fechaSalida,
            si.idUsuarioRegistro,
            u.nombre AS nombreUsuario,
            u.email, u.telefono,
            si.observacion

        FROM 
            salidaInventario si
        JOIN 
            usuario u ON si.idUsuarioRegistro = u.id
        JOIN 
            bodega b ON si.idBodega = b.id
        WHERE 
            si.id = $id;";


            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);
           if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];
                $Producto = $this->getProductos($id);
                $vResultado->producto = $Producto;
            }
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function getProductos($id)
    {

        try {
            //Consulta sql
            $vSql = "SELECT dsi.idSalidaInventario, dsi.idProducto, dsi.cantidad, p.nombre AS nombre_producto,
            p.descripcion AS descripcion_producto, p.costoUnitario AS costo_unitario
            FROM detalleSalidaInventario AS dsi
            INNER JOIN producto AS p ON dsi.idProducto = p.id
            where dsi.idSalidaInventario = $id;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function ComboBoxProducto($id){
        try {
            //Consulta sql
			$vSql = "SELECT  p.id as idProducto, p.nombre as productoNombre, p.costoUnitario AS precio, i.cantidadDisponible
            FROM producto AS p
            JOIN inventario AS i ON p.id = i.idProducto
            WHERE i.idBodega = $id;";
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function create($objeto)
    {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $sql = "INSERT INTO salidaInventario (idBodega, fechaSalida, idUsuarioRegistro, observacion) VALUES ".
            "('$objeto->idBodega', '$objeto->fechaSalida', '$objeto->idUsuarioRegistro', '$objeto->observacion');";
     
            //Ejecutar la consulta
            //Obtener ultimo insert
            $salidaInventario=$this->enlace->executeSQL_DML_last($sql);

            //--- Actores ---
           //Crear elementos a insertar en actores
           foreach ($objeto->detalleProducto as $item) {
            $sql4 = "INSERT INTO detalleSalidaInventario (idSalidaInventario, idProducto, cantidad) " .
                "VALUES ($salidaInventario, '$item->idProducto', '$item->cantidad' )";
            $sql2 = "UPDATE producto
                SET cantidadStock = cantidadStock - $item->cantidad
                WHERE id = $item->idProducto;";
            $sql3="UPDATE inventario
            SET cantidadDisponible = cantidadDisponible - $item->cantidad,
                fechaActualizacion = CURRENT_TIMESTAMP
                WHERE idProducto = '$item->idProducto'
                AND idBodega = '$objeto->idBodega';";
            $vResultadoA= $this->enlace->executeSQL_DML($sql2);
            $vResultadob= $this->enlace->executeSQL_DML($sql3);
            $vResultadoc= $this->enlace->executeSQL_DML($sql4);
        }
            //Retornar pelicula
            return $this->get($salidaInventario);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function update($objeto)
    {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $sql = "UPDATE ordenCompra SET idUsuarioResepccion ='$objeto->idUsuarioQuienRecibe', estado = 1  WHERE id=$objeto->id";

            //Ejecutar la consulta
            //Obtener ultimo insert
            $idProvedor=$this->enlace->executeSQL_DML_last($sql);
            //--- Actores ---
            //Crear elementos a insertar en actores
            foreach ($objeto->Productos as $item) {
                $sql2 = "UPDATE producto
                    SET cantidadStock = cantidadStock + $item->cantidad
                    WHERE id = $item->idProducto;";
                $sql3="UPDATE inventario
                SET cantidadDisponible = cantidadDisponible + $item->cantidad,
                    fechaActualizacion = CURRENT_TIMESTAMP
                    WHERE idProducto = '$item->idProducto'
                    AND idBodega = '$objeto->idBodega';";
                $vResultadoA= $this->enlace->executeSQL_DML($sql2);
                $vResultadob= $this->enlace->executeSQL_DML($sql3);
            }
            //Retornar pelicula
            return $this->get($objeto->id);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}