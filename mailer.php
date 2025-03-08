<?php
require __DIR__ . '/vendor/autoload.php';

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar que los datos estén presentes
    if (isset($_POST['email']) && isset($_POST['message'])) {
        // Obtener los datos enviados a través de AJAX
        $email = $_POST['email'];
        $message = $_POST['message'];

        // Crear el cliente de Resend
        $resend = Resend::client('re_Y44BwwEC_9oYuYWPixmvCfAJdCeeTabgh');

        try {
            // Enviar correo electrónico
            $result = $resend->emails->send([
                'from' => 'Acme <onboarding@resend.dev>',
                'to' => [$email],  // Usar el correo proporcionado por el formulario
                'subject' => 'Gracias por tu mensaje',
                'html' => '<strong>Gracias por tu mensaje: </strong>' . htmlspecialchars($message),
            ]);

            // Respuesta JSON al cliente
            echo json_encode(['status' => 'success', 'message' => 'Correo enviado correctamente']);
        } catch (\Exception $e) {
            // Manejo de errores
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        // Si falta algún dato
        echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
    }
} else {
    // Método no permitido
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>
