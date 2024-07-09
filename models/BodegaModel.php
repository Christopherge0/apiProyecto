<?php
class BodegaModel
{
    public $enlase;
    public function __construct()
    {
        $this->enlase = new MySqlConnect();
    }
    public function all()
    {
        try
        {
            $vsql = "SELECT * FROM bodega;";
            $vResultado = $this->enlase->ExecuteSQL ($vsql);
            return $vResultado;
        }catch (\Exception $e)
        {
            die($e->getMessage());
        }
    }
    public function get($id)
    {
        try
        {
            $vsql = "SELECT * FROM bodega where id=$id";
            $vResultado = $this->enlase->ExecuteSQL ($vsql);
            return $vResultado[0];
        }
        catch (\Exception $e)
        {
            die($e->getMessage());
        }
    }
    
}