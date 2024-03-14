<?php
// Enable CORS
// Set CORS headers for all responses
header("Access-Control-Allow-Origin: *");   // Allow requests from any origin
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS"); // Allow POST, DELETE, and OPTIONS requests
header("Access-Control-Max-Age: 3600"); // Cache preflight request for 1 hour (3600 seconds)
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // Allow specified headers in requests

// Respond to preflight requests (OPTIONS method) with HTTP status code 200
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    http_response_code(200);
    exit;
}
?>