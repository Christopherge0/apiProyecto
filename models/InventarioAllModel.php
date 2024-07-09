<?php
class InventarioAllModel
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
			$vSql = "SELECT * FROM inventario WHERE idInventario = $id;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) 
        {
			die ( $e->getMessage () );
		}
    }
    
    public function ComboBoxBodega($id)
    {
        try 
        {
            $vSql = "SELECT bodegausuario.*, bodega.nombre , bodegausuario.idUsuario
            FROM bodegausuario 
            JOIN bodega ON bodegausuario.idBodega = bodega.id
            WHERE bodegausuario.idUsuario = $id;";
            //Ejecutar la consulta sql
            $vResultado = $this->enlace->executeSQL($vSql);
            return $vResultado;
			// Retornar el objeto
        }catch (Exception $e) {
            die($e->getMessage());
        }
    }   
    public function ComboBoxProducto($id){
        try {
            //Consulta sql
			$vSql = " SELECT p.Id,p.nombre
            FROM producto as p
            WHERE id NOT IN (
                SELECT idProducto
                FROM inventario
                WHERE idBodega = $id
            );";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function NombreUsuario($id){
        try {
            //Consulta sql
			$vSql = "select id ,nombre from usuario where id = $id ;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $sql = "INSERT INTO inventario (idProducto, idBodega, cantidadDisponible, cantidadMinima, cantidadMaxima, idUsuarioRegistro, idUsuarioActualizacion, fechaRegistro, fechaActualizacion) ". 
                "VALUES ($objeto->idProducto, $objeto->idBodega, $objeto->cantidadDisponible, $objeto->cantidadMinima, $objeto->cantidadMaxima, $objeto->idUsuarioRegistro, $objeto->idUsuarioActualizacion, '$objeto->fechaRegistro', '$objeto->fechaActualizacion');";
            //Ejecutar la consulta
            $sql2 = "UPDATE producto
            SET cantidadStock = cantidadStock + $objeto->cantidadDisponible
            WHERE id = $objeto->idProducto;
            ";
            $vResultado = $this->enlace->executeSQL_DML_last( $sql);
            $vResultado2 = $this->enlace->executeSQL_DML_last( $sql2);
            // Retornar el objeto creado
            return $this->get($vResultado);
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    public function update($objeto)
    {
        try {
            //Consulta sql

            $sql = "UPDATE inventario 
            SET cantidadDisponible = '$objeto->cantidadDisponible',
                cantidadMinima = '$objeto->cantidadMinima',
                cantidadMaxima = '$objeto->cantidadMaxima',
                idUsuarioRegistro = '$objeto->idUsuarioRegistro',
                idUsuarioActualizacion = '$objeto->idUsuarioActualizacion',
                fechaRegistro = '$objeto->fechaRegistro',
                fechaActualizacion = '$objeto->fechaActualizacion'
                WHERE idProducto = $objeto->idProducto 
                AND idBodega = $objeto->idBodega;
            ";

            //Ejecutar la consulta
            $cResults = $this->enlace->executeSQL_DML($sql);
            //Crear elementos a insertar en generos
            //Retornar pelicula
            return $this->get($objeto->idProducto);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}