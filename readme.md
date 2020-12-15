# Gulp + Pug - Стартовый шаблон

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
gulp dist
```

## Шрифты

Находим, если дизайнер не передал, и прогоняем через сервис https://transfonter.org/ в форматах WOFF2, WOFF, TTF, скачиваем сгенерированный архив в папку fonts и распаковываем.

fonts/stylesheet.css переводим в sass через онлайн сервис, напр. http://css2sass.herokuapp.com/ и полученный sass добавляем в файл sass/_include/_fonts.sass. В путях к файлам шрифтов корректируем url.

## Работа с PUG

### Многостраничный

В папке pug создаем файл своей страницы, например page.pug.

В папке pug cоздаем папку с одноименным названием для секций этой страницы, например sections-page. Внутри sections-page создаются файлы pug для каждой секции страницы и подключаются через include в page.pug.

Если секции могут повторяться на других страницах, то файлы таких секций создаем в папке pug/sections, напр. forms.pug и подключаем у себя в page.pug.

### Одностраничный

Все pug файлы для секций создаем в папке pug/sections и покдлючаем через include в файле pug/index.pug.

## Работа с SASS

### Многостраничный

В папке sass создаем папку своей страницы, например _sections-page. Внутри этой папки создаем отдельные файлы для каждой секции своей страницы.

Sass файлы секций подключаем в styles.sass

Если секции могут повторяться на других страницах, то файлы таких секций создаем в папке sass/_sections, напр. _forms.sass и подключаем в styles.sass.

### Одностраничный

Все sass файлы для секций создаем в папке sass/_sections и покдлючаем через @import в файле sass/styles.sass.

## Работа с JS

### Многостраничный

В папке include создаем отдельный файл для своей страницы, например about-page.js и подключаем его в gulpfile.js в таске scripts после common.js.

Если скрипт есть на всех страницах, то js код пишем в файле include/common.js.

Если скрипт есть только на некторых страницах, то js код пишем в отдельном файле в папке js, например, js/calc.js и подключаем в своих pug файлах страниц в ключевом слове block.

### Одностраничный

Весь js пишем в файле include/common.js

## Работа с изображениями

Все изображения сохраняем в папку img. Если для какой-то секции нужно много изображений, например фотогалерея, то создаем подпапку: напр. img/gallery.

Если страниц несколько, то для каждой страницы также создаем свою подпапку, напр. img/page

## Подключение библиотек

Если библиотека используется на всех страницах, помещаем ее в папку include, скрипт библиотеки подключаем в gulpfile.js в таске scripts до common.js, стили библиотеки подключаем в sass/_include/_libs.sass

Важно учесть, что в _libs.sass подключение должно быть расширения .sass или .scss и бывают библиотеки в которых нет этих файлов. В этом случае стили вручную конвертируем в sass или scss и подключаем.

Если библиотека используется только для конкретной страницы, то помещаем ее в папку libs. Стили и JS подключаем в pug файле нужной страницы через ключевое слово block.

## Общие правила

Переменные стилей сохраняются в файле sass/_include/_vars.sass

Для отступов используем символы табуляции (4), не пробелов.

CSS фреймворки не используем, общие стили сетки, кнопок и т.д. пишем в sass/_include/_common.sass

Медиазапросы (переменные ширин экранов в sass/_include/_vars.sass) для секций пишем в файле стилей этой секции внизу.
