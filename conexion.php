<?php 
error_reporting(E_ALL);
ini_set(display_errors, 1);


// Mysqli

$servidor = 'localhost';
$usuario = 'root';
$password = 'root';
$bd = 'unisangil2018';


$conexion = mysqli_connect($servidor, $usuario, $password, $bd);

if(mysqli_connect_errno()){
	echo "Error al conectar ". mysqli_connect_error();
}


 ?>