<?php
// Replace these with your database connection details
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the userId parameter from the request data
    $data = json_decode(file_get_contents('php://input'), true);
    $senderId = $data['senderId'];
    $recipientId = $data['recipientId'];

    // Fetch the job applications for the given userId
    $query = "SELECT * FROM chat_messages WHERE (sender_id = :senderId AND recipient_id = :recipientId) OR (sender_id = :recipientId AND recipient_id = :senderId) ORDER BY timestamp";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':senderId', $senderId);
    $stmt->bindParam(':recipientId', $recipientId);

    if ($stmt->execute()) {
        $mesgs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = array(
            'status' => 'success',
            'messages' => $mesgs,
        );
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
