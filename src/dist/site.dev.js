"use strict";

$(document).ready(function () {
  $(document).scroll(function () {
    var scrolledHeight = $(window).scrollTop();
    var parallaxSpeed = 0.5; // Adjust for faster or slower parallax effect
    // Adjust background position for reverse effect

    $("#title-section-bg-image").css("background-position-y", scrolledHeight * parallaxSpeed + "px");
  });
  $(".navbar-toggler").click(function () {
    $(this).find("#nav-icon1").toggleClass("open");
  });
});