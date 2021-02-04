<?php

define('DOCROOT', __DIR__ . DIRECTORY_SEPARATOR);

require DOCROOT . '../vendor/autoload.php';
const ALLOWED_EXTENSION = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'tar', 'zip', '7z', '7zip'];
// 5mb
const MAX_FILE_SIZE = 1048576 * 5;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


function makeDir($directory)
{
    $directory = DOCROOT . $directory;
    return is_dir($directory) || mkdir($directory);

}

function removeFileFrom(string $directory, array $files)
{
    for ($i = 0; $i < count($files); $i++) {
        $link = DOCROOT . "{$directory}/" . $files[$i];
        if (file_exists($link))
            unlink($link);
    }
}

// Instantiation and passing `true` enables exceptions

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $mail = new PHPMailer(true);
    $response = ['status' => 'Your message successfully sent'];
    if (isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['content']) && isset($_POST['name'])) {
        try {
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'mail.hosting.reg.ru';                                                                                            // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = 'postmaster@jurist-spb.com'; // Ваш логин от почты с которой будут отправляться письма
            $mail->Password = '1grQNRy!'; // Ваш пароль от почты с которой будут отправляться письма
            $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
            $mail->CharSet = 'utf-8';
            $mail->setFrom('postmaster@jurist-spb.com');
            $mail->addAddress('vosicap579@boldhut.com');   // Кому будет уходить письмо
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = "{$_POST['name']} оставил заявку";

            $files = [];
            if (isset($_FILES['file'])) {
                for ($i = 0; $i < count($_FILES['file']['name']); $i++) {
                    $temp = explode(".", $_FILES["file"]["name"][$i]);
                    $extension = end($temp);
                    makeDir("uploads");
                    $filename = md5(uniqid()) . "." . $extension;
                    $target_path = DOCROOT . 'uploads' . DIRECTORY_SEPARATOR . $filename;
                    $files[] = $filename;

                    if ($_FILES['file']['size'][$i] <= MAX_FILE_SIZE && in_array($extension, ALLOWED_EXTENSION)) {
                        move_uploaded_file($_FILES['file']['tmp_name'][$i], $target_path);
                        $mail->addAttachment($target_path);

                    } else {
                        removeFileFrom('uploads', $files);
                        $response['status'] = "Your file {$temp[0]}.{$temp[1]} does not allowed max file size 5mb and extension: " . implode(',', ALLOWED_EXTENSION);
                        echo json_encode($response);
                    }
                }
                $response['status'] = 'Your message and files has been successfully sent';
            }
            $mail->Body = "Имя:{$_POST['name']}<br>Email:" . '<a href="mailto:' . $_POST['email'] . '">' . $_POST['email'] . '</a><br>Телефон:' . "{$_POST['phone']}<br>Текст:{$_POST['content']}";
            $mail->AltBody = '';
            $mail->send();
            if (!empty($files)) {
                removeFileFrom('uploads', $files);
            }
            echo json_encode($response);
        } catch (Exception $e) {
            echo json_encode(['status' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);

        }
    } else {
        $response['status'] = 'Field email, name, phone, content is required';
        echo json_encode($response);
    }
} else {
    echo json_encode(['status' => "Method does not allowedMethod does not allowed"]);
}