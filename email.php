<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitización y validación de los datos
    $nombre = trim(htmlspecialchars($_POST["nombre"]));
    $telefono = trim(htmlspecialchars($_POST["telefono"]));
    $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
    $mensaje = trim(htmlspecialchars($_POST["mensaje"]));
    $opcionSeleccionada = trim(htmlspecialchars($_POST["opcionSeleccionada"]));

    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Email no válido"]);
        exit;
    }

    $destinatario = "tucorreo@ejemplo.com"; // Cambia esto por tu correo
    $asunto = "Nuevo mensaje de contacto: $opcionSeleccionada";

    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Mensaje: $mensaje\n";
    $cuerpo .= "Motivo de contacto: $opcionSeleccionada\n";

    // Mejor usar un correo de tu dominio en 'From'
    $cabeceras = "From: noreply@tudominio.com\r\n";
    $cabeceras .= "Reply-To: $email\r\n";
    $cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destinatario, $asunto, $cuerpo, $cabeceras)) {
        echo json_encode(["status" => "success", "message" => "Mensaje enviado correctamente"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Hubo un error al enviar el mensaje"]);
    }
}
?>
