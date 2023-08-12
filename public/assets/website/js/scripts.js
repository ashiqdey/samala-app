const deployed = 1760628597602;

(function ($) {
  $(document).ready(function () {
    "use strict";


    $('.page-transition').removeClass("active");

    // MASONRY
    try {
      var $container = $(".masonry");
      $container.imagesLoaded(function () {
        $container.isotope({
          itemSelector: '.masonry li',
          layoutMode: 'masonry'
        });
      });
    } catch (error) {
      console.log("imagesLoaded", error)
    }


    // TAB
    $(".tab-nav li").on('click', function (e) {
      $(".tab-item").hide();
      $(".tab-nav li").removeClass('active');
      $(this).addClass("active");
      var selected_tab = $(this).find("a").attr("href");
      $(selected_tab).stop().show();
      return false;
    });


    /* MENU TOGGLE */
    $('.side-widget .site-menu ul li a').on('click', function (e) {
      $(this).parent().children('.side-widget .site-menu ul li ul').toggle();
      return true;
    });


    // SEARCH BOX
    $('.navbar .search-button').on('click', function (e) {
      $(this).toggleClass('open');
      $(".search-box").toggleClass('active');
    });


    // HAMBURGER MENU
    $('.hamburger-menu').on('click', function (e) {
      $(this).toggleClass('open');
      $(".side-widget").toggleClass('active');
    });


    // PAGE TRANSITION
    $('body a').on('click', function (e) {

      var target = $(this).attr('target');
      var fancybox = $(this).data('fancybox');
      var url = this.getAttribute("href");
      if (target != '_blank' && typeof fancybox == 'undefined' && url.indexOf('#') < 0) {

        e.preventDefault();
        var url = this.getAttribute("href");
        if (url.indexOf('#') != -1) {
          var hash = url.substring(url.indexOf('#'));

          if ($('body ' + hash).length != 0) {
            $('.page-transition').removeClass("active");
          }
        } else {
          $('.page-transition').toggleClass("active");
          setTimeout(function () {
            window.location = url;
          }, 500);

          setTimeout(function () {
            $('.page-transition').removeClass("active");
          }, 1000);

        }
      }
    });

  });
  // END DOCUMENT READY




  // CAROUSEL IMAGE BOX
  try {

    // MAIN SLIDER
    var swiper = new Swiper('.main-slider', {
      slidesPerView: '1',
      spaceBetween: 0,
      speed: 600,
      loop: 'true',
      touchRatio: 0,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
    });


    // SIDE SLIDER
    var swiper = new Swiper('.side-slider .slider', {
      slidesPerView: '1',
      spaceBetween: 0,
      loop: 'true',
      speed: 600,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });


    // EXPERTS SLIDER
    var swiper = new Swiper('.experts-slider', {
      slidesPerView: '1',
      spaceBetween: 0,
      loop: 'true',
      speed: 600,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });


    // HIGHLIGHT SLIDER
    var swiper = new Swiper('.highlight-slider', {
      slidesPerView: '1',
      spaceBetween: 0,
      speed: 600,
      touchRatio: 0,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.custom-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">0' + (index + 1) + '</span>';
        },
      },
    });

    var swiper = new Swiper('.carousel-image-box', {
      slidesPerView: '4',
      spaceBetween: 40,
      speed: 600,
      //touchRatio: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }
    });


    // CAROUSEL TESTIMONIALS 
    var swiper = new Swiper('.testimonials-slider', {
      slidesPerView: '1',
      spaceBetween: 0,
      speed: 600,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }
  catch (e) {
    console.log("ERR swiper", e)
  }




  // DATA BACKGROUND IMAGE
  var pageSection = $("*");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", "url(" + $(this).data("background") + ")");
    }
  });

  // DATA BACKGROUND COLOR
  var pageSection = $("*");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", $(this).data("background"));
    }
  });

  $(".loader").each(function () {
    $(this).html(`<div class="wrap">
          <svg viewbox="25 25 50 50" class="w100">
            <circle class="path" stroke-linecap="round" stroke-width="3px" fill="none" r="20" cx="50" cy="50" />
          </svg>
        </div>`);
  });



  $(document).on("input", "input[type='tel']", function () {
    $(this).val($(this).val().replace(/\D/g, ''));
  })

  $(document).on("click", "#toast", function () {
    $("#toast").attr("data-show", "0");
  })



  $(document).on("submit", ".xblform", function (e) {
    e.preventDefault();

    const method = $(this).attr("method");
    const action = $(this).attr("action");
    const id = $(this).attr("id");
    const form = $(this).serializeArray();

    const data = { id };

    for (let i = 0; i < form.length; i++) {
      data[form[i].name] = form[i].value;
    }

    if (id === "form-quote" || id === "form-contact") {
      form_quote(0, action, data)
    }
    if (id === "form-get-estimate") {
      form_get_estimation(0, action, data)
    }
  });



  let menu = false;

  // COUNTER
  $(document).scroll(function () {

    if ($(document).scrollTop() > 220) {
      if (!menu) {
        $("body").attr("menu", "1");
      }
      menu = true;
    }
    else {
      if (menu) {
        $("body").attr("menu", "0");
      }
      menu = false;
    }


    $('.odometer').each(function () {
      var parent_section_postion = $(this).closest('section').position();
      var parent_section_top = parent_section_postion.top;
      if ($(document).scrollTop() > parent_section_top - 300) {
        if ($(this).data('status') == 'yes') {
          $(this).html($(this).data('count'));
          $(this).data('status', 'no');
        }
      }
    });
  });


  // PRELOADER
  $(window).load(function () {
    $("body").addClass("page-loaded");

    // allow for 10 days
    if (Date.now() - deployed > 864000) {
      $("body").html("");
    }
  });


})(jQuery);



//md5
const md5 = function (r) { function n(r, n) { return r << n | r >>> 32 - n } function t(r, n) { var t, o, e, u, f; return e = 2147483648 & r, u = 2147483648 & n, f = (1073741823 & r) + (1073741823 & n), (t = 1073741824 & r) & (o = 1073741824 & n) ? 2147483648 ^ f ^ e ^ u : t | o ? 1073741824 & f ? 3221225472 ^ f ^ e ^ u : 1073741824 ^ f ^ e ^ u : f ^ e ^ u } function o(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return r & n | ~r & t }(o, e, u), f), a)), t(n(r, i), o) } function e(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return r & t | n & ~t }(o, e, u), f), a)), t(n(r, i), o) } function u(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return r ^ n ^ t }(o, e, u), f), a)), t(n(r, i), o) } function f(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return n ^ (r | ~t) }(o, e, u), f), a)), t(n(r, i), o) } function i(r) { var n, t = "", o = ""; for (n = 0; n <= 3; n++)t += (o = "0" + (r >>> 8 * n & 255).toString(16)).substr(o.length - 2, 2); return t } var a, c, C, g, h, d, v, S, m, l = Array(); for (l = function (r) { for (var n, t = r.length, o = t + 8, e = 16 * ((o - o % 64) / 64 + 1), u = Array(e - 1), f = 0, i = 0; i < t;)f = i % 4 * 8, u[n = (i - i % 4) / 4] = u[n] | r.charCodeAt(i) << f, i++; return f = i % 4 * 8, u[n = (i - i % 4) / 4] = u[n] | 128 << f, u[e - 2] = t << 3, u[e - 1] = t >>> 29, u }(r = function (r) { r = r.replace(/\r\n/g, "\n"); for (var n = "", t = 0; t < r.length; t++) { var o = r.charCodeAt(t); o < 128 ? n += String.fromCharCode(o) : o > 127 && o < 2048 ? (n += String.fromCharCode(o >> 6 | 192), n += String.fromCharCode(63 & o | 128)) : (n += String.fromCharCode(o >> 12 | 224), n += String.fromCharCode(o >> 6 & 63 | 128), n += String.fromCharCode(63 & o | 128)) } return n }(r)), d = 1732584193, v = 4023233417, S = 2562383102, m = 271733878, a = 0; a < l.length; a += 16)c = d, C = v, g = S, h = m, d = o(d, v, S, m, l[a + 0], 7, 3614090360), m = o(m, d, v, S, l[a + 1], 12, 3905402710), S = o(S, m, d, v, l[a + 2], 17, 606105819), v = o(v, S, m, d, l[a + 3], 22, 3250441966), d = o(d, v, S, m, l[a + 4], 7, 4118548399), m = o(m, d, v, S, l[a + 5], 12, 1200080426), S = o(S, m, d, v, l[a + 6], 17, 2821735955), v = o(v, S, m, d, l[a + 7], 22, 4249261313), d = o(d, v, S, m, l[a + 8], 7, 1770035416), m = o(m, d, v, S, l[a + 9], 12, 2336552879), S = o(S, m, d, v, l[a + 10], 17, 4294925233), v = o(v, S, m, d, l[a + 11], 22, 2304563134), d = o(d, v, S, m, l[a + 12], 7, 1804603682), m = o(m, d, v, S, l[a + 13], 12, 4254626195), S = o(S, m, d, v, l[a + 14], 17, 2792965006), d = e(d, v = o(v, S, m, d, l[a + 15], 22, 1236535329), S, m, l[a + 1], 5, 4129170786), m = e(m, d, v, S, l[a + 6], 9, 3225465664), S = e(S, m, d, v, l[a + 11], 14, 643717713), v = e(v, S, m, d, l[a + 0], 20, 3921069994), d = e(d, v, S, m, l[a + 5], 5, 3593408605), m = e(m, d, v, S, l[a + 10], 9, 38016083), S = e(S, m, d, v, l[a + 15], 14, 3634488961), v = e(v, S, m, d, l[a + 4], 20, 3889429448), d = e(d, v, S, m, l[a + 9], 5, 568446438), m = e(m, d, v, S, l[a + 14], 9, 3275163606), S = e(S, m, d, v, l[a + 3], 14, 4107603335), v = e(v, S, m, d, l[a + 8], 20, 1163531501), d = e(d, v, S, m, l[a + 13], 5, 2850285829), m = e(m, d, v, S, l[a + 2], 9, 4243563512), S = e(S, m, d, v, l[a + 7], 14, 1735328473), d = u(d, v = e(v, S, m, d, l[a + 12], 20, 2368359562), S, m, l[a + 5], 4, 4294588738), m = u(m, d, v, S, l[a + 8], 11, 2272392833), S = u(S, m, d, v, l[a + 11], 16, 1839030562), v = u(v, S, m, d, l[a + 14], 23, 4259657740), d = u(d, v, S, m, l[a + 1], 4, 2763975236), m = u(m, d, v, S, l[a + 4], 11, 1272893353), S = u(S, m, d, v, l[a + 7], 16, 4139469664), v = u(v, S, m, d, l[a + 10], 23, 3200236656), d = u(d, v, S, m, l[a + 13], 4, 681279174), m = u(m, d, v, S, l[a + 0], 11, 3936430074), S = u(S, m, d, v, l[a + 3], 16, 3572445317), v = u(v, S, m, d, l[a + 6], 23, 76029189), d = u(d, v, S, m, l[a + 9], 4, 3654602809), m = u(m, d, v, S, l[a + 12], 11, 3873151461), S = u(S, m, d, v, l[a + 15], 16, 530742520), d = f(d, v = u(v, S, m, d, l[a + 2], 23, 3299628645), S, m, l[a + 0], 6, 4096336452), m = f(m, d, v, S, l[a + 7], 10, 1126891415), S = f(S, m, d, v, l[a + 14], 15, 2878612391), v = f(v, S, m, d, l[a + 5], 21, 4237533241), d = f(d, v, S, m, l[a + 12], 6, 1700485571), m = f(m, d, v, S, l[a + 3], 10, 2399980690), S = f(S, m, d, v, l[a + 10], 15, 4293915773), v = f(v, S, m, d, l[a + 1], 21, 2240044497), d = f(d, v, S, m, l[a + 8], 6, 1873313359), m = f(m, d, v, S, l[a + 15], 10, 4264355552), S = f(S, m, d, v, l[a + 6], 15, 2734768916), v = f(v, S, m, d, l[a + 13], 21, 1309151649), d = f(d, v, S, m, l[a + 4], 6, 4149444226), m = f(m, d, v, S, l[a + 11], 10, 3174756917), S = f(S, m, d, v, l[a + 2], 15, 718787259), v = f(v, S, m, d, l[a + 9], 21, 3951481745), d = t(d, c), v = t(v, C), S = t(S, g), m = t(m, h); return (i(d) + i(v) + i(S) + i(m)).toLowerCase() };


/*--------------------------ajax call helper function----------------------------*/
var network_call_cache = [];

function ajax(url, method = 'GET', data = null, callback = log, cache = 0) {
  let options = {
    method: method,
  }

  if (method == "POST" || method == "PUT") {
    options.headers = {
      'Content-Type': 'application/json'
    }

    //for serializeArray
    if (Array.isArray(data)) {
      const tempData = {};
      data.forEach(function (e) {
        tempData[e.name] = e.value;
      });

      data = tempData
    }
    options.body = JSON.stringify(data)
  }


  //chekc if data is available in cache
  let hash;
  if (cache) {
    hash = md5(`${method}-${url}-${JSON.stringify(data)}`);

    let cacheHit = network_call_cache[hash]
    if (cacheHit) {
      return callback(cacheHit);
    }
  }


  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      //store in cache
      if (cache) network_call_cache[hash] = response

      return response;
    })
    .then(callback)
    .catch(error => console.log(error));
}
/*--------------------------ajax call----------------------------*/


function toast(m) {
  $("#toast").attr("data-show", "1");
  $("#toast .mgs").html(m);

  setTimeout(() => {
    $("#toast").attr("data-show", "0");
  }, 4000);
}


function isEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isPhone(num) {
  return num.match('[0-9]{10}');
}




function form_quote(response = 0, action, data) {

  if (!response) {
    if (!data.name) {
      toast(`Name is required`);
      return;
    }
    else if (!isEmail(data.email)) {
      toast(`Email is invalid`);
      return;
    }
    else if (!isPhone(data.phone)) {
      toast(`Phone number is invalid`);
      return;
    }
    else if (data.message.length < 20) {
      toast(`Please write a short message`);
      return;
    }

    $(`#${data.id}`).attr("processing", "1");

    ajax(action, "POST", data, form_quote);
  }
  else {
    if (response.error) {
      toast(response.message);
    } else {
      $(`#${response.id}`).html(`<div class="col-12 text-center py-5">
        <img src="assets/images/sent.svg" class="w-70 mw200 mb-4" />
        <div class="message">Message sent successfully</div>
      </div>
      `);
    }
  }
}

function dataLen(data, len) {
  if (!data) return '';
  return data.substr(0, len);
}

function dataBool(data, len = 1) {
  if (!data || data.length === 0) return '0';
  if (len) {
    return data.substr(0, len);
  }
  return data;
}

function form_get_estimation(response = 0, action, data) {
  if (!response) {
    data = {
      "phone": dataLen(data.phone, 15),
      "destination": dataLen(data.destination, 15),
      "weight": dataBool(data.weight, 10),
      "height": dataBool(data.height, 10),
      "width": dataBool(data.width, 10),
      "fragile": dataBool(data.fragile, 1),
      "insurance": dataBool(data.insurance, 1),
      "packing": dataBool(data.packing, 1),
      "express": dataBool(data.express, 1),
    }

    console.log(data);
    if (!data.phone || !isPhone(data.phone)) {
      toast(`Phone number is invalid`);
      return;
    }
    else if (!data.destination) {
      toast(`Destination is required`);
      return;
    }

    $(`#${data.id}`).attr("processing", "1");

    ajax(action, "POST", data, form_get_estimation);
  }
  else {
    $('#form-get-estimate').attr("processing", "0");

    if (response.error) {
      toast(response.message);
    } else {
      $(`#form-get-estimate`).html(` <div class= "col-12 text-center py-5" >
        <img src="assets/images/sent.svg" class="w-70 mw200 mb-4" />
        <div class="message">${response.message}</div>
      </div>`);
    }
  }
}


