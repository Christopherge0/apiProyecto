<?php

class OrdenCompraAllModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    
    public function all()
    {
        try {
            $vSql = "SELECT id ,nombre FROM proveedor";
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
            $vSql = "SELECT * FROM ordencompra where id=$id;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado[0];
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function ComboBoxProducto($id){
        try {
            //Consulta sql
			$vSql = "SELECT  p.id as idProducto, p.nombre as productoNombre, p.costoUnitario AS precio
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

            $sql = "Insert into ordenCompra (idProveedor, idBodega, fechaGeneracion, fechaRecepcion, idUsuarioRegistro,idUsuarioResepccion , estado)".
            "Values ('$objeto->idProveedor', '$objeto->idBodega', '$objeto->fechaGeneracion', '$objeto->fechaRecepcion', $objeto->idUsuarioRegistro, $objeto->idUsuarioRegistro, '$objeto->estado');";

            //Ejecutar la consulta
            //Obtener ultimo insert
            $idOrdenCompra=$this->enlace->executeSQL_DML_last($sql);

            //--- Actores ---
           //Crear elementos a insertar en actores
            foreach ($objeto->detalleProducto as $item) {
                $sql = "INSERT INTO detalleOrdenCompra (idOrdenCompra, idProducto, cantidad) " .
                "VALUES ($idOrdenCompra, '$item->idProducto', '$item->cantidad' )";
                $vResultadoA= $this->enlace->executeSQL_DML($sql);
            }
            //Retornar pelicula
            return $this->get($idOrdenCompra);
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