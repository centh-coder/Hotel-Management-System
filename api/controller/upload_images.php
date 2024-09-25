<?php
require_once '../../vendor/sergeytsalkov/meekrodb/db.class.php';


DB::$user = 'root';
DB::$password = '';
DB::$dbName = 'capstone1';
DB::$host = 'localhost'; // Change if your MySQL server is on a different host

// Ensure that the uploads directory exists
$uploads_dir = 'roomuploads';
if (!is_dir($uploads_dir)) {
    mkdir($uploads_dir, 0777, true);
}

// Check if roomId and files are provided
if (isset($_POST['roomId']) && !empty($_FILES['files'])) {
    $room_id = intval($_POST['roomId']);
    $files = $_FILES['files'];

    $file_count = count($files['name']);
    $errors = [];
    $successes = [];

    for ($i = 0; $i < $file_count; $i++) {
        $file_name = $files['name'][$i];
        $file_tmp = $files['tmp_name'][$i];
        $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        $allowed_exts = ["jpg", "jpeg", "png", "gif"];

        if (in_array($file_ext, $allowed_exts)) {
            $new_filename = uniqid() . '.' . $file_ext;
            $upload_path = $uploads_dir . '/' . $new_filename;

            if (move_uploaded_file($file_tmp, $upload_path)) {
                // Insert file information into the database
                DB::insert('room_gallery', [
                    'room_id' => $room_id,
                    'image_url' => $upload_path
                ]);
                $successes[] = "$file_name uploaded successfully.";
            } else {
                $errors[] = "Failed to upload $file_name.";
            }
        } else {
            $errors[] = "$file_name has an invalid file extension.";
        }
    }

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode(['successes' => $successes, 'errors' => $errors]);
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid request.']);
}
?>
