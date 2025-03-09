new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,

  // pagination bullets
  pagination: {
    el: '.swiper-pagination',
    clickeable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },
  }
});

function redirigirAlFormulario(button) {
  // Obtener el valor del atributo 'data-option' del botón clickeado
  var opcionSeleccionada = button.getAttribute('data-option');
  
  // Asignar el valor a el campo oculto
  document.getElementById('opcionSeleccionada').value = opcionSeleccionada;

  var formularioSection = document.getElementById('contacto');  // Suponiendo que tu formulario está dentro de un div con id 'contacto'

  // Desplazar hacia el formulario para que sea visible (si está fuera de la vista)
  formularioSection.scrollIntoView({behavior: "smooth"});
}


document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav");

  nav.addEventListener("click", function () {
      nav.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const contactoBtn = document.querySelector(".contacto-btn");
  const contactoList = document.querySelector(".contacto-list");

  contactoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    contactoList.classList.toggle("active");
  });

  // Opcional: Cerrar el menú al hacer clic fuera
  document.addEventListener("click", function (event) {
    if (!contactoBtn.contains(event.target) && !contactoList.contains(event.target)) {
      contactoList.classList.remove("active");
    }
  });
});
