import SectionHeading from './ui/SectionHeading';
import { iconMap } from './ui/Icons';
import styles from './Incluye.module.css';

export default function Incluye({ incluye }) {
  return (
    <section className={styles.seccion} id="incluye">
      <div className="container">
        <SectionHeading
          eyebrow={incluye.eyebrow}
          titulo={incluye.titulo}
          subtitulo={incluye.subtitulo}
        />

        <ol className={styles.grid}>
          {incluye.items.map((item, i) => {
            const Icono = iconMap[item.icono];
            return (
              <li key={item.titulo} className={styles.card}>
                <span className={styles.paso}>Paso {i + 1}</span>
                <span className={styles.icono}>
                  <Icono width="22" height="22" />
                </span>
                <h3 className={styles.titulo}>{item.titulo}</h3>
                <p className={styles.texto}>{item.texto}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
