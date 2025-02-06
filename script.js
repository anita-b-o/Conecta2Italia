let currentIndex = 3;
const itemsPerView = 1;
const slider = document.querySelector('.slider-container');
const totalButtons = document.querySelectorAll('.button-container').length;

function updateSlider() {
  const offset = -(currentIndex * 110);
  slider.style.transform = `translateX(${offset}px)`;
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = Math.max(0, totalButtons - itemsPerView);
  }
  updateSlider();
}

function nextSlide() {
  if (currentIndex < totalButtons - itemsPerView) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlider();
}

updateSlider();
