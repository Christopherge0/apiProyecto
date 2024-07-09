<?php
class ProductoAllModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    public function all() {
        try {
            // Consulta SQL
            $vSql = "select * FROM producto ORDER BY id DESC;";

            // Ejecutar las consultas
            $vResultado = $this->enlace->ExecuteSQL($vSql);

            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            // Manejar la excepción
            die($e->getMessage());
        }
    }
    public function get($id)
    {
        try
        {
            $vsql = "SELECT
            id AS id,
            nombre AS nombre,
            descripcion AS descripcion,
            costoUnitario AS costoUnitario,
            idCategoria AS idCategoria,
            idSubCategoria AS idSubCategoria,
            sku AS CodigoSKU,
            cantidadStock AS cantidadStock,
            tipoConexion AS tipoConexion,
            fechaLanzamiento AS fechaLanzamiento
        FROM
            producto
        WHERE
            id = $id;";
            $vResultado = $this->enlace->ExecuteSQL ($vsql);
            return $vResultado[0];
        }
        catch (\Exception $e)
        {
            die($e->getMessage());
        }
    }
    public function create($objeto) {
        try {
            //Consulta sql
            //Identificador autoincrementable

            $sql = "Insert into producto (nombre, descripcion, costoUnitario, idSubCategoria, idCategoria, sku, cantidadStock, fechaLanzamiento, tipoConexion)".
             "Values ('$objeto->nombre', '$objeto->descripcion', $objeto->costoUnitario, $objeto->idSubCategoria, $objeto->idCategoria, '$objeto->CodigoSKU', $objeto->cantidadStock, '$objeto->fechaLanzamiento', '$objeto->tipoConexion');";


            //Ejecutar la consulta
            $vResultado = $this->enlace->executeSQL_DML_last( $sql);
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

            $sql = "UPDATE producto SET nombre='$objeto->nombre', descripcion='$objeto->descripcion', costoUnitario='$objeto->costoUnitario', idSubCategoria='$objeto->idSubCategoria', idCategoria='$objeto->idCategoria', sku='$objeto->CodigoSKU', cantidadStock='$objeto->cantidadStock', fechaLanzamiento='$objeto->fechaLanzamiento', tipoConexion='$objeto->tipoConexion' WHERE id=$objeto->id";

            //Ejecutar la consulta
            $cResults = $this->enlace->executeSQL_DML($sql);
            //Crear elementos a insertar en generos
            //Retornar pelicula
            return $this->get($objeto->id);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
}