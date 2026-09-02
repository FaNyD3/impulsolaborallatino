import { ArrowRight, Spark } from './ui/Icons';
import styles from './Hero.module.css';

export default function Hero({ hero, tagline }) {
  return (
    <section className={styles.hero} id="inicio">
      <div className="container">
        <p className={styles.eyebrow}>
          <Spark width="15" height="15" />
          {hero.eyebrow} · {tagline}
        </p>

        <h1 className={styles.titulo}>
          {hero.tituloInicio} <span className={styles.destacado}>{hero.tituloDestacado}</span>{' '}
          {hero.tituloFin}
        </h1>

        <p className={styles.bajada}>{hero.bajada}</p>

        <div className={styles.acciones}>
          <a href={hero.ctaPrimario.href} className={styles.btnPrimario}>
            {hero.ctaPrimario.label}
            <ArrowRight width="18" height="18" />
          </a>
          <a href={hero.ctaSecundario.href} className={styles.btnSecundario}>
            {hero.ctaSecundario.label}
          </a>
        </div>

        <ul className={styles.metricas}>
          {hero.metricas.map((m) => (
            <li key={m.label} className={styles.metrica}>
              <span className={styles.metricaValor}>{m.valor}</span>
              <span className={styles.metricaLabel}>{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
