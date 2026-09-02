import { useRef } from 'react';
import SectionHeading from './ui/SectionHeading';
import { Check, Clock, Screen, Target, Users } from './ui/Icons';
import styles from './Talleres.module.css';

/**
 * Selector de talleres (patrón `tablist` de WAI-ARIA) más el panel de detalle.
 * El taller activo se controla desde `App` para que las líneas de servicio
 * puedan abrir un taller concreto.
 */
export default function Talleres({ seccion, talleres, activoId, onCambiar }) {
  const tabsRef = useRef([]);
  const activo = talleres.find((t) => t.id === activoId) ?? talleres[0];
  const indiceActivo = talleres.indexOf(activo);

  const alPresionarTecla = (evento) => {
    const saltos = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const salto = saltos[evento.key];
    if (!salto) return;

    evento.preventDefault();
    const siguiente = (indiceActivo + salto + talleres.length) % talleres.length;
    onCambiar(talleres[siguiente].id);
    tabsRef.current[siguiente]?.focus();
  };

  const meta = [
    { Icono: Clock, label: 'Duración', valor: activo.duracion },
    { Icono: Screen, label: 'Modalidad', valor: activo.modalidad },
    { Icono: Users, label: 'Tamaño de grupo', valor: activo.grupo },
  ];

  return (
    <section className={styles.seccion} id="talleres">
      <div className="container">
        <SectionHeading
          eyebrow={seccion.eyebrow}
          titulo={seccion.titulo}
          subtitulo={seccion.subtitulo}
        />

        <div className={styles.layout}>
          <div className={styles.lista} role="tablist" aria-label="Talleres disponibles">
            {talleres.map((taller, i) => {
              const esActivo = taller.id === activo.id;
              return (
                <button
                  key={taller.id}
                  ref={(el) => (tabsRef.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`tab-${taller.id}`}
                  aria-selected={esActivo}
                  aria-controls={`panel-${taller.id}`}
                  tabIndex={esActivo ? 0 : -1}
                  className={`${styles.item} ${esActivo ? styles.itemActivo : ''}`}
                  onClick={() => onCambiar(taller.id)}
                  onKeyDown={alPresionarTecla}
                >
                  <span className={styles.itemOrden}>{taller.orden}</span>
                  <span className={styles.itemTexto}>
                    <span className={styles.itemNombre}>{taller.nombre}</span>
                    <span className={styles.itemClaim}>{taller.claim}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <article
            key={activo.id}
            className={styles.panel}
            role="tabpanel"
            id={`panel-${activo.id}`}
            aria-labelledby={`tab-${activo.id}`}
            tabIndex={0}
          >
            <p className={styles.panelEyebrow}>Taller {activo.orden}</p>
            <h3 className={styles.panelTitulo}>{activo.nombre}</h3>

            <div className={styles.objetivo}>
              <p className={styles.objetivoLabel}>
                <Target width="17" height="17" />
                Objetivo del taller
              </p>
              <p className={styles.objetivoTexto}>{activo.objetivo}</p>
            </div>

            <dl className={styles.meta}>
              {meta.map(({ Icono, label, valor }) => (
                <div key={label} className={styles.metaItem}>
                  <dt className={styles.metaLabel}>
                    <Icono width="16" height="16" />
                    {label}
                  </dt>
                  <dd className={styles.metaValor}>{valor}</dd>
                </div>
              ))}
            </dl>

            <h4 className={styles.bloqueTitulo}>Contenido</h4>
            <ul className={styles.contenido}>
              {activo.contenido.map((tema) => (
                <li key={tema} className={styles.tema}>
                  <Check width="16" height="16" className={styles.temaIcono} />
                  <span>{tema}</span>
                </li>
              ))}
            </ul>

            <h4 className={styles.bloqueTitulo}>Dirigido a</h4>
            <p>{activo.dirigidoA}</p>

            <div className={styles.resultado}>
              <p className={styles.resultadoLabel}>Resultado esperado</p>
              <p className={styles.resultadoTexto}>{activo.resultado}</p>
            </div>

            <a href="#contacto" className={styles.panelCta}>
              Cotizar este taller
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
