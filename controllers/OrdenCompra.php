<?php
class OrdenCompra
{
    public function index()
    {
        $orden = new OrdenCompraModel();
        $response = $orden->all();
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No hay registros"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
    }
    public function get($id)
    {
        //Instancia del modelo
        $orden = new OrdenCompraModel();
        //Acción del modelo a ejecutar
        $response = $orden->get($id);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            //Armar el JSON respuesta satisfactoria
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            //JSON respuesta negativa
            $json = array(
                'status' => 400,
                'results' => "No existe el recurso solicitado"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
    
    public function getOrdenDetalle($param)
    {
        $productos = new OrdenCompraModel();
        $response = $productos->allOrdenes($param);
        //Si hay respuesta
        if(isset($response) && !empty($response)){
        //Armar el json
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }
}