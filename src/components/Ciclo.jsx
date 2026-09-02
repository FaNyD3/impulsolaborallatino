import { ArrowRight } from './ui/Icons';
import styles from './Ciclo.module.css';

export default function Ciclo({ ciclo }) {
  return (
    <section className={styles.seccion} id="ciclo">
      <div className="container">
        <div className={styles.panel}>
          <p className={styles.eyebrow}>{ciclo.eyebrow}</p>
          <h2 className={styles.titulo}>{ciclo.titulo}</h2>
          <p className={styles.bajada}>{ciclo.bajada}</p>

          <ol className={styles.ruta}>
            {ciclo.etapas.map((etapa) => (
              <li key={etapa.mes} className={styles.etapa}>
                <div className={styles.marca}>
                  <span className={styles.punto} aria-hidden="true" />
                  <span className={styles.mes}>{etapa.mes}</span>
                </div>
                <span className={styles.nivel}>{etapa.nivel}</span>
                <h3 className={styles.etapaTitulo}>{etapa.titulo}</h3>
                <p className={styles.etapaTexto}>{etapa.texto}</p>
              </li>
            ))}
          </ol>

          <div className={styles.pie}>
            <p className={styles.nota}>{ciclo.nota}</p>
            <a href="#contacto" className={styles.cta}>
              {ciclo.cta}
              <ArrowRight width="18" height="18" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
