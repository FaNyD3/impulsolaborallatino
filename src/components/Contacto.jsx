import { useState } from 'react';
import { ArrowRight, Instagram, WhatsApp } from './ui/Icons';
import { enlaceCorreo, enlaceWhatsApp, mensajeSolicitud } from '../lib/contacto';
import styles from './Contacto.module.css';

/** Reglas de validación. Devuelve un objeto con los campos en error. */
function validar(datos) {
  const errores = {};
  if (!datos.nombre.trim()) errores.nombre = 'Escribe tu nombre.';
  if (!datos.empresa.trim()) errores.empresa = 'Escribe el nombre de la empresa.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email))
    errores.email = 'Revisa el correo: usa un formato como nombre@empresa.com.';
  return errores;
}

export default function Contacto({ contacto, marca, talleres, enlaceGeneral }) {
  const opcionesInteres = [
    ...talleres.map((t) => ({ value: t.id, label: t.nombre })),
    ...contacto.interesExtra,
  ];

  const FORM_INICIAL = {
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    interes: opcionesInteres[0].value,
    grupo: contacto.tamanosGrupo[0],
    mensaje: '',
  };

  const [datos, setDatos] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [entregado, setEntregado] = useState(null); // null | 'whatsapp' | 'correo'

  const etiquetaInteres =
    opcionesInteres.find((o) => o.value === datos.interes)?.label ?? datos.interes;

  // Ambos canales entregan el mismo resumen, redactado con lo que ya se escribió.
  const resumen = mensajeSolicitud({ ...datos, interes: etiquetaInteres });
  const aWhatsApp = enlaceWhatsApp(marca.whatsapp, resumen);
  const aCorreo = enlaceCorreo(marca.email, `${contacto.asuntoCorreo}: ${etiquetaInteres}`, resumen);

  const alCambiar = ({ target: { name, value } }) => {
    setDatos((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
    setEntregado(null);
  };

  /**
   * Los canales son enlaces reales, así que el navegador los abre siempre.
   * Solo interceptamos para frenar la salida si faltan datos obligatorios.
   */
  const alElegirCanal = (canal) => (evento) => {
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      evento.preventDefault();
      setEntregado(null);
      return;
    }

    setEntregado(canal);
  };

  return (
    <section className={styles.seccion} id="contacto">
      <div className={`container ${styles.layout}`}>
        <div className={styles.info}>
          <p className={styles.eyebrow}>{contacto.eyebrow}</p>
          <h2 className={styles.titulo}>{contacto.titulo}</h2>
          <p className={styles.texto}>{contacto.texto}</p>

          <div className={styles.canales}>
            <a className={styles.whatsapp} href={enlaceGeneral} target="_blank" rel="noopener">
              <WhatsApp width="22" height="22" />
              Escribir por WhatsApp
            </a>
            <a className={styles.instagram} href={marca.instagram} target="_blank" rel="noopener">
              <Instagram width="22" height="22" />
              Síguenos en Instagram
            </a>
          </div>

          <ul className={styles.datos}>
            <li>
              <span className={styles.datoLabel}>Correo</span>
              <a href={`mailto:${marca.email}`}>{marca.email}</a>
            </li>
            <li>
              <span className={styles.datoLabel}>WhatsApp</span>
              <a href={enlaceGeneral} target="_blank" rel="noopener">
                {marca.whatsappVisible}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.formWrap}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()} noValidate>
            <Campo
              id="nombre"
              label="Nombre y apellido"
              value={datos.nombre}
              onChange={alCambiar}
              error={errores.nombre}
              autoComplete="name"
              placeholder="María Fernández"
            />
            <Campo
              id="empresa"
              label="Empresa"
              value={datos.empresa}
              onChange={alCambiar}
              error={errores.empresa}
              autoComplete="organization"
              placeholder="Nombre de tu organización"
            />
            <Campo
              id="email"
              type="email"
              label="Correo corporativo"
              value={datos.email}
              onChange={alCambiar}
              error={errores.email}
              autoComplete="email"
              placeholder="nombre@empresa.com"
            />
            <Campo
              id="telefono"
              type="tel"
              label="Teléfono (opcional)"
              value={datos.telefono}
              onChange={alCambiar}
              autoComplete="tel"
              placeholder="55 1234 5678"
            />

            <Select
              id="interes"
              label="Servicio de interés"
              value={datos.interes}
              onChange={alCambiar}
              opciones={opcionesInteres}
            />
            <Select
              id="grupo"
              label="Tamaño del grupo"
              value={datos.grupo}
              onChange={alCambiar}
              opciones={contacto.tamanosGrupo.map((t) => ({ value: t, label: t }))}
            />

            <div className={`${styles.campo} ${styles.campoAncho}`}>
              <label className={styles.label} htmlFor="mensaje">
                ¿Qué está pasando en tu equipo? (opcional)
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                className={styles.input}
                value={datos.mensaje}
                onChange={alCambiar}
                placeholder="Reestructura reciente, rotación alta, líderes nuevos sin experiencia…"
              />
            </div>

            <p className={styles.instruccion}>Elige por dónde quieres enviarnos tu solicitud:</p>

            <a
              className={styles.accionWhatsApp}
              href={aWhatsApp}
              target="_blank"
              rel="noopener"
              onClick={alElegirCanal('whatsapp')}
            >
              <WhatsApp width="20" height="20" />
              Enviar por WhatsApp
            </a>

            <a className={styles.accionCorreo} href={aCorreo} onClick={alElegirCanal('correo')}>
              Enviar por correo
              <ArrowRight width="18" height="18" />
            </a>

            <p className={styles.confirmacion} role="status">
              {entregado === 'whatsapp' &&
                'Abrimos WhatsApp con tu solicitud redactada. Solo falta que la envíes desde ahí.'}
              {entregado === 'correo' &&
                `Abrimos tu programa de correo con la solicitud lista para ${marca.email}. Si no se abrió, escríbenos por WhatsApp.`}
            </p>

            <p className={styles.aviso}>Usamos tus datos solo para responder esta solicitud.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Campo({ id, label, error, type = 'text', ...props }) {
  const errorId = `${id}-error`;
  return (
    <div className={styles.campo}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ id, label, opciones, ...props }) {
  return (
    <div className={styles.campo}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select id={id} name={id} className={styles.input} {...props}>
        {opciones.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
