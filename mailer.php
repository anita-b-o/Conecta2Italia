<?php
require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar y limpiar los datos
    $nombre = isset($_POST['nombre']) ? trim(htmlspecialchars($_POST['nombre'])) : '';
    $telefono = isset($_POST['telefono']) ? trim(htmlspecialchars($_POST['telefono'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : false;
    $mensaje = isset($_POST['mensaje']) ? trim(htmlspecialchars($_POST['mensaje'])) : '';

    $contenidoCorreo = "<h3>Nuevo mensaje de contacto</h3>";

    if (!empty($nombre)) {
        $errores[] = "El nombre es obligatorio.";
        $contenidoCorreo .= "<p><strong>Nombre:</strong> $nombre</p>";
    }
    if (!empty($telefono)) {
        $errores[] = "El teléfono es obligatorio.";
        $contenidoCorreo .= "<p><strong>Teléfono:</strong> $telefono</p>";
    }
    if ($email) { 
        $contenidoCorreo .= "<p><strong>Email:</strong> $email</p>";
    }
    if (!empty($mensaje)) {
        $contenidoCorreo .= "<p><strong>Mensaje:</strong><br>$mensaje</p>";
    }
    
    // Configurar el cliente de Resend
    $resend = Resend::client('re_Y44BwwEC_9oYuYWPixmvCfAJdCeeTabgh');

    try {
        // Enviar correo
        $resend->emails->send([
            'from' => 'Acme <onboarding@resend.dev>',
            'to' => ['conecta2italia@gmail.com'],
            'subject' => 'Gracias por tu mensaje',
            'html' => $contenidoCorreo
        ]);

        echo "El correo se ha enviado correctamente.";
    } catch (\Exception $e) {
        echo "Error al enviar el correo: " . $e->getMessage();
    }
} else {
    echo "Método no permitido.";
}
?>
