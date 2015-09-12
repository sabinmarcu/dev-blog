/*! Plugin options and other jQuery stuff */

// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});

// FitVids options
$(function() {
  $("article").fitVids();
});

$(".close-menu").click(function () {
  $(".menu").toggleClass("disabled");
  $(".links").toggleClass("enabled");
});

$(".about").click(function () {
  $("#about").css('display','block');
});

$(".close-about").click(function () {
  $("#about").css('display','');
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// Magnific-Popup options
$(document).ready(function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });

  if ($(".tutorial").length > 0) {
      var script = document.createElement("script");
      script.src = window.baseurl + "/assets/js/vendor/toc.js";
      script.onload = function() {
            $("#toc-top .inner").toc({title: "<h2>Table of Contents</h2>", showEffect: "fadeIn", headers: "h2, h3, h4, h5, h6"});
            $("#toc-bottom .inner").toc({title: "<h2>Maybe you missed it</h2>", showEffect: "fadeIn", headers: "h2, h3, h4, h5, h6"});
            var container = $(".entry-content"), sidebar = $("#toc-top"), inner = sidebar.find(".inner");
            var heightData = { };
            var scrollFunc = function() {
            		if (window.innerWidth > 800) {
                        var s = 45 + ($("body").scrollTop() || $("html").scrollTop()) - heightData.offset;
                        console.log($("body").scrollTop() || $("html").scrollTop(), s);
                        if (s < 0) {
                            s = 0;
                        } else {
                            if (s > heightData.container - heightData.sidebar) {
                                s = heightData.container - heightData.sidebar + (parseInt(container.css("padding-top")) + parseInt(container.css("padding-top"))) -  (parseInt(inner.css("padding-top")) + parseInt(inner.css("padding-top")));
                            }
                        }
                        console.log(heightData, s);
            			sidebar.css("padding-top", s + "px");
            		} else {
            			sidebar.css("padding-top", "0px");
            		}
            }, resizeFunc = function() {
                heightData.container = container.height();
                heightData.offset = container.offset().top;
                heightData.sidebar = inner.height();
                scrollFunc();
            };
            $(window).scroll(scrollFunc);
            $(window).resize(resizeFunc);
            setInterval(resizeFunc, 1500);
            resizeFunc();

            $(".toc a").click(function() {
                var href = $.attr(this, "href");
                $("html, body").animate({
                    scrollTop: $( href ).offset().top
                }, 500);
                history.pushState(null, null, href);
                return false;
            });
      };
      delete window.baseurl;
      document.head.appendChild(script);
  }
});
