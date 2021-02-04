# Gulp - Стартовый шаблон

Устанавливаем node зависимости

```javascript
npm install
```
Запускаем проект
```javascript
gulp
```

Собираем проект
```javascript
gulp build
```

Настройка SMTP почты
```
Для работы PHP mailer необходимо положить файл mailer.php в корневую директорию где html файлы

Установить Composer если не установлен

Ввести следующую команду в консоль composer install

В файле mailer.php заполнить  поля 
    
    $mail->Host = 'mail.hosting.reg.ru';                                                                                            // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'aaa@aa.aa'; // Ваш логин от почты с которой будут отправляться письма
    $mail->Password = 'secret!'; // Ваш пароль от почты с которой будут отправляться письма
    $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465; // этот порт может отличаться у других провайдеров
    $mail->setFrom('postmaster@jurist-spb.com'); // Почта с которой будет уходить письмо должно быть эквивалентно   $mail->Username = 'aaa@aa.aa';
    $mail->addAddress('vosicap579@boldhut.com');   // Кому будет уходить письмо

```