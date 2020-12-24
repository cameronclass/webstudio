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

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};


var galleryThumbs = new Swiper(".office .gallery-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var galleryTop = new Swiper(".office .gallery-top", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});

new Swiper(".reviews .swiper-container", {
  loop: true,
  navigation: {
    nextEl: ".reviews .swiper-button-next",
    prevEl: ".reviews .swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
});
