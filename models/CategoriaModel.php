<?php
class CategoriaModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    public function all() {
        try {
            // Consulta SQL
            $vSql = "SELECT * from Categoria;";
            // Ejecutar las consultas
            $vResultado = $this->enlace->ExecuteSQL ( $vSql);
            // Retornar el objeto
            return $vResultado;
        } catch (Exception $e) {
            // Manejar la excepción
            die($e->getMessage());
        }
    }
    /*Obtener */
    public function get($id)
    {
        try {
            //Consulta sql
			$vSql = "SELECT * FROM categoria where id=$id";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado[0];
		} catch ( Exception $e ) 
        {
			die ( $e->getMessage () );
		}
    }
}