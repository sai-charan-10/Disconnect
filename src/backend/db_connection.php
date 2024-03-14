<?php

// Enable CORS by including the enable_cors.php file
include 'enable_cors.php';

// Replace these with your actual database credentials
$host = 'localhost';
$dbname = 'saicharan';
$username = 'root';
$password = '';

try {
    $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Database connection failed, respond with an error message
    $response = array('status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage());
    http_response_code(500); // Internal Server Error
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}


?>
