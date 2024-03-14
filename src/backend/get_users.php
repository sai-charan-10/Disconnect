<?php
include 'db_connection.php';

function getUsers($currentUserId = null, $offset = 0, $limit = 10) {
    global $connection;
    // Prepare a WHERE clause to exclude the current user if currentUserId is provided
    $whereClause = '';
    if ($currentUserId !== null) {
        // Sanitize the user input (currentUserId) to prevent SQL injection
        //$currentUserId = mysqli_real_escape_string($connection, $currentUserId);
        $whereClause = " WHERE id != '$currentUserId'";
    }

    // Query to fetch users from the database, optionally excluding the current user
    $sql = "SELECT id, username FROM users" . $whereClause . " LIMIT $offset, $limit";
    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    return $users;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        $currentUserId = $data['currentUserId'];
        // Fetch job data from the database
        $users = getUsers($currentUserId);

        // Return the job data as JSON response
        $response = array('status' => 'success', 'userId'=>$currentUserId,'users' => $users);
        echo json_encode($response);
    } catch (PDOException $e) {
        // Handle any database connection or query errors
        $response = array('status' => 'error', 'message' => 'Failed to fetch users');
        echo json_encode($response);
    }
}
?>

