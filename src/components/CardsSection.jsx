import SectionHeading from './ui/SectionHeading';
import { ArrowRight, Check, iconMap } from './ui/Icons';
import styles from './CardsSection.module.css';

/**
 * Renderiza una sección de tarjetas a partir de la configuración del JSON.
 * Una sola implementación cubre las cuatro secciones del portafolio; la
 * apariencia cambia con `seccion.variante`.
 *
 * @param {object} seccion   - nodo de `content.secciones`
 * @param {Function} onVerTaller - abre un taller concreto en la sección de talleres
 */
export default function CardsSection({ seccion, onVerTaller }) {
  const { id, variante, eyebrow, titulo, subtitulo, items } = seccion;

  return (
    <section className={styles.seccion} id={id}>
      <div className="container">
        <SectionHeading eyebrow={eyebrow} titulo={titulo} subtitulo={subtitulo} />
        <ul className={`${styles.grid} ${styles[variante]}`}>
          {items.map((item) => (
            <Card key={item.titulo} item={item} variante={variante} onVerTaller={onVerTaller} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({ item, variante, onVerTaller }) {
  const Icono = item.icono ? iconMap[item.icono] : null;
  const destacada = Boolean(item.insignia);

  return (
    <li className={`${styles.card} ${destacada ? styles.cardDestacada : ''}`}>
      {item.insignia && <span className={styles.insignia}>{item.insignia}</span>}

      {item.etiqueta && (
        <span className={`${styles.nivel} ${styles[`nivel_${item.nivel}`]}`}>{item.etiqueta}</span>
      )}

      {Icono && (
        <span className={styles.icono}>
          <Icono width="22" height="22" />
        </span>
      )}

      <h3 className={styles.titulo}>{item.titulo}</h3>

      {item.texto && <p className={styles.texto}>{item.texto}</p>}

      {item.puntos && (
        <ul className={styles.puntos}>
          {item.puntos.map((punto) => (
            <li key={punto} className={styles.punto}>
              <Check width="15" height="15" className={styles.puntoIcono} />
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      )}

      {item.ideal && (
        <p className={styles.ideal}>
          <span className={styles.idealLabel}>Ideal para</span>
          {item.ideal}
        </p>
      )}

      {item.formato && (
        <p className={styles.formato}>
          <span className={styles.formatoLabel}>Formato sugerido</span>
          {item.formato}
        </p>
      )}

      {item.talleres?.length > 0 && (
        <div className={styles.talleres}>
          <span className={styles.talleresLabel}>Talleres relacionados</span>
          {item.talleres.map((taller) => (
            <button
              key={taller.id}
              type="button"
              className={styles.tallerLink}
              onClick={() => onVerTaller(taller.id)}
            >
              {taller.label}
              <ArrowRight width="15" height="15" />
            </button>
          ))}
        </div>
      )}

      {variante === 'paquetes' && (
        <a href="#contacto" className={styles.paqueteCta}>
          Cotizar este paquete
        </a>
      )}
    </li>
  );
}
