<?php
class ProductoAll
{
    public function index()
    {
        $productos = new ProductoAllModel();
        $response = $productos->all();
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => $response
            );
        } else {
            $json = array(
                'status' => 400,
                'result' => "no hay Registros"
            );
        }
        echo json_encode(
            $json,
            http_response_code($json['status'])
        );
    }
    public function get($param)
    {
        $productos = new ProductoAllModel();
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
                'result'=>"no hay Registros"
            );
        }
        echo json_encode($json,
            http_response_code($json['status'])
        );
    }
    public function create()
    {
        //Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        //Decodificar json
        $object = json_decode($inputJSON);
        //Instancia del modelo
        $booking = new ProductoAllModel();
        //Acción del modelo a ejecutar
        $response = $booking->create($object);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => 'Producto Creado'
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
    public function update()
    {
        //Obtener json enviado
        $inputJSON = file_get_contents('php://input');
        //Decodificar json
        $object = json_decode($inputJSON);
        //Instancia del modelo
        $movie = new ProductoAllModel();
        //Acción del modelo a ejecutar
        $response = $movie->update($object);
        //Verificar respuesta
        if (isset($response) && !empty($response)) {
            $json = array(
                'status' => 200,
                'results' => "Producto actualizado"
            );
        } else {
            $json = array(
                'status' => 400,
                'results' => "No se actualizo el recurso"
            );
        }
        //Escribir respuesta JSON con código de estado HTTP
        echo json_encode(
            $json,
            http_response_code($json["status"])
        );
    }
}