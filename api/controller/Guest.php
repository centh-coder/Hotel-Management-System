<?php

namespace Controller\Guest;

class Guest
{

    private $db;
    private $auth;



    function __construct()
    {

        $this->mkdb = new \PDO('mysql:dbname=capstone1;host=localhost;charset=utf8mb4', 'root', '');
        $this->auth = new \Delight\Auth\Auth($this->mkdb);
        $this->db = new \MeekroDB();
    }


    public function addGuest()
    {
        $results = $this->db->insert('guest', [
            'full_name' => $_POST['fullname'],
            'address' => $_POST['address'],
            'city' => $_POST['city'],
            'country' => $_POST['country'],
            'post' => $_POST['code'],
            'contact_no' => $_POST['contact'],
            'email' => $_POST['email'],
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

    public function getDataGuest()
    {

        if ($this->auth->isLoggedIn()) {
            $getData = $this->db->query("SELECT * FROM guest WHERE deleted = 0");

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

   
    public function getGuestInputValue()
    {
        $guestEditid = $_POST['id'];

        $getGuestValue = $this->db->query("SELECT * FROM guest WHERE id=%i_id", ['id' => $guestEditid]);

        echo json_encode($getGuestValue);
    }

    public function updateGuestData()
    {

        $userid = $_POST['id'];
        $guestemail = $_POST['email'];
        $guestname = $_POST['name'];
        $guestaddress = $_POST['address'];
        $guestcity = $_POST['city'];
        $guestcountry = $_POST['country'];
        $guestpost = $_POST['code'];
        $guestcontact = $_POST['contact'];

        $this->db->startTransaction();
        $update = $this->db->update('guest', ['email' => $guestemail, 'full_name' => $guestname, 'address' => $guestaddress, 'city' => $guestcity, 'country' => $guestcountry, 'post' => $guestpost, 'contact_no' => $guestcontact], "id=%i", $userid);

        $value = $this->db->affectedRows();
        $this->db->commit();
        $updateData = $this->db->query("SELECT id, full_name, email, address, city, country, post, contact_no FROM guest WHERE id=%i_id", ['id' => $userid]);

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

    public function reservationData()
    {

        if ($this->auth->isLoggedIn()) {
            $getGuestReservationData = $this->db->query("SELECT * FROM guest");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getGuestReservationData
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    public function getGuestReservationRoomData()
    {

        if ($this->auth->isLoggedIn()) {
            $getGuestRoomStatus = $this->db->query("SELECT id, room_no, price, status FROM rooms WHERE status = 'Available'");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getGuestRoomStatus
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    public function senddeleteAchivedetails()
    {
        $guestdeletedid = $_POST['id'];
        $deleteArchive = $this->db->query("UPDATE guest SET deleted=%i WHERE id=%i", 1, $guestdeletedid);
        $deleteArchiveGuest = ['success' => $deleteArchive];
        echo json_encode($deleteArchiveGuest);
    }



    public function deleteArchive()
    {

        if ($this->auth->isLoggedIn()) {
            $achiveDelete = $this->db->query("SELECT id, full_name, address, contact_no, email FROM guest WHERE deleted = 1");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $achiveDelete
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }



    public function deleteGuestRecordArchive()
    {

        $guestArchiveId = $_POST['id'];
        $status = $this->db->query("DELETE FROM guest WHERE id=%i_id", ['id' => $guestArchiveId]);
        $statusValue = ['success' => $status];
        echo json_encode($statusValue);
    }


    public function deleteUsersArchiveRecord()
    {

        $userArchiveId = $_POST['id'];
        $status = $this->db->query("DELETE FROM users WHERE id=%i_id", ['id' => $userArchiveId]);
        $statusValue = ['success' => $status];
        echo json_encode($statusValue);
    }
}