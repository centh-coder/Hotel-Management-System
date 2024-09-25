<?php
// ini_set('display_errors', 1);
// ini_set('display_startip_errors', 1);
// error_reporting(E_ALL);

header("access-control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once('controller/User.php');
require_once('controller/Guest.php');
require_once('controller/Room.php');
require_once('controller/Reservation.php');
require_once('controller/Housekeeper.php');

include __DIR__ . '/../vendor/autoload.php';

use Phroute\Phroute\Dispatcher;
use Phroute\Phroute\RouteCollector;

DB::$user = 'root';
DB::$password = '';
DB::$dbName = 'capstone1';


use Controller\User\User;
use Controller\Guest\Guest;
use Controller\Room\Room;
use Controller\Reservation\Reservation;
use Controller\Housekeeper\Housekeeper;

$router = new RouteCollector();

date_default_timezone_set('Asia/Manila');


$router->get('capstone/api/fetch-images', function () {
    $room = new Room();
    $room->fetchimages();
});


$router->post('capstone/api/search-rooms', function () {
    $user = new Room();
    $user->searchRooms();
});



$router->get('capstone/api/get-data-user', function () {
    $user = new User();
    $user->getUserData();

});

$router->post('capstone/api/login', function () {
    $user = new User();
    $user->login();
});

$router->get('capstone/api/logout', function () {
    $user = new User();
    $user->logout();
});

$router->post('capstone/api/register', function () {
    $user = new User();
    $user->register_user();
});

$router->post('capstone/api/resend-confirmation-for-email', function () {
    $user = new User();
    $user->resendConfirmationForEmail();
});

$router->post('capstone/api/email-password-reset', function () {
    $user = new User();
    $user->email_password_reset();
});

$router->GET('capstone/api/reset_password_varification', function () {
    $user = new User();
    $user->verifyingAnAttempt();
});

$router->GET('capstone/api/emailvarification', function () {
    $user = new User();
    $user->emailvarification();
});

$router->post('capstone/api/resend-confirmation-email', function () {
    $user = new User();
    $user->resendConfirmationForEmail();
});

$router->post('capstone/api/update-the-password', function () {
    $user = new User();
    $user->update_the_password();
});

$router->post('capstone/api/delete-user', function () {
    $user = new User();
    $user->deleteUserById();
});

$router->post('capstone/api/list-users', function () {
    $user = new User();
    $user->RetrievingAListOfRegisteredUsers();
});

$router->post('capstone/api/dashboard', function () {
    echo 'welcome to dashboard';
});

$router->post('capstone/api/add-user', function () {
    $user = new User();
    $user->addUserValue();
});

$router->POST('capstone/api/get-input-value', function () {
    $user = new User();
    $user->getInputValue();
});

$router->POST('capstone/api/update-data', function () {
    $user = new User();
    $user->getUpdatedValue();
});

$router->POST('capstone/api/delete-user-record', function () {
    $user = new User();
    $user->deleteUserRecord();
});

// $router->POST('capstone/api/archive-guest-record', function () {
//     $user = new User();
//     $user->archiveGuestRecord();

//     // echo('<pre>');
//     // print_r($_POST['id']);
//     // echo('</pre>');

// });


$router->GET('capstone/api/get-user-role', function () {
    $user = new User();
    $user->get_user_role();

});



$router->POST('capstone/api/user-reset-password', function () {
    $user = new User();
    $user->deleteUserRecord();

});

$router->POST('capstone/api/user-module-access', function () {
});

$router->POST('capstone/api/user-status', function () {
    $user = new User();
    $user->deleteUserRecord();
});

$router->get('capstone/api/get-user-details', function () {
    $user = new User();
    $user->getUserDetails();
});

$router->post('capstone/api/update-username', function () {
    $user = new User();
    $user->updateUsername();
});

$router->post('capstone/api/new-password', function () {
    $user = new User();
    $user->updateNewPassword();
});

$router->post('capstone/api/update-userRole-id', function () {
    $user = new User();
    $user->updateUserRoleId();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';
});

$router->post('capstone/api/file-upload', function () {
    $user = new User();
    $user->fileUpload();
});

$router->post('capstone/api/add-guest', function () {
    $Guest = new Guest();
    $Guest->addGuest();
});

$router->get('capstone/api/get-data-guest', function () {
    $Guest = new Guest();
    $Guest->getDataGuest();

    // echo '<pre>';
    // print_r($_GET);
    // echo '</pre>';    
});

// $router->post('capstone/api/delete-guest-record', function () {
//     $Guest = new Guest();
//     $Guest->getGuestrecord();

//     // echo '<pre>';
//     // print_r($_POST);
//     // echo '</pre>';    
// });

$router->post('capstone/api/get-guestinputvalue', function () {
    $Guest = new Guest();
    $Guest->getGuestInputValue();
});

$router->post('capstone/api/updateGuest-data', function () {
    $Guest = new Guest();
    $Guest->updateGuestData();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';    
});

$router->post('capstone/api/add-guest-room', function () {
    $Room = new Room();
    $Room->addguestroom();
});

$router->get('capstone/api/get-data-guestroom', function () {
    $Room = new Room();
    $Room->getdataguestroom();   
});

$router->post('capstone/api/delete-guestroom-record', function () {
    $Room = new Room();
    $Room->deleteguestroomrecord();

    // echo '<pre>';
    // print_r($_GET);
    // echo '</pre>';    
});

$router->post('capstone/api/get-guestroom-inputvalue', function () {
    $Room = new Room();
    $Room->getguestroominputvalue();
});

$router->post('capstone/api/updateGuestRoom-record', function () {
    $Room = new Room();
    $Room->updateGuestRoomRecord();  
});

$router->get('capstone/api/getRoomguest-data', function () {
    $Room = new Room();
    $Room->getRoomguestData();
});

$router->get('capstone/api/get-reservationData', function () {
    $Guest = new Guest();
    $Guest->reservationData();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';    
});

$router->get('capstone/api/getReservationRoomData', function () {
    $Guest = new Guest();
    $Guest->getGuestReservationRoomData();   
});

$router->post('capstone/api/submitBookingData', function () {
    $Reservation = new Reservation();
    $Reservation->submitBookingValue();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';    
});

$router->get('capstone/api/submitguestData', function () {
    $Reservation = new Reservation();
    $Reservation->submitguestValue();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';    
});

$router->get('capstone/api/getuser-dashboarddetails', function () {
    $Room = new Room();
    $Room->getuserdashboarddetails();
});

$router->get('capstone/api/get-reservation-counts', function () {
    $Room = new Room();
    $Room->getReservationCounts();
});


$router->post('capstone/api/archive-guest', function () {
    $Guest = new Guest();
    $Guest->senddeleteAchivedetails();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';    
});

$router->get('capstone/api/archive', function () {
    $Guest = new Guest();
    $Guest->deleteArchive();
});

// $router->get('capstone/api/getViewAllData', function () {
//     $Reservation = new Reservation();
//     $Reservation->getViewAllDataButton();
// });

$router->post('capstone/api/get-viewAll-guest-btn', function () {
    $Reservation = new Reservation();
    $Reservation->getViewAllGuestbtn();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';    
});

$router->post('capstone/api/update-viewAll-Data', function () {
    $Reservation = new Reservation();
    $Reservation->getGuestInputUpdatedData();
});

// $router->get('capstone/api/getuser-dashboarddetails', function () {
//     $Room = new Room();
//     $Room->getuserdashboarddetails();
// });

$router->get('capstone/api/getGuestTotalBill', function () {
    $Reservation = new Reservation();
    $Reservation->getGuestTotalBills();
});

// $router->post('capstone/api/updatePaymentStatus', function () {
//     $Reservation = new Reservation();
//     $Reservation->updatePaymentStatus();
// });

$router->post('capstone/api/delete-guest-reservation-record', function () {
    $Reservation = new Reservation();
    $Reservation->deleteGuestReservationRecord();
});


$router->get('capstone/api/users-archive', function () {
    $user = new User();
    $user->usersArchiveData();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';
});

$router->post('capstone/api/deleteGuestRecord', function () {
    $Guest = new Guest();
    $Guest->deleteGuestRecordArchive();
});

$router->post('capstone/api/deleteUserArchiveRecord', function () {
    $Guest = new Guest();
    $Guest->deleteUsersArchiveRecord();
});

$router->post('capstone/api/house-keeper-data', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->houseKeeperRecord();   
});

$router->get('capstone/api/set-Date', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->setDate();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';
});

$router->post('capstone/api/update-keeper-data', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->updateKeeperData();   
});


$router->post('capstone/api/deleteSchedRecord', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->deleteScheduleRecord();   
});

$router->get('capstone/api/get-sched-role', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->getSchedTaskRole();
});

$router->get('capstone/api/schedule', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->scheduleTask();
});

$router->post('capstone/api/deleteRecord', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->deleteRecordSched();
});

$router->GET('capstone/api/get-keeper-role', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->get_keeper_role();

});

$router->post('capstone/api/delete-image', function () {
    $Room = new Room();
    $Room->deleteRoomPics();
});

$router->post('capstone/api/upload_images.php', function () {
    $Room = new Room();
    $Room->uploadImages();
});

$router->get('capstone/api/getUserHouseKeeper', function () {
    $Housekeeper = new Housekeeper();
    $Housekeeper->getUserHouseKeepers();

    // echo '<pre>';
    // print_r($_POST);
    // echo '</pre>';    
});



$dispatcher = new Dispatcher($router->getData());
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
echo $dispatcher->dispatch($httpMethod, $uri), "\n";