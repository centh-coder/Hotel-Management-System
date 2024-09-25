<?php

namespace Controller\Housekeeper;

class Housekeeper
{

    private $db;
    private $auth;

    function __construct()
    {
        $this->mkdb = new \PDO('mysql:dbname=capstone1;host=localhost;charset=utf8mb4', 'root', '');
        $this->auth = new \Delight\Auth\Auth($this->mkdb);
        $this->db = new \MeekroDB();
    }

    public function setDate()
    {

        if ($this->auth->isLoggedIn()) {
            $getData = $this->db->query("SELECT * FROM house_keeper");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getData
                ]
            );
        } else {
            echo json_encode(['login' => 0]);
        }
    }

    public function houseKeeperRecord()
    {


        // id	"75"
        // name	"miles"
        // task	"dasd"
        // area	"sdas"
        // fromDate	"2024-05-06"
        // toDate	"2024-05-28"

        // Retrieve the POST data
        $userid = $_POST['id'];
        $keeperName = $_POST['name'];
        $keeperTask = $_POST['task'];
        $keeperArea = $_POST['area'];
        //$keeperDateRange = $_POST['dateRange'];
        $keeperend = $_POST['fromDate'];
        $keeperstart = $_POST['toDate'];

        // Insert new record
        $insertedId = $this->db->insert('house_keeper', [
            'name' => $keeperName,
            'task' => $keeperTask,
            'area' => $keeperArea,
            'userId' => $userid,
            'dateend' => $keeperend,
            'datestart' => $keeperstart,
        ]);

        // Check if the insertion was successful
        if ($insertedId) {
            // Success response
            echo json_encode([
                'status' => 0,
                'inserted_id' => $insertedId
            ]);
        } else {
            // Error response
            echo json_encode([
                'status' => 1,
                'error' => 'Failed to insert data into the database'
            ]);
        }
    }


    public function updateKeeperData()
    {
        $userid = $_POST['userid'];
        $kname = $_POST['kname'];
        $ktask = $_POST['ktask'];
        $karea = $_POST['karea'];
        $kdateRange = $_POST['kdateRange'];

        $this->db->startTransaction();
        $update = $this->db->update('house_keeper', ['name' => $kname, 'task' => $ktask, 'area' => $karea, 'date' => $kdateRange,], "id=%i", $userid);
        $value = $this->db->affectedRows();
        $this->db->commit();
        $updateData = $this->db->query("SELECT * FROM house_keeper WHERE id=%i_id", ['id' => $userid]);

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
        //echo json_encode($updateData);
    }
    // houseKeeperRecord
    public function deleteScheduleRecord()
    {

        $guestArchiveId = $_POST['id'];
        $status = $this->db->query("DELETE FROM house_keeper WHERE id=%i_id", ['id' => $guestArchiveId]);
        $statusValue = ['success' => $status];
        echo json_encode($statusValue);
    }

    public function getSchedTaskRole()
    {
        $id = $this->auth->getUserId();
        $roles = $this->db->query("SELECT user_role FROM roles WHERE user_id = %i_user_id LIMIT 1", ['user_id' => $id]);

        echo json_encode([
            "roles" => $roles[0]["user_role"],
        ]);
    }

    public function scheduleTask()
    {

        if ($this->auth->isLoggedIn()) {


            $userid =  $this->auth->getuserId();

            $listoftask = $this->db->query("SELECT id, name, task, area, datestart, dateend FROM house_keeper WHERE userId = %i", $userid);

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $listoftask
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    public function deleteRecordSched()
    {

        $cleanerId = $_POST['id'];
        $status = $this->db->query("DELETE FROM house_keeper WHERE id=%i_id", ['id' => $cleanerId]);
        $statusValue = ['success' => $status];
        echo json_encode($statusValue);
    }

    public function get_keeper_role()
    {
        $id = $this->auth->getUserId();
        $roles = $this->db->query("SELECT user_role FROM roles WHERE user_id = %i_user_id LIMIT 1", ['user_id' => $id]);

        echo json_encode([
            "roles" => $roles[0]["user_role"],
        ]);
    }

    public function getUserHouseKeepers()
    {
        // Check if the user is logged in
        if ($this->auth->isLoggedIn()) {
            // Query to fetch housekeeper data
            $gethousekeeperData = $this->db->query(
                "
                SELECT u.*
                FROM users u
                JOIN roles r ON u.id = r.user_id
                WHERE r.user_role = %i",
                3
            );

            // Return the data in JSON format
            echo json_encode([
                'login' => 1,
                'userData' => $gethousekeeperData
            ]);
        } else {
            // Return a login status of 0 if the user is not logged in
            echo json_encode(['login' => 0]);
        }
    }
}
