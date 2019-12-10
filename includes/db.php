<?php session_start();
    // Create connection
    $servername = "mysql80.unoeuro.com";
    $username = "malenebi_dk";
    $password = "embvej";
    $db = "malenebi_dk_db";

    $conn = new mysqli($servername, $username, $password, $db) or die("Ingen forbindelse: %s\n". $conn -> error);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>