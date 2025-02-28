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

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío tradicional

  let formData = new FormData(this); // Obtiene los datos del formulario

  // 1️⃣ Enviar el formulario por correo con PHP
  fetch("enviar.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.json()) // Convertir la respuesta a JSON
  .then(data => {
      alert(data.message); // Muestra el mensaje del servidor

      if (data.status === "success") { // Solo si el correo se envió correctamente
          this.reset(); // Limpia el formulario

          // 2️⃣ Ahora abrimos WhatsApp después de que el correo se envió
          setTimeout(function() {
              let nombre = document.getElementById("nombre").value;
              let telefono = document.getElementById("telefono").value;
              let email = document.getElementById("email").value;
              let mensaje = document.getElementById("mensaje").value;
              let opcion = document.getElementById("opcionSeleccionada").value;

              let mensajeWhatsapp = `Hola, soy ${nombre}.\nTeléfono: ${telefono}\nEmail: ${email}\nMensaje: ${mensaje}\nMotivo de contacto: ${opcion}`;
              let numeroWhatsApp = "5492216922121"; 
              window.open(`https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensajeWhatsapp)}`, "_blank");
          }, 500); // Espera 500ms antes de abrir WhatsApp
      }
  })
  .catch(error => console.error("Error:", error));
});

function redirigirAlFormulario(servicio) {
  localStorage.setItem("opcionSeleccionada", servicio); // Guarda la opción elegida
  window.location.href = "#contacto"; // Redirige al formulario
}

// Cuando la página carga, revisamos si hay una opción guardada
document.addEventListener("DOMContentLoaded", function () {
  let opcionSeleccionada = document.getElementById("opcionSeleccionada");
  let opcionGuardada = localStorage.getItem("opcionSeleccionada");

  if (opcionSeleccionada && opcionGuardada) {
      opcionSeleccionada.value = opcionGuardada; // Carga la opción en el formulario
      localStorage.removeItem("opcionSeleccionada"); // Borra la opción después de usarla
  }
});

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
