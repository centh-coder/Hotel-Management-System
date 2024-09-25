<?php

namespace Controller\Room;

class Room
{

    private $db;
    private $auth;



    function __construct()
    {



        $this->mkdb = new \PDO('mysql:dbname=capstone1;host=localhost;charset=utf8mb4', 'root', '');
        $this->auth = new \Delight\Auth\Auth($this->mkdb);
        $this->db = new \MeekroDB();
    }

    public function fetchimages()
    {
        $room_id = intval($_GET['roomId']);
        $images = $this->db->query("SELECT image_url, id FROM room_gallery WHERE room_id = %i", $room_id);

        $image_data = array();
        foreach ($images as $image) {
            $image_data[] = array(
                'id' => $image['id'],
                'image_url' => $image['image_url']
            );
        }

        echo json_encode($image_data);
    }

    public function searchRooms()
    {
        $startDate = $_POST['start_date'];
        $endDate = $_POST['end_date'];
        $availableRooms = $this->getAvailableRooms($startDate, $endDate);
        echo json_encode($availableRooms);
    }

    function getAvailableRooms($startDate, $endDate)
    {
        $sql = "
        SELECT r.*, GROUP_CONCAT(rg.image_url) AS gallery_images
        FROM rooms r
        LEFT JOIN room_gallery rg ON r.id = rg.room_id
        WHERE r.status = 'Available'
        AND r.id NOT IN (
            SELECT r.id
            FROM rooms r
            INNER JOIN reserve_room rr ON r.name = rr.room_name
            WHERE (rr.checkin BETWEEN '$startDate' AND '$endDate')
                OR (rr.checkout BETWEEN '$startDate' AND '$endDate')
                OR (rr.checkin < '$startDate' AND rr.checkout > '$endDate')
                AND rr.status_booking = 'Confirmed'
        )
        GROUP BY r.id
    ";


        $availableRooms = $this->db->query($sql);
        return $availableRooms;
    }





    public function addguestroom()
    {
        $results = $this->db->insert('rooms', [
            'room_no' => $_POST['rooms'],
            'price' => $_POST['price'],
            'status' => $_POST['status'],
            'numberofpersone' => $_POST['numberofpersone'],
        ]);

        if ($results) {
            echo json_encode([
                'results' => 1,
            ]);
        } else {
            echo json_encode([
                'results' => 0,
            ]);
        }
    }

    public function getdataguestroom()
    {

        if ($this->auth->isLoggedIn()) {
            $getDataGuestRoom = $this->db->query("SELECT * FROM rooms ORDER BY create_at DESC");


            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getDataGuestRoom
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    public function deleteguestroomrecord()
    {

        $guestRoomId = $_POST['id'];

        $this->db->startTransaction();
        $this->db->query("DELETE FROM rooms WHERE id=%i_id", ['id' => $guestRoomId]);

        $status = $this->db->affectedRows();
        $this->db->commit();

        $statusValue = ['success' => $status > 0];

        echo json_encode($statusValue);
    }

    public function getguestroominputvalue()
    {

        $guestRoomEditid = $_POST['id'];

        $getGuestValue = $this->db->query("SELECT * FROM rooms WHERE id=%i_id", ['id' => $guestRoomEditid]);

        echo json_encode($getGuestValue);
    }

    public function updateGuestRoomRecord()
    {

        $guestroomid = $_POST['id'];
        $guestroomno = $_POST['roomno'];
        $guestroomprice = $_POST['price'];
        $guestroomstatus = $_POST['status'];

        $this->db->startTransaction();
        $update = $this->db->update('rooms', ['room_no' => $guestroomno, 'price' => $guestroomprice, 'status' => $guestroomstatus], "id=%i", $guestroomid);
        $value = $this->db->affectedRows();
        $this->db->commit();
        $updateData = $this->db->query("SELECT id, room_no, status, price FROM rooms WHERE id=%i_id", ['id' => $guestroomid]);

        if ($value == 1) {
            echo json_encode(
                [
                    'results' => $updateData,
                    'status' => $value
                ]
            );
        } elseif ($value == 0) {
            echo json_encode(
                [
                    'status' => $value
                ]
            );
        }
    }

    public function getRoomguestData()
    {

        if ($this->auth->isLoggedIn()) {
            $getDataGuestReserveRoom = $this->db->query("SELECT * FROM reserve_room");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getDataGuestReserveRoom
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    public function getuserdashboarddetails()
    {

        if ($this->auth->isLoggedIn()) {
            $getDataDashboardGuestReserveRoom = $this->db->query("SELECT * FROM rooms WHERE status = 'Available'");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getDataDashboardGuestReserveRoom
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    public function getReservationCounts()
    {

        $reservationCounts = [
            ["month" => "January", "reservation_count" => 10],
            ["month" => "February", "reservation_count" => 15],
            // Add more months as needed...
        ];

        // Return JSON response with reservation counts for all months
        echo json_encode(["reservationCounts" => $reservationCounts]);
    }

    public function deleteRoomPics()
    {

        $picId = $_POST['id'];
        $status = $this->db->query("DELETE  FROM room_gallery WHERE id=%i_id", ['id' => $picId]);
        $statusValue = ['success' => $status];
        echo json_encode($statusValue);
    }


    public function uploadImages()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $imageId = $_POST['imageId'];

            // Construct the path to the image directory
            $imageDir = __DIR__ . '/roomuploads/';
            // Construct the full path to the image file
            $imagePath = $imageDir . basename($imageId);

            // Validate and sanitize input
            if (filter_var($imageId, FILTER_SANITIZE_STRING)) {
                // Check if the file exists
                if (file_exists($imagePath)) {
                    // Attempt to delete the file
                    if (unlink($imagePath)) {
                        $response = ['success' => true];
                    } else {
                        $response = ['success' => false, 'message' => 'Failed to delete the file.'];
                    }
                } else {
                    $response = ['success' => false, 'message' => 'File does not exist.'];
                }
            } else {
                $response = ['success' => false, 'message' => 'Invalid image ID.'];
            }

            // Set the correct content type for JSON
            header('Content-Type: application/json');
            // Output the JSON response
            echo json_encode($response);
            // Exit to prevent any additional output
            exit;
        }
    }
}