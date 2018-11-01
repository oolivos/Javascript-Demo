<?php
include 'conexion.php';
if(isset($_GET)){
  $tipo = $_GET['tipo'];
  switch ($tipo) { 
    case '1':
      // SELECT de todo
      $query = "SELECT * FROM estudiantes";
      $resultado = mysqli_query($conexion, $query);
      if($resultado){
          $data = [];
          while ($estudiante = mysqli_fetch_assoc($resultado)) {
            array_push($data, $estudiante);
          }
          echo json_encode([
            'estado' => 'ok',
            'data' => $data
          ]);
      }else{
        echo json_encode([
          'estado' => 'Error',
          'mensaje' => 'Error al consultar '. mysqli_error($conexion)
        ]);
      }
      break;
    case '2':
      // DELETE del Estudiante
      $documento = $_GET['doc'];
      $sql = "DELETE FROM estudiantes WHERE identificacion = $documento ";
      if(mysqli_query($conexion, $sql)){
        echo json_encode([
          'estado' => 'ok',
          'mensaje' => 'Estudiante elimando!!'
        ]);
      }else{
        echo json_encode([
          'estado' => 'Error',
          'mensaje' => 'Error al consultar '. mysqli_error($conexion)
        ]);
      }
      break;
    default:
      // Mensaje de Error
      echo json_encode([
        'estado' => 'Error',
        'mensaje' => 'Opcion no permitida!!'
      ]);
      break;
  }
}

if (isset($_POST)) {
  $identificacion = $_POST['identificacion'];
  $nombre = $_POST['nombre'];
  $apellido = $_POST['apellido'];
  $email = $_POST['email'];

  $sql= "SELECT * FROM estudiantes WHERE identificacion = $identificacion LIMIT 1";
  if($resultado = mysqli_query($conexion, $sql)){
    if(mysqli_num_rows($resultado) > 0){
      // Actualización
      $update = "UPDATE estudiantes SET nombre = $nombre, apellido = $apellido, email = $email WHERE identificacion = $identificacion";

      if(mysqli_query($conexion, $update)){
        echo json_encode([
          'estado' => 'ok',
          'mensaje' => 'Estudiante actualizado!!'
        ]);
      }else{
        echo json_encode([
          'estado' => 'Error',
          'mensaje' => 'Error al actualizar '. mysqli_error($conexion)
        ]);
      }
    }else{
      //Nuevo
      $insert = "INSERT INTO estudiantes(identificacion, nombre,apellido, email) VALUES($identificacion, $nombre, $apellido, $email)";
      if(mysqli_query($conexion, $insert)){
        echo json_encode([
          'estado' => 'ok',
          'mensaje' => 'Estudiante creado!!'
        ]);
      }else{
        echo json_encode([
          'estado' => 'Error',
          'mensaje' => 'Error al crear '. mysqli_error($conexion)
        ]);
      }
    }
  }else{
    echo json_encode([
      'estado' => 'Error',
      'mensaje' => 'Error al consultar '. mysqli_error($conexion)
    ]);
  }
}








 ?>
