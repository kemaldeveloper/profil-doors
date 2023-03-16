// RESPONSIVE

// Breakpoints
const breakpoints = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xsm: 375,
};

// Media quires
const MQ = {
  wWidth: 0,
  isXL: false,
  isLG: false,
  isMD: false,
  isSM: false,
  isXSM: false,
  updateState: function () {
    this.wWidth = $(window).width();

    for (let key in breakpoints) {
      this['is' + key.toUpperCase()] = this.wWidth <= breakpoints[key];
    }
  },
};

MQ.updateState();

$(document).ready(() => {
  initMainSlider();
});

$(window).on('load', function () {
  //
});

$(window).on('resize', function () {
  MQ.updateState();
});

// COMMON FUNCTIONS

// Popup opener
$('.js-popup').on('click', function (event) {
  event.preventDefault();
  const popupID = $(this).attr('href');

  mfpPopup(popupID);
});

// $('.city-popup').on('click', function (event) {
//   event.preventDefault();
//   let popupID = $(this).attr('href');

//   mfpPopup(popupID);
// });

// $('.fix-popup').on('click', function (event) {
//   event.preventDefault();
//   let popupID = $(this).attr('href');

//   mfpPopup(popupID);
// });

// Mobile menu toggle
$('.js-menu').on('click', function () {
  $(this).toggleClass('is-active');
  $('.menu').toggleClass('is-opened');
});

// Phone input mask

// $('input[type="tel"]').inputmask({
//   mask: '+7 (999) 999-99-99',
//   showMaskOnHover: false,
// });

// E-mail Ajax Send
$('form').on('submit', function (e) {
  e.preventDefault();

  let form = $(this);
  let formData = {};
  formData.data = {};

  // Serialize
  form.find('input, textarea').each(function () {
    let name = $(this).attr('name');
    let title = $(this).attr('data-name');
    let value = $(this).val();

    formData.data[name] = {
      title: title,
      value: value,
    };

    if (name === 'subject') {
      formData.subject = {
        value: value,
      };
      delete formData.data.subject;
    }
  });

  $.ajax({
    type: 'POST',
    url: 'mail/mail.php',
    dataType: 'json',
    data: formData,
  }).done(function (data) {
    if (data.status === 'success') {
      if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
        form.find('.form-result').addClass('form-result--success');
      } else {
        mfpPopup('#success');
      }

      setTimeout(function () {
        if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
          form.find('.form-result').removeClass('form-result--success');
        }
        $.magnificPopup.close();
        form.trigger('reset');
      }, 3000);
    } else {
      alert('Ajax result: ' + data.status);
    }
  });
  return false;
});

const mfpPopup = function (popupID, source) {
  // https://dimsemenov.com/plugins/magnific-popup/
  $.magnificPopup.open({
    items: { src: popupID },
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    closeMarkup: '<button type="button" class="mfp-close">&times;</button>',
    mainClass: 'mfp-fade-zoom',
    // callbacks: {
    // 	open: function() {
    // 		$('.source').val(source);
    // 	}
    // }
  });
};

const initMainSlider = () => {
  const mainSliderClassName = $('.main-slider');

  mainSliderClassName.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    const slider = $(event.currentTarget);
    const currentSlickSlide = $(slider.find('.main-slider__item')[nextSlide]);
    const currentDots = currentSlickSlide.find('.main-slider__dots li');

    currentDots.removeClass('active');
    $(currentDots[nextSlide]).addClass('active');
  });

  mainSliderClassName.on('init', function (event, slick) {
    slick.$slider.find('.main-slider__current-count').text(slick.currentSlide + 1);
    slick.$slider.find('.main-slider__total-count').text(slick.slideCount);
  });

  mainSliderClassName.on('beforeChange', function (event, slick, currentSlide = 0, nextSlide) {
    slick.$slider.find('.main-slider__current-count').text(nextSlide + 1);
    slick.$slider.find('.main-slider__total-count').text(slick.slideCount);
  });

  mainSliderClassName.slick({
    centerMode: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false,
    fade: true,
    cssEase: 'linear',
    dotsClass: 'main-slider__dots',
    appendDots: $('.main-slider__content .container'),
    customPaging: function (slider, i) {
      return '<a class="main-slider__dot-link" href="#"></a>';
    },
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: false,
          arrows: true,
          prevArrow: $('.main-slider__btn--prev'),
          nextArrow: $('.main-slider__btn--next'),
        },
      },
    ],
  });

  $('.main-slider__btn--prev').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const sliderElement = $(this).closest('.main-slider');
    $(sliderElement).slick('slickPrev');
  });

  $('.main-slider__btn--next').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const sliderElement = $(this).closest('.main-slider');
    $(sliderElement).slick('slickNext');
  });
};

$('.slider').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  variableWidth: true,
  autoplaySpeed: 2000,
  infinite: false,
  prevArrow: $('.slider__prev'),
  nextArrow: $('.slider__next'),
  // prevArrow: '<svg class="icon icon--prev-arrow"><use xlink:href="assets/svg-sprite.svg#prev-arrow"></use></svg>',
  // nextArrow: '<svg class="icon icon--next-arrow"><use xlink:href="assets/svg-sprite.svg#next-arrow"></use></svg>',
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

$('.prev').on('click', function () {
  $(this).closest('.slider-block').find('.slider').slick('slickPrev');
});

$('.next').on('click', function () {
  $(this).closest('.slider-block').find('.slider').slick('slickNext');
});

$('.tabs__items').on('click', 'li:not(.active)', function () {
  $(this)
    .addClass('active')
    .siblings()
    .removeClass('active')
    .closest('.tabs')
    .find('.tabs__block')
    .removeClass('active')
    .eq($(this).index())
    .addClass('active');
});




// Анимация плавного появления и исчезновения блоков
//  с помощью методов fadeIn() и fadeOut():

// $('.tabs__items').on('click', 'li:not(.active)', function () {
//   let index = $(this).index();
//   $('.tabs__block.active').fadeOut(300, function () {
//     $(this).removeClass('active');
//     $('.tabs__block').eq(index).fadeIn(300).addClass('active');
//   });
//   $(this).addClass('active').siblings().removeClass('active');
// });



// нимация появления и исчезновения блоков с помощью 
// методов slideDown() и slideUp():

// $('.tabs__items').on('click', 'li:not(.active)', function () {
//   let index = $(this).index();
//   $('.tabs__block.active').slideUp(300, function () {
//     $(this).removeClass('active');
//     $('.tabs__block').eq(index).slideDown(300).addClass('active');
//   });
//   $(this).addClass('active').siblings().removeClass('active');
// });


// Анимация появления и исчезновения блоков с помощью методов 
// animate() и opacity():

// $('.tabs__items').on('click', 'li:not(.active)', function () {
//   let index = $(this).index();
//   $('.tabs__block.active').animate({opacity: 0}, 300, function () {
//     $(this).removeClass('active');
//     $('.tabs__block').eq(index).animate({opacity: 1}, 300).addClass('active');
//   });
//   $(this).addClass('active').siblings().removeClass('active');
// });



