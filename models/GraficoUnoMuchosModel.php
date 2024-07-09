<?php
class GraficoUnoMuchosModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    public function all(){
        try {
            //Consulta sql
			$vSql = "SELECT r.descripccion AS rol,
            COUNT(u.id) AS cantidad_usuarios
            FROM rol r
            LEFT JOIN usuario u ON r.id = u.idRol
            GROUP BY r.descripccion;";
			
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ($vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}