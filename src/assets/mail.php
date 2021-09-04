<?php

$method = $_SERVER['REQUEST_METHOD'];

$uploaddir = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'scripts'.DIRECTORY_SEPARATOR;

$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {

  $out = "Файл корректен и был успешно загружен.\n";

} else {

  $out = "Возможная атака с помощью файловой загрузки!\n";

}

// echo $out;

$filename = basename($_FILES['userfile']['name']);

$c = true;

if ( $method === 'POST' ) {

//   $project_name = $_POST["project_name"];
//   //$admin_email  = 'nas.lazarewa@yandex.ru';
//   $admin_email  = 'sales@website58.ru';
//   //$sec_admin_email  = 'dostavkabbqbar@yandex.ru';
//   //$manager_email  = "manager@website58.ru";
//   $sender_email = "noreply@context-shark.ru";
// //	$form_subject = $_POST["form_subject"];
//   $form_subject = 'Обратная связь с сайта КОНТЕКСТ SHARK квиз';
  $project_name = $_POST["project_name"];
  //$admin_email  = 'nas.lazarewa@yandex.ru';
  $admin_email  = 'byteofmonkey@gmail.com';
  //$sec_admin_email  = 'dostavkabbqbar@yandex.ru';
  //$manager_email  = "manager@website58.ru";
  $sender_email = "noreply@choo-vihr.ru";
//	$form_subject = $_POST["form_subject"];
  $form_subject = 'Обратная связь с сайта ЧОО Вихрь';


  foreach ( $_POST as $key => $value ) {

    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {

      $message .= "

			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "

				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>

				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>

			</tr>

			";

    }

  }


} else if ( $method === 'GET' ) {

  // $project_name = $_GET["project_name"];
  // //$admin_email  = 'nas.lazarewa@yandex.ru';
  // $admin_email  = 'sales@website58.ru';
  // //$sec_admin_email  = 'dostavkabbqbar@yandex.ru';
  // //$manager_email  = "manager@website58.ru";
  // $sender_email = "noreply@context-shark.ru";
  //   //	$form_subject = $_POST["form_subject"];
  // $form_subject = 'Обратная связь с сайта КОНТЕКСТ SHARK квиз';
  $project_name = $_GET["project_name"];
  //$admin_email  = 'nas.lazarewa@yandex.ru';
  $admin_email  = 'byteofmonkey@gmail.com';
  //$sec_admin_email  = 'dostavkabbqbar@yandex.ru';
  //$manager_email  = "manager@website58.ru";
  $sender_email = "noreply@choo-vihr.ru";
//	$form_subject = $_POST["form_subject"];
  $form_subject = 'Обратная связь с сайта ЧОО Вихрь';

  foreach ( $_GET as $key => $value ) {

    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {

      $message .= "

			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "

				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>

				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>

			</tr>

			";

    }

  }

}


require 'phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->CharSet = 'UTF-8';

$mail->setFrom(	$sender_email, $project_name );

$mail->addAddress( $admin_email );

//$mail->addAddress( $sec_admin_email );

//$mail->addAddress( $manager_email );

$mail->Subject = $form_subject;

$mail->msgHTML( "<table style='width: 100%;'>$message</table>" );

// Attach uploaded files

$mail->addAttachment( $filename, 'Изображение' );

if(!$mail->send()) {

  echo 'Message could not be sent.';

  echo 'Mailer Error: ' . $mail->ErrorInfo;

} else {

  echo 'Сообщение отправлено!';

}

$mail->clearAddresses();

$mail->clearAttachments();

//Delete file

if (file_exists($filename)) {

  unlink($filename);

}