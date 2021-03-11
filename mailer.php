<?php
/**
 * PHPMailer simple file upload and send example.
 */
//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer.php';

if(isset($_POST["subject"])){
	$subject = trim($_POST["subject"]);
	$subject = "<br>Тема: <b>$subject</b>\n";
}
if(isset($_POST["name"])){
	$name = trim($_POST["name"]);
	$name = "<br>Имя: <b>$name</b>\n";
}
if(isset($_POST["phone"])){
	$phone = trim($_POST["phone"]);
	$phone = "<br>Телефон: <b>$phone</b>\n";
}
if(isset($_POST["email"])){
	$email = trim($_POST["email"]);
	$email = "<br>Email: <b>$email</b>\n";
}
if(isset($_POST["text"])){
	$text = trim($_POST["text"]);
	$text = "<br>Сообщение: <b>$text</b>\n";
}

// utm метки
if(isset($_POST["utm_source"])){
	$utm_source = trim($_POST["utm_source"]);
	$utm_source = "<br><br>utm_source - <b>$utm_source</b>\n";
}
if(isset($_POST["utm_medium"])){
	$utm_medium = trim($_POST["utm_medium"]);
	$utm_medium = "<br>utm_medium - <b>$utm_medium</b>\n";
}
if(isset($_POST["utm_campaign"])){
	$utm_campaign = trim($_POST["utm_campaign"]);
	$utm_campaign = "<br>utm_campaign - <b>$utm_campaign</b>\n";
}
if(isset($_POST["utm_content"])){
	$utm_content = trim($_POST["utm_content"]);
	$utm_content = "<br>utm_content - <b>$utm_content</b>\n";
}
if(isset($_POST["utm_term"])){
	$utm_term = trim($_POST["utm_term"]);
	$utm_term = "<br>utm_term - <b>$utm_term</b>\n";
}
if(isset($_POST["utm_expid"])){
	$utm_expid = trim($_POST["utm_expid"]);
	$utm_expid = "<br>utm_expid - <b>$utm_expid</b>\n";
}

$message = 'Данные заявки с сайта:';
$message = "$message\n $subject $name $phone $email $text
						$utm_source $utm_medium $utm_campaign $utm_content $utm_term $utm_expid";

// Now create a message
$msg = '';
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->setFrom('admin@dix-ten.ru', 'ЗАЯВКА С ЛЕНДИНГА');
$mail->addAddress('sales@dixten.ru', 'Дикстен');
$mail->Subject = 'Заполненная форма с лендинга СОТ';
$mail->Body = $message;
$mail->IsHTML(true); 

if (array_key_exists('userfile', $_FILES)) {
  // First handle the upload
  // Don't trust provided filename - same goes for MIME types
  // See http://php.net/manual/en/features.file-upload.php#114004 for more thorough upload validation
  $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile']['name']));
  if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    // Upload handled successfully
    // Attach the uploaded file
    $maxsize = 5 * 1024 * 1024; // 5 MB

		if(filesize($uploadfile) < $maxsize){
		  $mail->addAttachment($uploadfile, $_FILES['userfile']['name']);
		}
		else{
			$msg = "Максимальный размер файла 5МБ";
			echo $msg;
			die();
		}
  } else {
    $msg .= 'Failed to move file to ' . $uploadfile;
  }
}
if (!$mail->send()) {
  $msg .= "Mailer Error: " . $mail->ErrorInfo;
} else {
  $msg .= "Message sent!";
}

echo $msg;

?>