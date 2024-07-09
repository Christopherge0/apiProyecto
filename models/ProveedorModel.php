<?php
class ProveedorModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT * FROM proveedor;";
			
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
			$vSql = "SELECT * FROM proveedor where id=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function getProvedor($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM proveedor where id=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            if (!empty($vResultado)) {
                //Obtener objeto
                $vResultado = $vResultado[0];
                $Producto = $this->getProvedors($id);
                $vResultado->provedorContacto = $Producto;

            }
            return $vResultado;
			// Retornar el objeto
			
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    public function getProvedors($id)
    {

        try {
            //Consulta sql
            $vSql = "select * from proveedorContacto where idProveedor = $id;";

            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public function create($objeto)
    {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $sql = "INSERT INTO proveedor (nombre, provincia, canton, distrito, direccionExacta) " .
                "VALUES ('$objeto->nombre', '$objeto->provincia', " .
                "'$objeto->canton', '$objeto->distrito', '$objeto->direccionExacta')";
            //Ejecutar la consulta
            //Obtener ultimo insert
            $idProvedor=$this->enlace->executeSQL_DML_last($sql);

            //--- Actores ---
            //Crear elementos a insertar en actores
            foreach ($objeto->provedorContacto as $item) {
                $sql = "INSERT INTO proveedorContacto (idProveedor, nombre, telefono, correo) " .
                "VALUES ($idProvedor, '$item->nombre', '$item->telefono','$item->correo' )";
                $vResultadoA= $this->enlace->executeSQL_DML($sql);
            }
            //Retornar pelicula
            return $this->get($idProvedor);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    public function update($objeto)
    {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $sql =$query = "UPDATE proveedor SET nombre ='$objeto->nombre', provincia ='$objeto->provincia', canton ='$objeto->canton', distrito ='$objeto->distrito', direccionExacta ='$objeto->direccionExacta' WHERE id=$objeto->id";

            //Ejecutar la consulta
            //Obtener ultimo insert
            $idProvedor=$this->enlace->executeSQL_DML_last($sql);
            $sql="Delete from proveedorContacto Where idProveedor=$objeto->id";
            $gResults=$this->enlace->executeSQL_DML($sql);
            //--- Actores ---
            //Crear elementos a insertar en actores
            foreach ($objeto->provedorContacto as $item) {
                $sql = "INSERT INTO proveedorContacto (idProveedor, nombre, telefono, correo) " .
                "VALUES ($objeto->id, '$item->nombre', '$item->telefono','$item->correo' )";
                $vResultadoA= $this->enlace->executeSQL_DML($sql);
            }
            //Retornar pelicula
            return $this->get($objeto->id);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    
}