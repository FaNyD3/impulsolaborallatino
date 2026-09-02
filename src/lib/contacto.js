/**
 * Construcción de los enlaces de contacto.
 * La landing no tiene backend: el formulario redacta la solicitud y la entrega
 * al canal que elija el visitante, sin intermediarios ni servicios externos.
 */

/** Enlace wa.me con el mensaje ya codificado. */
export function enlaceWhatsApp(numero, mensaje) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Enlace mailto con asunto y cuerpo precargados.
 * Se codifica con `encodeURIComponent` y no con `URLSearchParams`: este último
 * convierte los espacios en `+`, que varios clientes de correo muestran
 * literalmente dentro del cuerpo del mensaje.
 */
export function enlaceCorreo(correo, asunto, cuerpo) {
  return `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

/** Resumen legible de la solicitud, común a ambos canales. */
export function mensajeSolicitud({ nombre, empresa, email, telefono, interes, grupo, mensaje }) {
  // El filtro descarta los campos opcionales vacíos, por eso el saludo
  // y el renglón en blanco se anteponen después de filtrar.
  const detalle = [
    `Nombre: ${nombre || '(sin especificar)'}`,
    `Empresa: ${empresa || '(sin especificar)'}`,
    `Correo: ${email || '(sin especificar)'}`,
    telefono && `Teléfono: ${telefono}`,
    `Interés: ${interes}`,
    `Tamaño del grupo: ${grupo}`,
    mensaje && `Contexto: ${mensaje}`,
  ].filter(Boolean);

  return ['Hola, quiero información sobre sus servicios.', '', ...detalle].join('\n');
}
