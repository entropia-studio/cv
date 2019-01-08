<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents('php://input'), true);

$to = 'info@entropia.studio';
$subject = $data['subject'];
$message = $data['message'];

// To send HTML mail, the Content-type header must be set
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';

// Additional headers
$headers[] = 'To: Entropia Studio <info@entropia.studio>';

if (mail ($to,$subject,$message,implode("\r\n", $headers))){
    http_response_code(200);
}else{
    http_response_code(404);    
}


?>