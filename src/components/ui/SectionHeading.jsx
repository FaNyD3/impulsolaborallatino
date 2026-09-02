import styles from './SectionHeading.module.css';

/** Encabezado estándar de sección. `align="left"` para bloques asimétricos. */
export default function SectionHeading({ eyebrow, titulo, subtitulo, align = 'center' }) {
  return (
    <header className={`${styles.heading} ${align === 'left' ? styles.left : ''}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.titulo}>{titulo}</h2>
      {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
    </header>
  );
}
