<?php
// Replace these with your database connection details
include 'db_connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the userId parameter from the request data
    $data = json_decode(file_get_contents('php://input'), true);
    $Id = $data['id'];

    // Fetch the job applications for the given userId
    $query = "SELECT username FROM users WHERE id = :Id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':Id', $Id);

    if ($stmt->execute()) {
        $mesgs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response = $mesgs[0]['username'];
    } else {
        // An error occurred while fetching the job applications
        $response = array(
            'status' => 'error',
            'message' => 'Failed to fetch job applications',
        );
    }

    $stmt->closeCursor();
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method',
    );
}
header('Content-Type: application/json');
echo json_encode($response);
?>