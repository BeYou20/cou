// Fetch images from the Google Sheets API and create slides
const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbyjhpUfLg2MKWB0HU6-na_5G2GkH5P4nLw2UWD3JZJ9CeMYTzIbdwCGbK0ga8H7Vdh-Uw/exec';

fetch(googleSheetsUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const swiperWrapper = document.querySelector('.image-swiper .swiper-wrapper');
    swiperWrapper.innerHTML = ''; // Clear existing slides

    data.images.forEach(image => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const img = document.createElement('img');
      img.src = image.url;
      img.alt = 'صورة من معرض الصور';
      
      slide.appendChild(img);
      swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper ONLY after slides have been added
    var imageSwiper = new Swiper('.image-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  })
  .catch(error => console.error('Error fetching images:', error));
