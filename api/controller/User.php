<?php

namespace Controller\User;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;


class User
{

	private $db;
	private $auth;



	function __construct()
	{

		$this->mail = new PHPMailer(true);

		$this->mkdb = new \PDO('mysql:dbname=capstone1;host=localhost;charset=utf8mb4', 'root', '');
		$this->auth = new \Delight\Auth\Auth($this->mkdb);
		$this->db = new \MeekroDB();
	}



	public function login()
	{



		try {
			$this->auth->login($_POST["email"], $_POST["password"]);
			//echo "User is logged in";

			//select the user id rules
			$id = $this->auth->getUserId();
			// $getValue = $this->db->query("SELECT * FROM users WHERE id=%i_id", ['id' => $userid]);
			$roles = $this->db->query("SELECT user_role FROM roles WHERE user_id = %i_user_id LIMIT 1", ['user_id' => $id]);


			echo json_encode([
				"result" => 1,
				"text" => 'User is logged in',
				"roles" => $roles[0]["user_role"],
			]);
		} catch (\Delight\Auth\InvalidEmailException $e) {
			//die("Wrong email address");
			echo json_encode([
				"result" => 2,
				"text" => 'invalid email address',
			]);
		} catch (\Delight\Auth\InvalidPasswordException $e) {
			//die("Wrong password");
			echo json_encode([
				"result" => 3,
				"text" => 'invalid password',
			]);
		} catch (\Delight\Auth\EmailNotVerifiedException $e) {
			//die("Email not verified");
			echo json_encode([
				"result" => 4,
				"text" => 'Email not varified',
			]);
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			//die("Too many requests");
			echo json_encode([
				"result" => 5,
				"text" => 'too many results',
			]);
		}
	}


	public function logout()
	{
		$this->auth->logOut();
		header('Location: http://localhost/capstone/login');
	}

	public function register_user()
	{

		try {
			$userId = $this->auth->register(
				$_POST["email"],
				$_POST["password"],
				$_POST["username"],
				function ($selector, $token) {
					$url = "http://localhost/capstone/api/emailvarification?selector=" .
						\urlencode($selector) .
						"&token=" .
						\urlencode($token);

					try {
						//Server settings
						// $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;
						$this->mail->SMTPDebug = false; //Enable verbose debug output
						$this->mail->isSMTP(); //Send using SMTP
						$this->mail->Host = "smtp.gmail.com"; //Set the SMTP server to send through
						$this->mail->SMTPAuth = true; //Enable SMTP authentication
						$this->mail->Username = "conniebenetez@gmail.com"; //SMTP username
						$this->mail->Password = "wdwfpioudaqphwiw"; //SMTP password
						$this->mail->SMTPSecure =
							PHPMailer::ENCRYPTION_STARTTLS; //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
						$this->mail->Port = 587; //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
						//Recipients
						$this->mail->setFrom("conniebenetez@gmail.com", "OTP");
						$this->mail->addAddress($_POST["email"]); //Add a recipient

						//Content
						$this->mail->isHTML(true); //Set email format to HTML
						$this->mail->Subject = "Varification Email";
						$this->mail->Body = $url;
						// $this->mail->Body = '<a href="api.sc.io/email-verification?token=' . $token . '&selector=' . $selector . '">active</a>';
						// $this->mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

						$this->mail->send();
						// echo 'Message has been sent';

						echo json_encode([
							"result" => 5,
							"text" => 'We sent a verefication email',
						]);
					} catch (Exception $e) {
						echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
					}
				}
			);

			$this->db->insert('roles', [
				'user_role' => 1,
				'user_id' => $userId,
			]);

			$this->db->insert('profile_pic', [
				'filename' => 'user-1.jpg',
				'file_type' => 'image/jpeg',
				'file_path' => './uploads/user-1.jpg',
			]);

			// Returns the auto incrementing ID for the last insert statement.
			$profilePicId = $this->db->insertId();



			$this->db->query("UPDATE users SET profile_pic_id = %i_profile_pic_id WHERE id = %i_userId", [
				'profile_pic_id' => $profilePicId,
				'userId' => $userId,
			]);

			$phone = $_POST["phone"];
			$this->db->query("UPDATE users SET contact_number = %i_contact_number  WHERE id = %i_userId", [
				'contact_number' => $phone,
				'userId' => $userId,
			]);
		} catch (\Delight\Auth\InvalidEmailException $e) {
			echo json_encode([
				"result" => 1,
				"text" => 'Invalid email address',
			]);
		} catch (\Delight\Auth\InvalidPasswordException $e) {
			echo json_encode([
				"result" => 2,
				"text" => 'Invalid password',
			]);
		} catch (\Delight\Auth\UserAlreadyExistsException $e) {
			echo json_encode([
				"result" => 3,
				"text" => 'User already exists',
			]);
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			echo json_encode([
				"result" => 4,
				"text" => 'Too many requests',
			]);
		}
	}

	public function emailvarification()
	{
		try {
			$detail = $this->auth->confirmEmailAndSignIn(
				$_GET["selector"],
				$_GET["token"]
			);

			try {
				$this->mail->SMTPDebug = false; //Enable verbose debug output
				$this->mail->isSMTP(); //Send using SMTP
				$this->mail->Host = "smtp.gmail.com"; //Set the SMTP server to send through
				$this->mail->SMTPAuth = true; //Enable SMTP authentication
				$this->mail->Username = "conniebenetez@gmail.com"; //SMTP username
				$this->mail->Password = "wdwfpioudaqphwiw"; //SMTP password
				$this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
				$this->mail->Port = 587; //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
				//Recipients
				$this->mail->setFrom("conniebenetez@gmail.com", "OTP");
				$this->mail->addAddress($detail[1]); //Add a recipient

				//Content
				$this->mail->isHTML(true); //Set email format to HTML
				$this->mail->Subject = "Varification Email";
				$this->mail->Body = "sucess";
				// $this->mail->Body = '<a href="api.sc.io/email-verification?token=' . $token . '&selector=' . $selector . '">active</a>';
				// $this->mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

				$this->mail->send();
				// echo 'Message has been sent';
			} catch (Exception $e) {
				echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
			}

			header('Location: http://localhost/capstone/success');
		} catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
			die("Invalid token");
		} catch (\Delight\Auth\TokenExpiredException $e) {
			die("Token expired");
		} catch (\Delight\Auth\UserAlreadyExistsException $e) {
			die("Email address already exists");
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			die("Too many requests");
		}
	}

	public function email_password_reset()
	{
		try {
			$this->auth->forgotPassword($_POST["email"], function ($selector, $token) {
				$url =
					"http://localhost/capstone/api/reset_password_varification?selector=" .
					\urlencode($selector) .
					"&token=" .
					\urlencode($token);

				try {
					//Server settings
					// $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;
					$this->mail->SMTPDebug = false; //Enable verbose debug output
					$this->mail->isSMTP(); //Send using SMTP
					$this->mail->Host = "smtp.gmail.com"; //Set the SMTP server to send through
					$this->mail->SMTPAuth = true; //Enable SMTP authentication
					$this->mail->Username = "conniebenetez@gmail.com"; //SMTP username
					$this->mail->Password = "wdwfpioudaqphwiw"; //SMTP password
					$this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
					$this->mail->Port = 587; //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
					//Recipients
					$this->mail->setFrom("conniebenetez@gmail.com", "OTP");
					$this->mail->addAddress($_POST["email"]); //Add a recipient

					//Content
					$this->mail->isHTML(true); //Set email format to HTML
					$this->mail->Subject = "Reset Password Email";
					$this->mail->Body = $url;
					$this->mail->send();
					// redirect to page input password
				} catch (Exception $e) {
					echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
				}
			});

			echo "Request has been generated";
		} catch (\Delight\Auth\InvalidEmailException $e) {
			die("Invalid email address");
		} catch (\Delight\Auth\EmailNotVerifiedException $e) {
			die("Email not verified");
		} catch (\Delight\Auth\ResetDisabledException $e) {
			die("Password reset is disabled");
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			die("Too many requests");
		}
	}

	public function verifyingAnAttempt()
	{
		try {
			$this->auth->canResetPasswordOrThrow(
				$_GET["selector"],
				$_GET["token"]
			);

			header("Location: http://localhost/capstone/reset-password-form?selector=" .
				\urlencode($_GET["selector"]) .
				"&token=" .
				\urlencode($_GET["token"]));
		} catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
			die("Invalid token");
		} catch (\Delight\Auth\TokenExpiredException $e) {
			die("Token expired");
		} catch (\Delight\Auth\ResetDisabledException $e) {
			die("Password reset is disabled");
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			die("Too many requests");
		}
	}

	public function update_the_password()
	{
		try {
			$this->auth->resetPassword(
				$_POST["selector"],
				$_POST["token"],
				$_POST["password"]
			);

			echo "Password has been reset";
		} catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
			die("Invalid token");
		} catch (\Delight\Auth\TokenExpiredException $e) {
			die("Token expired");
		} catch (\Delight\Auth\ResetDisabledException $e) {
			die("Password reset is disabled");
		} catch (\Delight\Auth\InvalidPasswordException $e) {
			die("Invalid password");
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			die("Too many requests");
		}
	}

	public function get_user_role()
	{
		$id = $this->auth->getUserId();
		$roles = $this->db->query("SELECT user_role FROM roles WHERE user_id = %i_user_id LIMIT 1", ['user_id' => $id]);

		echo json_encode([
			"roles" => $roles[0]["user_role"],
		]);
	}


	public function resendConfirmationForEmail()
	{
		try {
			$this->auth->resendConfirmationForEmail($_POST["email"], function (
				$selector,
				$token
			) {
				$url =
					"http://localhost/capstone/api/emailvarification?selector=" .
					\urlencode($selector) .
					"&token=" .
					\urlencode($token);

				try {
					$this->mail->SMTPDebug = false; //Enable verbose debug output
					$this->mail->isSMTP(); //Send using SMTP
					$this->mail->Host = "smtp.gmail.com"; //Set the SMTP server to send through
					$this->mail->SMTPAuth = true; //Enable SMTP authentication
					$this->mail->Username = "conniebenetez@gmail.com"; //SMTP username
					$this->mail->Password = "wdwfpioudaqphwiw"; //SMTP password
					$this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
					$this->mail->Port = 587; //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
					//Recipients
					$this->mail->setFrom("conniebenetez@gmail.com", "OTP");
					$this->mail->addAddress($_POST["email"]); //Add a recipient

					$this->mail->isHTML(true); //Set email format to HTML
					$this->mail->Subject = "Varification Email";
					$this->mail->Body = $url;

					$this->mail->send();
					// echo 'Message has been sent';
					echo json_encode(["result" => 1]);
				} catch (Exception $e) {
					echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
				}
			});

			echo "The user may now respond to the confirmation request (usually by clicking a link)";
		} catch (\Delight\Auth\ConfirmationRequestNotFound $e) {
			die("No earlier request found that could be re-sent");
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			die("There have been too many requests -- try again later");
		}
	}

	public function deleteUserById()
	{
		try {
			$this->auth->admin()->deleteUserById($_POST["id"]);
		} catch (\Delight\Auth\UnknownIdException $e) {
			die("Unknown ID");
		}
	}

	public function RetrievingAListOfRegisteredUsers()
	{
		// SELECT id, email, username, status, verified, roles_mask, registered, last_login FROM users;
		$list_user = $this->db->query(
			"SELECT id, email, username, status, verified, roles_mask, registered, last_login FROM users"
		);
		echo json_encode($list_user);
	}

	public function getUserData()
	{
		if ($this->auth->isLoggedIn()) {
			$getData = $this->db->query("SELECT id, email, username, contact_number FROM users WHERE deleted = 0");

			echo json_encode(
				[
					'login' => 1,
					'userData' => $getData
				]
			);
		} else {

			echo json_encode(['login' => 0]);
			//header("Location: http://localhost/capstone/login");
		}
	}

	public function addUserValue()
	{

		try {

			$userId = $this->auth->admin()->createUser(
				$_POST['email'],
				$_POST['password'],
				$_POST['username'],
			);
			// print($userId);
			// exit();

			$phone = $_POST["contacts"];
			$this->db->query("UPDATE users SET contact_number=%i_contact_number WHERE id=%i_userId", [
				'contact_number' => $phone,
				'userId' => $userId,
			]);

			$this->db->insert('roles', [
				'user_role' => 1,
				'user_id' => $userId,
			]);

			echo json_encode(
				[
					'result' => 0,
					'text' => $_POST['username'] . ' has been succesfully registered',
				]
			);
		} catch (\Delight\Auth\InvalidEmailException $e) {
			//die('Invalid email address');
			echo json_encode([
				"result" => 1,
				"text" => 'Invalid email address',
			]);
		} catch (\Delight\Auth\InvalidPasswordException $e) {
			//die('Invalid password');
			echo json_encode([
				"result" => 2,
				"text" => 'Invalid password',
			]);
		} catch (\Delight\Auth\UserAlreadyExistsException $e) {
			//die('User already exists');
			echo json_encode([
				"result" => 3,
				"text" => 'User already exists',
			]);
		} catch (\Delight\Auth\TooManyRequestsException $e) {
			//die('Too many requests');
			echo json_encode([
				"result" => 4,
				"text" => 'Too many requests',
			]);
		}
	}

	public function getInputValue()
	{
		$userid = $_POST['id'];

		//make ur query
		$getValue = $this->db->query("SELECT * FROM users WHERE id=%i_id", ['id' => $userid]);

		echo json_encode($getValue);
	}

	public function getUpdatedValue()
	{
		$userid = $_POST['id'];
		$username = $_POST['username'];
		$this->db->startTransaction();
		$update = $this->db->update('users', ['username' => $username], "id=%i", $userid);
		$value = $this->db->affectedRows();
		$this->db->commit();
		$updateData = $this->db->query("SELECT username FROM users WHERE id=%i_id", ['id' => $userid]);

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


	public function deleteUserRecord()
	{
		$userdId = $_POST['id'];

		$update = $this->db->query("DELETE FROM users WHERE id=%i_id", ['id' => $userdId]);
		//$update = $this->db->update('users', ['deleted' => 1], "id=%i", $userdId);

		$deleteArchiveGuest = ['success' => $update];

		echo json_encode($deleteArchiveGuest);

		// echo json_encode([
		// 	'status' => $update,
		// ]);

		// echo json_encode($update);
	}

	// public function archiveGuestRecord()
	// {
	// 	$userdId = $_POST['id'];

	// 	$this->db->startTransaction();
	// 	$update = $this->db->update('users', ['deleted' => 1], "id=%i", $userdId);

	// 	$status = $this->db->affectedRows();
	// 	$this->db->commit();

	// 	$statusValue = [];

	// 	if ($status == 1) {
	// 		$statusValue = ["status" => "1"];
	// 	} elseif ($status == 0) {
	// 		$statusValue = ["status" => "0"];
	// 	}
	// 	echo json_encode($statusValue);
	// }

	public function getUserDetails()
	{
		$id = $this->auth->getUserId();
		$username = $this->db->query("SELECT username, profile_pic_id FROM users WHERE id=%i_id", ['id' => $id]);
		$profileId = $username[0]['profile_pic_id'];

		$filepath = $this->db->query("SELECT file_path FROM profile_pic WHERE id=%i_profileId", [
			'profileId' => $profileId,
		]);

		$path = ltrim($filepath[0]['file_path'], './');
		$concatpath = "./api/";
		$result = $concatpath . $path;

		echo json_encode([
			"username" => $username[0]['username'],
			"files_path" => $result,
		]);
	}

	public function updateUsername()
	{

		$id = $this->auth->getUserId();

		//update
		$this->db->startTransaction();
		$updateusername = $this->db->update('users', ['username' => $_POST['inputUsername']], "id=%i", $id);
		$username = $this->db->query("SELECT username FROM users WHERE id=%i_id", ['id' => $id]);
		$status = $this->db->affectedRows();
		$this->db->commit();

		$updateusername = [];

		if ($status == 1) {
			//$updateusername = ["status" => "1"];
			$updateusername = ["status" => "1", "username" => $username[0]['username']];
		} elseif ($status == 0) {
			//$updateusername = ["status" => "0"];
			$updateusername = ["status" => "0", "username" => null];
		}

		echo json_encode($updateusername);
	}

	public function updateNewPassword()
	{
		try {

			$this->auth->changePassword($_POST['oldPassword'], $_POST['newPassword']);

			echo json_encode([
				'status' => '0',
				'response' => 'password has been change',
			]);
		} catch (\Delight\Auth\NotLoggedInException $e) {

			echo json_encode([
				'status' => '1',
				'response' => 'Not logged in',
			]);
		} catch (\Delight\Auth\InvalidPasswordException $e) {

			echo json_encode([
				'status' => '2',
				'response' => 'Invalid password(s)',
			]);
		} catch (\Delight\Auth\TooManyRequestsException $e) {

			echo json_encode([
				'status' => '3',
				'response' => 'Too many requests',
			]);
		}
	}

	public function updateUserRoleId()
	{
		$userid = $_POST['userId'];
		$userRole = $_POST['rolesId'];

		$updaterole = $this->db->query("UPDATE roles SET user_role=%i_user_role WHERE user_id=%i_user_id", ['user_id' => $userid, 'user_role' => $userRole]);

		echo json_encode([
			'status' => $updaterole,
		]);
	}



	// public function updateUserRoleId()
	// {
	// 	$userid = $_POST['userId'];
	// 	$userRole = $_POST['rolesId'];

	// 	$this->db->startTransaction();
	// 	$updaterole = $this->db->query("UPDATE roles SET user_role=%i_userRole WHERE user_id=%i_userId", ['userId' => $userid, 'userRole' => $userRole]);

	// 	$value = $this->db->affectedRows();
	// 	$this->db->commit();
	// 	$updateRoles = $this->db->query("SELECT user_role FROM roles WHERE user_id=%i_userId", ['userId' => $userid]);

	// 	if ($value == 0) {
	// 		echo json_encode(
	// 			[
	// 				'results' => $updateRoles,
	// 				'status' => $value
	// 			]
	// 		);
	// 	} elseif ($value == 1) {
	// 		echo json_encode(
	// 			[
	// 				'status' => $value
	// 			]
	// 		);
	// 	} else if ($value == 2) {
	// 		echo json_encode([
	// 			'status' => $value
	// 		]);
	// 	}
	// 	echo json_encode($updateRoles);
	// }

	public function generateRandomNumberWithTime()
	{
		$randomNumber = rand(1000, 9999); // Adjust the range as needed
		$timestamp = time();

		$result = $randomNumber . $timestamp;

		return $result;
	}

	public function fileUpload()
	{
		$userid = $this->auth->getUserId();
		$randomNumber =  $this->generateRandomNumberWithTime();

		$filepond = $_FILES['filepond'];
		$file_name = $filepond['name'];

		$split =  explode('.', $file_name);

		$filename = $split[0];
		$extension = $split[1];

		$imagename = $filename . $randomNumber . '.' . $extension;

		$file_type = $filepond['type'];
		$file_tmp_name = $filepond['tmp_name'];
		$file_size = $filepond['size'];

		$upload_directory = './uploads/';
		$file_path = $upload_directory . $imagename;
		move_uploaded_file($file_tmp_name, $file_path);

		$this->db->insert('profile_pic', [
			'filename' => $imagename,
			'file_type' => $file_type,
			'file_size' => $file_size,
			'file_path' => $file_path,
		]);

		//once done inserting data to database we will get the last id 
		$profilepicid = $this->db->insertId();

		//then use the user id to update the colum profile_pic_id id with the value last id from profile_pic
		$this->db->query("UPDATE users SET profile_pic_id = %i_profile_pic_id WHERE id = %i_userid", [
			'profile_pic_id' => $profilepicid,
			'userid' => $userid,
		]);

		$this->db->query("UPDATE users SET profile_pic_id = %i_profile_pic_id WHERE id = %i_userid", [
			'profile_pic_id' => $profilepicid,
			'userid' => $userid,
		]);

		$profilepicid = $this->db->query("SELECT profile_pic_id FROM users WHERE id=%i_users_id", ['users_id' => $userid]);
		$profile_pic_path = $this->db->query("SELECT file_path FROM profile_pic WHERE id=%i_id", ['id' => $profilepicid[0]['profile_pic_id']]);

		$string = ltrim($profile_pic_path[0]['file_path'], './');
		$files_path = './api/' . $string;

		echo json_encode([
			"profilefilepath" => $files_path,
		]);
	}

	public function getdataguestroom()
	{

		if ($this->auth->isLoggedIn()) {
			$getDataGuestRoom = $this->db->query("SELECT * FROM rooms");

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
			$getDataGuestReserveRoom = $this->db->query("SELECT * FROM reserve");

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

	public function usersArchiveData()
	{
		if ($this->auth->isLoggedIn()) {
			$getData = $this->db->query("SELECT id, email, username, contact_number FROM users WHERE deleted = 1");

			echo json_encode(
				[
					'login' => 1,
					'userData' => $getData
				]
			);
		} else {

			echo json_encode(['login' => 0]);
			//header("Location: http://localhost/capstone/login");
		}
	}
}
