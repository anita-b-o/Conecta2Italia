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

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Evita el envío del formulario

  // Recoger los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;
  const opcion = document.getElementById('opciones') ? document.getElementById('opciones').value : null;

  // Preparar los datos para el backend
  const datosFormulario = {
      nombre: nombre,
      telefono: telefono,
      email: email,
      mensaje: mensaje,
      opcionSeleccionada: opcion
  };

  // Llamar a la API del backend usando fetch
  fetch('/mailer.php', {
    method: 'POST',
    body: JSON.stringify(datosFormulario)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Correo enviado con éxito', data);
  })
  .catch(error => {
    console.error('Error al enviar el correo', error);
    alert('Hubo un error al enviar el correo');
  });
});


function redirigirAlFormulario(servicio) {
  localStorage.setItem("opcionSeleccionada", servicio); // Guarda la opción elegida
  window.location.href = "#contacto"; // Redirige al formulario
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
