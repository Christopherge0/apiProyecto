<?php
class Producto
{
    public function index()
    {
        $productos =  new ProductoModel();
        $response = $productos->all();
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
                'result'=>"no hay Rejistros"
            );
        }
        echo json_encode($json,
                http_response_code($json['status'])
            );
    }
    public function get($param)
    {
        $productos = new ProductoModel();
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
    public function getProductoCategoria($param)
    {
        $productos = new ProductoModel();
        $response = $productos->getProductoCategoria($param);
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