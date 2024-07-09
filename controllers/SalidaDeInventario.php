<?php
class SalidaDeInventario
{
    public function index()
    {
        $productos = new SalidaDeInventarioModel();
        $response = $productos->all();
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            $json = array(
                'status' => 400,
                'result' => "no hay registros"
            );
        }
        echo json_encode(
            $json,
            http_response_code($json['status'])
        );
    }
    public function get($param)
    {
        $productos = new SalidaDeInventarioModel();
        $response = $productos->get($param);
        $json = array(
            'status'=> 200,
            'results'=>$response);
        if (isset($response) && !empty($response)) 
        {
            $json= array(
                'status'=> 200,
                'results'=>$response               
            );
        }else
        {
            $json= array(
                'status'=> 400,
                'result'=>"no hay registros"
            );
        }
        echo json_encode($json,
            http_response_code($json['status'])
        );
    }
    public function ComboBoxProducto($param)
    {
        $productos = new SalidaDeInventarioModel();
        $response = $productos->ComboBoxProducto($param);
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
    public function create()
    {
        //Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        //Decodificar json
        $object = json_decode($inputJSON);
        //Instancia del modelo
        $booking = new SalidaDeInventarioModel();
        //Acción del modelo a ejecutar
        $response = $booking->create($object);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => 'Salida realizada con éxito'
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No se creo el recurso"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
}