<?php

use PHPUnit\Framework\TestCase;

class IndexTest extends TestCase
{
    private $url = 'http://localhost/my_project/src/index.php';

    public function testIndexReturnsJson()
    {
        $response = file_get_contents($this->url);
        $this->assertJson($response, "La respuesta no es un JSON válido.");
        
        $data = json_decode($response, true);
        $this->assertIsArray($data, "La respuesta JSON no es un array.");
    }

    public function testIndexReturnsExpectedFields()
    {
        $response = file_get_contents($this->url);
        $data = json_decode($response, true);

        if (!empty($data)) {
            foreach ($data as $producto) {
                $this->assertArrayHasKey('idProducto', $producto, "Falta el campo 'idProducto'.");
                $this->assertArrayHasKey('precio', $producto, "Falta el campo 'precio'.");
                $this->assertArrayHasKey('nombre', $producto, "Falta el campo 'nombre'.");
                $this->assertArrayHasKey('imagen', $producto, "Falta el campo 'imagen'.");
                $this->assertArrayHasKey('equipo', $producto, "Falta el campo 'equipo'.");
                $this->assertArrayHasKey('stock', $producto, "Falta el campo 'stock'.");
            }
        } else {
            $this->assertEmpty($data, "La respuesta debería estar vacía.");
        }
    }
}
