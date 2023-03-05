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
  let popupID = $(this).attr('href');

  mfpPopup(popupID);
});

// Mobile menu toggle
$('.js-menu').on('click', function () {
  $(this).toggleClass('is-active');
  $('.menu').toggleClass('is-opened');
});

// Phone input mask
$('input[type="tel"]').inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
});

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

  // const initMainSlider = () => {
  //   const mainSliderClassName = $('.main-slider');

  //   mainSliderClassName.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
  //     const slider = $(event.currentTarget);
  //     const currentSlickSlide = $(slider.find('.main-slider__item')[nextSlide]);
  //     const currentDots = currentSlickSlide.find('.main-slider__dots li');

  //     currentDots.removeClass('active');
  //     $(currentDots[nextSlide]).addClass('active');
  //   });

  mainSliderClassName.slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    fade: true,
    cssEase: 'linear',
    dotsClass: 'main-slider__dots',
    appendDots: $('.main-slider__content .container'),
    customPaging: function (slider, i) {
      return '<a class="main-slider__dot-link" href="#"></a>';
    },
  });
};
