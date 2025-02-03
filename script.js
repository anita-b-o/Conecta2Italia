let currentIndex = 0;

function showImage(index) {
  const slider = document.querySelector('.image-slider');
  const totalImages = document.querySelectorAll('.image-container').length;

  // Loop the carousel
  if (index < 0) {
    currentIndex = totalImages - 1;
  } else if (index >= totalImages) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

function prevImage() {
  showImage(currentIndex - 1);
}

function nextImage() {
  showImage(currentIndex + 1);
}
