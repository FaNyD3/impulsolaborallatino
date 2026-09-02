import { iconMap } from './ui/Icons';
import styles from './Nosotros.module.css';

/**
 * Bloque editorial: encabezado a la izquierda y relato a la derecha, con los
 * pilares a todo lo ancho debajo. El reparto asimétrico mantiene la medida de
 * lectura acotada aunque el texto crezca.
 */
export default function Nosotros({ nosotros, logoAlt }) {
  return (
    <section className={styles.seccion} id="nosotros">
      <div className="container">
        <div className={styles.relato}>
          <div className={styles.encabezado}>
            <p className={styles.eyebrow}>{nosotros.eyebrow}</p>
            <h2 className={styles.titulo}>{nosotros.titulo}</h2>
            <img
              src="/logo.png"
              alt={logoAlt}
              width="560"
              height="232"
              loading="lazy"
              decoding="async"
              className={styles.logo}
            />
          </div>

          <div className={styles.cuerpo}>
            {nosotros.parrafos.map((texto) => (
              <p key={texto.slice(0, 32)} className={styles.parrafo}>
                {texto}
              </p>
            ))}
          </div>
        </div>

        <ul className={styles.pilares}>
          {nosotros.pilares.map((pilar) => {
            const Icono = iconMap[pilar.icono];
            return (
              <li key={pilar.titulo} className={styles.pilar}>
                <span className={styles.pilarIcono}>
                  <Icono width="22" height="22" />
                </span>
                <h3 className={styles.pilarTitulo}>{pilar.titulo}</h3>
                <p className={styles.pilarTexto}>{pilar.texto}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
