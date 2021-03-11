<?php

if(isset($_POST["email"])){
	$email_reply = trim($_POST["email"]);
}

$site_url = $_SERVER['HTTP_REFERER'];
$site_url = preg_replace('/\?.*/', '', $site_url);
$recepient = $email_reply;
$from_name  = "Заполненная форма с лендинга СОТ";
$from_email = "sales@dixten.ru";

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

$message = "
Здравствуйте! Вы оставили заявку в компании Дикстен на сайте $site_url <br>
<br>
Ваше обращение получено и менеджер свяжется с Вами в ближайшее время по указанным контактам: <br>
$name
$phone
$email
<br>
<br>
<b>Если Вам не позвонили в течение 15 минут после отправки заявки, то Вы можете оставить претензию и Вашим вопросом буду заниматься лично я, Сергей Щеткин, директор компании Дикстен. </b><br>
<br>
Оставить претензию и отправить заявку на оборудование Вы можете по этом контактам:<br>
<br>
Телефон: +7 (977) 424-75-54<br>
WhatsApp: +7 (977) 424-75-54<br>
Viber: +7 (977) 424-75-54<br>
Telegram: S_SHCH<br>
Почта: sshchetkin@dixten.ru<br>
<br>
С уважением, <br>
Сергей Щеткин<br>
коммерческий директор компании Дикстен";
$message = "$message";

$pagetitle = 'Вы оставили заявку в компании Дикстен';
mail($recepient, $pagetitle, $message, $headers);

$json = array();
echo json_encode($json); // вывoдим мaссив oтвeтa


?>
