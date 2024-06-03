<?php
header( "Access-Control-Allow-Origin: *" );
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "proyectodaw";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT idProducto, precio, nombre, imagen, equipo, stock FROM producto";
$result = $conn->query($sql);

$productos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
} else {
    echo json_encode([]);
    exit;
}

$conn->close();

echo json_encode($productos);
?>
