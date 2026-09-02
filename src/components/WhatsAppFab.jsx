import { WhatsApp } from './ui/Icons';
import styles from './WhatsAppFab.module.css';

/** Acceso directo persistente a WhatsApp, visible en cualquier punto del scroll. */
export default function WhatsAppFab({ enlace, numeroVisible }) {
  return (
    <a
      className={styles.fab}
      href={enlace}
      target="_blank"
      rel="noopener"
      aria-label={`Escribir por WhatsApp al ${numeroVisible}`}
    >
      <WhatsApp width="28" height="28" />
      <span className={styles.texto}>WhatsApp</span>
    </a>
  );
}
