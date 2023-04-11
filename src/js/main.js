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

// Mobile menu toggle
$('.js-menu').on('click', function () {
  $(this).toggleClass('is-active');
  $('.mobile-menu').addClass('mobile-menu--active');
});

$('.mobile-menu__close-btn').on('click', function () {
  $('.mobile-menu').removeClass('mobile-menu--active');
});

$('.spoiler-link').click(function (event) {
  if ($('.mobile-menu__list').hasClass('spoiler-one')) {
    $('.spoiler-link').not($(this)).removeClass('active');
    $('.mobile-menu__spoiler').not($(this).next()).slideUp(300);
  }
  $(this).toggleClass('active').next().slideToggle(300);
});

// Phone input mask

// $('input[type="tel"]').inputmask({
//   mask: '+7 (999) 999-99-99',
//   showMaskOnHover: false,
// });

// E-mail Ajax Send
// $('form').on('submit', function (e) {
//   e.preventDefault();

//   let form = $(this);
//   let formData = {};
//   formData.data = {};

//   // Serialize
//   form.find('input, textarea').each(function () {
//     let name = $(this).attr('name');
//     let title = $(this).attr('data-name');
//     let value = $(this).val();

//     formData.data[name] = {
//       title: title,
//       value: value,
//     };

//     if (name === 'subject') {
//       formData.subject = {
//         value: value,
//       };
//       delete formData.data.subject;
//     }
//   });

//   $.ajax({
//     type: 'POST',
//     url: 'mail/mail.php',
//     dataType: 'json',
//     data: formData,
//   }).done(function (data) {
//     if (data.status === 'success') {
//       if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
//         form.find('.form-result').addClass('form-result--success');
//       } else {
//         mfpPopup('#success');
//       }

//       setTimeout(function () {
//         if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
//           form.find('.form-result').removeClass('form-result--success');
//         }
//         $.magnificPopup.close();
//         form.trigger('reset');
//       }, 3000);
//     } else {
//       alert('Ajax result: ' + data.status);
//     }
//   });
//   return false;
// });

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

// color btn-imaages
const colorButtonsContainer = document.querySelector('.category-col__choice-color');

if (colorButtonsContainer) {
  const colorButtons = colorButtonsContainer.querySelectorAll('.category-col__btn');

  // установка класса "active" на первой кнопке по умолчанию
  colorButtons[0].classList.add('active');

  colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      colorButtons.forEach((button) => {
        button.classList.remove('active');
      });

      button.classList.add('active');
    });
  });
}

// Radio buttons
const radioButtonsLogic = () => {
  $('.js-radio-btn').on('change', (e) => {
    const currentElement = $(e.currentTarget);
    const radioFormElement = currentElement.closest('.js-radio-form');
    const formRelation = radioFormElement.find('.js-form-relation');
    const currentRadioDataName = currentElement.attr('data-name');

    radioFormElement.find('input[type="radio"]').siblings('img').removeClass('img--active');
    radioFormElement.find('input[type="radio"]:checked').siblings('img').addClass('img--active');
    formRelation.text(currentRadioDataName);
  });

  $('.js-radio-form').each((_, element) => {
    const currentCheckedElement = $(element).find('.js-radio-btn:checked');
    currentCheckedElement.siblings('img').addClass('img--active');
    const defaultCheckedRadioDataName = currentCheckedElement.attr('data-name');
    $(element).find('.js-form-relation').text(defaultCheckedRadioDataName);
  });
};

radioButtonsLogic();

// Quantity input
const quantityInput = () => {
  $('.card-form__quantity-btn--left').on('click', (e) => {
    const inputElement = $('.card-form__quantity-input');
    const quantityInputValue = Number(inputElement.val());

    if (isNaN(quantityInputValue) || quantityInputValue <= 0) {
      return;
    }

    inputElement.val(quantityInputValue - 1);
  });

  $('.card-form__quantity-btn--right').on('click', (e) => {
    const inputElement = $('.card-form__quantity-input');
    const quantityInputValue = Number(inputElement.val());

    if (isNaN(quantityInputValue)) {
      return;
    }

    inputElement.val(quantityInputValue + 1);
  });
};

quantityInput();

// функция для загрузки изображения по адресу url и замены атрибута data-src на src
function loadImage(url, img) {
  const image = new Image();
  image.onload = () => {
    img.src = url;
    img.classList.add('loaded');
  };
  image.src = url;
}

// функция для проверки, находится ли элемент в области прокрутки
function isInView(elem) {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// lazyload
$('img').lazyload();

const tabItems = document.querySelectorAll('.tabs__item li');
const tabBlocks = document.querySelectorAll('.tabs__block');

tabItems.forEach(function (item, index) {
  item.addEventListener('click', function () {
    tabItems.forEach(function (item) {
      item.classList.remove('active');
    });
    this.classList.add('active');

    tabBlocks.forEach(function (block) {
      block.classList.remove('active');
    });
    tabBlocks[index].classList.add('active');
  });
});

$('.tab__inner').on('click', 'li:not(.active)', function () {
  $(this)
    .addClass('active')
    .siblings()
    .removeClass('active')
    .closest('.tab')
    .find('.tab__block')
    .removeClass('active')
    .eq($(this).index())
    .addClass('active');
});

$('.slider-content').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  infinite: true,
  prevArrow: $('.prev--work'),
  nextArrow: $('.next--work'),
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

let center = [55.66750407008213, 37.601284366616014];

function init() {
  let map = new ymaps.Map('ymap', {
    center: center,
    zoom: 12,
  });

  let placemark = new ymaps.Placemark(
    center,
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: '/assets/icons/map-mark.svg',
      iconImageSize: [42, 42],
      iconImageOffset: [-15, -30],
    },
  );

  map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контрол правил
  // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  map.geoObjects.add(placemark);
}

const initMaps = () => {
  const yandexMapsSection = $('section[data-id="yandex-map"]');

  if (yandexMapsSection.length) {
    const ymapsSrc = yandexMapsSection.attr('data-src');

    $.ajax({
      url: ymapsSrc,
      dataType: 'script',
    }).done(function () {
      ymaps.ready(init);
    });
  }
};

initMaps();
