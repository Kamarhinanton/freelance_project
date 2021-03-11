<?php

$recepient = "sales@dixten.ru";
$from_name  = "ЗАЯВКА С ЛЕНДИНГА";
$from_email = "admin@dix-ten.ru";

$headers = "Return-Path: <" . $from_name . ">\r\n";
$headers .= "From: " . $from_name . " <" . $from_email . ">\r\n";
$headers .= "Reply-To: " . $from_name . " <" . $from_email . ">\r\n";
$headers .= "Content-type: text/html; charset=\"utf-8\"\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

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

$pagetitle = 'Заполненная форма с лендинга СОТ';
mail($recepient, $pagetitle, $message, $headers);

$json = array();
echo json_encode($json); // вывoдим мaссив oтвeтa


?>
