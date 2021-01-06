$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 30) {
        $(".header").addClass(".header__active");
    }
    else{
        $(".header").removeClass(".header__active");
    }
};

