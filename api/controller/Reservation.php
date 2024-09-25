<?php

namespace Controller\Reservation;
use \DateTime;

class Reservation
{

    private $db;
    private $auth;
    private $dateTime;


    function __construct()
    {
        $this->mkdb = new \PDO('mysql:dbname=capstone1;host=localhost;charset=utf8mb4', 'root', '');
        $this->auth = new \Delight\Auth\Auth($this->mkdb);
        $this->db = new \MeekroDB();
    }

    public function submitBookingValue()
    {

        $guestId = $_POST['guestId']; 
        $checkinDate = $_POST['checkin'];
        $checkoutDate = $_POST['checkout'];

        $checkin = new DateTime($checkinDate);
        $checkout = new DateTime($checkoutDate);
        $interval = $checkin->diff($checkout);
        $days = $interval->format('%a');

        $resultGuestData = $this->db->queryFirstRow("SELECT * FROM guest WHERE id = %i", $guestId);

        $guestName = $resultGuestData['full_name'];
        $guestAddress = $resultGuestData['address'];
        $guestContact = $resultGuestData['contact_no'];
        $guestEmail = $resultGuestData['email'];
        $guestCity = $resultGuestData['city'];
        $guestPostCode = $resultGuestData['post'];
        $guestCountry = $resultGuestData['country'];

        $results = $this->db->insert('reserve_room', [
            'room_name' => $_POST['roomName'],
            'checkin' => $checkinDate,
            'checkout' => $checkoutDate,
            'adult' => $_POST['adults'],
            'status_booking' => $_POST['statusbooking'],
            'extra_pax' => $_POST['extrapax'],
            'total_price' => $_POST['totalPrice'],
            'name' => $guestName,
            'guest_id' => $_POST['guestId'],
            'room_price' => $_POST['roomPrice'],
            'email' => $guestEmail,
            'mobile_no' => $guestContact,
            'address' => $guestAddress,
            'city' => $guestCity,
            'post_code' => $guestPostCode,
            'country' => $guestCountry,
            'payment_type' => 'naa sa line 60 Reservation.php',
            'days' => $days, 
            'note' => $_POST['noteInput'],
            'payment_status' => "Not Pay",
        ]);

        if ($results) {
            echo json_encode([
                'results' => $results,
                'status' => 1,
            ]);
        } else {
            echo json_encode([
                'status' => 0,
            ]);
        }
    }

    public function submitguestValue()
    {

        if ($this->auth->isLoggedIn()) {
            $getGuestReserveRoomData = $this->db->query("SELECT * FROM reserve_room");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getGuestReserveRoomData
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }
 
    public function getuserdashboarddetails()
    {

        if ($this->auth->isLoggedIn()) {
            $getGuestRoomDataDashboard = $this->db->query("SELECT * FROM rooms");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getGuestRoomDataDashboard,
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    
    public function getViewAllGuestbtn()
	{
		$userid = $_POST['id'];
		$getValue = $this->db->query("SELECT * FROM reserve_room WHERE id=%i_id", ['id' => $userid]);
		echo json_encode($getValue);
	}

    public function getGuestInputUpdatedData()
	{
		$id = $_POST['id'];
		$bookingStatus = $_POST['bookingStatus'];
        $roomPrice = $_POST['roomPrice'];
        $adult = $_POST['adult'];
        $extraPax = $_POST['extraPax'];
        $payment = $_POST['paymentStatus'];
		$this->db->startTransaction();
		$update = $this->db->update('reserve_room', ['status_booking' => $bookingStatus, 'room_price' => $roomPrice, 'adult' =>  $adult, 'extra_pax' => $extraPax, 'payment_status' => $payment], "id=%i", $id);
		$value = $this->db->affectedRows();
		$this->db->commit();
		$updateData = $this->db->query("SELECT status_booking, room_price, adult, extra_pax, payment_status FROM reserve_room WHERE id=%i_id", ['id' => $id]);

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

    public function getGuestTotalBills()
    {

        if ($this->auth->isLoggedIn()) {
            $getGuestReservationBill = $this->db->query("SELECT name, room_name, total_price FROM reserve_room");

            echo json_encode(
                [
                    'login' => 1,
                    'userData' => $getGuestReservationBill
                ]
            );
        } else {

            echo json_encode(['login' => 0]);
        }
    }

    public function deleteGuestReservationRecord()
	{
        $reservationId = $_POST['id'];
        $deleted = $this->db->query("DELETE FROM reserve_room WHERE id=%i_id", ['id' => $reservationId]);
        $statusValue = ['success' => $deleted];
        echo json_encode($statusValue);
	}
    
    
}