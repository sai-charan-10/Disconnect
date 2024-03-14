<?php
// Include your database connection file here
include 'db_connection.php';

// Assuming your database connection is established, you can proceed with the registration process
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get login data from the Axios POST request in the React app
    $data = json_decode(file_get_contents('php://input'), true);

    // Receive POST data from frontend
    $name = $data['name'];
    $email = $data['email'];
    $phoneNumber = $data['phoneNumber'];
    $password = $data['password'];

    // Validate the received data here if needed

    // Determine the appropriate database table based on the selected type
    $tableName = 'users';

    // Check if the user already exists in the database
    $sqlCheckExistingUser = "SELECT * FROM $tableName WHERE email = :email";
    $stmtCheckExistingUser = $connection->prepare($sqlCheckExistingUser);
    $stmtCheckExistingUser->bindValue(':email', $email, PDO::PARAM_STR);
    $stmtCheckExistingUser->execute();
    $result = $stmtCheckExistingUser->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // User already exists, return an error response
        $response = array('status' => 'error', 'message' => 'User with the provided email already exists. Please try logging in.');
        echo json_encode($response);
        $stmtCheckExistingUser->closeCursor();
        exit;
    }

    // Insert user data into the appropriate database table
    $sql = "INSERT INTO $tableName (username, email, phoneNumber, password) VALUES (:name, :email, :phoneNumber, :password)";
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':phoneNumber', $phoneNumber, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Registration successful
        $response = array('status' => 'success', 'message' => 'Registration successful.');
        echo json_encode($response);
    } else {
        // Registration failed
        $response = array('status' => 'error', 'message' => 'Registration failed. Please try again later.');
        echo json_encode($response);
    }

    // Close the database connection and exit
    $stmt->closeCursor();
    // Example: $connection = null;
    exit;
}
?>
