$(document).ready(function () {
  let $preloader = $("#page-preloader");
  $preloader.fadeOut(1000);

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
      $("header").addClass("header__active");
    } else {
      $("header").removeClass("header__active");
    }
  });

  $(".input").focus(function () {
    $(this).parent().find("label").addClass("is-active");
  });

  $(".input").focusout(function () {
    if ($(this).val() === "")
      $(this).parent().find("label").removeClass("is-active");
  });

  $(".js-menu-open").click(function () {
    $(".js-menu").toggleClass("menu-opened");
    $("body").toggleClass("lock");
    $(".hamburger_menu").toggleClass("hamburger_menu_active");
  });

  AOS.init({
    once: true,
    anchorPlacement: "bottom-bottom",
    duration: 800,
  });

  onElementHeightChange(document.body, function () {
    AOS.refresh();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  const inputFile = document.querySelectorAll(".upload-file__input");

  inputFile.forEach(function (el) {
    let textSelector = document.querySelector(".upload-file__text");
    let fileList;


    el.addEventListener("change", function (e) {

      fileList = [];
      for (let i = 0; i < el.files.length; i++) {
        fileList.push(el.files[i]);
      }


      fileList.forEach((file) => {
        uploadFile(file);
      });
    });


    const uploadFile = (file) => {

      if (file.size > 5 * 1024 * 1024) {
        alert("Файл должен быть не более 5 МБ.");
        return;
      }


      if (file && file.length > 1) {
        if (file.length <= 4) {
          textSelector.textContent = `Выбрано ${file.length} файла`;
        }
        if (file.length > 4) {
          textSelector.textContent = `Выбрано ${file.length} файлов`;
        }
      } else {
        textSelector.textContent = file.name;
      }
    };
  });
  
});
