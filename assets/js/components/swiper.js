function initializeSwiper(selector) {
  // Shared settings for all swipers
  const settings = {
    loop: true,
    spaceBetween: 30,
    // centeredSlides: true,
    speed: 700,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: `${selector} .button-next`,
      prevEl: `${selector} .button-prev`,
    },
    breakpoints: {
      1440: { slidesPerView: 4 },
      1024: { slidesPerView: 3.5, spaceBetween: 50 },
      768: { slidesPerView: 2.5 },
      640: { slidesPerView: 2 },
      480: { slidesPerView: 1.5 },
      320: { slidesPerView: 1 },
    },
  };

  // Initialize the swiper
  return new Swiper(selector + " .swiper", settings);
}

// Initialize different swipers
const swipers = {
  trendingBidsSwiper: initializeSwiper(".trending", "products"),
  futureBidsSwiper: initializeSwiper(".future", "products"),
  currentBidsSwiper: initializeSwiper(".current-bids", "products"),
  finishedBidsSwiper: initializeSwiper(".finished-bids", "products"),
};
