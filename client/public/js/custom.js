(function($) {
  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      800
    );
    return false;
  });

  //navigation
  $(".navigation").onePageNav({
    scrollOffset: 0
  });

  $(".navbar-collapse a").on("click", function() {
    $(".navbar-collapse.collapse").removeClass("in");
  });

  //

  // Smooth scroll for the get started button
  $(".btn-get-started").on("click", function(e) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        700
      );
    }
  });

  // Fixed navbar
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 200) {
      $(".navbar-default").css("display", "block");
      $(".navbar-default").addClass("fixed-to-top");
    } else if (scrollTop == 0) {
      $(".navbar-default").removeClass("fixed-to-top");
    }
  });

  //Counter

  $.fn.countTo = function(options) {
    options = options || {};

    return $(this).each(function() {
      // set options for current element
      var settings = $.extend(
        {},
        $.fn.countTo.defaults,
        {
          from: $(this).data("from"),
          to: $(this).data("to"),
          speed: $(this).data("speed"),
          refreshInterval: $(this).data("refresh-interval"),
          decimals: $(this).data("decimals")
        },
        options
      );

      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data("countTo") || {};

      $self.data("countTo", data);

      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // initialize the element with the starting value
      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof settings.onUpdate == "function") {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData("countTo");
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete == "function") {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 0, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    formatter: formatter, // handler for formatting the value before rendering
    onUpdate: null, // callback method for every time the element is updated
    onComplete: null // callback method for when the element finishes updating
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
})(jQuery);

jQuery(function($) {
  // custom formatting example
  $(".count-number").data("countToOptions", {
    formatter: function(value, options) {
      return value
        .toFixed(options.decimals)
        .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }
  });

  // start all the timers
  $(".timer").each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }

  //Team image gallery
  var selectedClass = "";
  $(".filter").click(function() {
    selectedClass = $(this).attr("data-rel");
    $("#garden-gallery").fadeTo(100, 0);
    $("#garden-gallery img")
      .not("." + selectedClass)
      .fadeOut()
      .removeClass("animated fadeIn");
    setTimeout(function() {
      $("." + selectedClass)
        .fadeIn()
        .addClass("animated fadeIn");
      $("#garden-gallery").fadeTo(300, 1);
    }, 300);
  });

  // Intro carousel
  var introCarousel = $("#introCarousel");
  var introCarouselIndicators = $("#intro-carousel-indicators");
  introCarousel
    .find(".carousel-inner")
    .children(".item")
    .each(function(index) {
      index === 0
        ? introCarouselIndicators.append(
            "<li data-target='#introCarousel' data-slide-to='" +
              index +
              "' class='active'></li>"
          )
        : introCarouselIndicators.append(
            "<li data-target='#introCarousel' data-slide-to='" +
              index +
              "'></li>"
          );

      $(this).css(
        "background-image",
        "url('" +
          $(this)
            .children(".carousel-background")
            .children("img")
            .attr("src") +
          "')"
      );
      $(this)
        .children(".carousel-background")
        .remove();
    });

  // introCarousel.on('slid.bs.carousel', function (e) {
  //   $(this).find('h2').addClass('animated fadeInDown');
  //   $(this).find('p').addClass('animated fadeInUp');
  //   $(this).find('.btn-get-started').addClass('animated fadeInUp');
  // });

  //parallax
  if ($("#parallax1").length || $("#parallax2").length) {
    $(window).stellar({
      responsive: true,
      scrollProperty: "scroll",
      parallaxElements: false,
      horizontalScrolling: false,
      horizontalOffset: 0,
      verticalOffset: 0
    });
  }

  function navbar() {
    if ($(window).scrollTop() > 1) {
      $("#navigation").addClass("show-nav");
    } else {
      $("#navigation").removeClass("show-nav");
    }
  }

  $(document).ready(function() {
    var browserWidth = $(window).width();

    if (browserWidth > 560) {
      $(window).scroll(function() {
        navbar();
      });
    }
  });

  $(window).resize(function() {
    var browserWidth = $(window).width();

    if (browserWidth > 560) {
      $(window).scroll(function() {
        navbar();
      });
    }
  });

  // Carousel
  $(".service .carousel").carousel({
    interval: 4000
  });

  //works
  $(function() {
    Grid.init();
  });

  //animation
  new WOW().init();
})(jQuery);
