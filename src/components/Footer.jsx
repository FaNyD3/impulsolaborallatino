import { Instagram, WhatsApp } from './ui/Icons';
import styles from './Footer.module.css';

export default function Footer({ marca, nav, enlaceWhatsApp }) {
  return (
    <footer className={styles.footer}>
      <div className={'container ' + styles.inner}>
        <div>
          <img
            src="/logo.png"
            alt={marca.nombre}
            width="560"
            height="232"
            loading="lazy"
            decoding="async"
            className={styles.logo}
          />
          <p className={styles.descriptor}>{marca.descriptor}</p>
        </div>

        <nav className={styles.links} aria-label="Enlaces del pie de página">
          {nav.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <ul className={styles.contacto}>
          <li>
            <a className={styles.canal} href={'mailto:' + marca.email}>
              {marca.email}
            </a>
          </li>
          <li>
            <a
              className={styles.canal}
              href={enlaceWhatsApp}
              target="_blank"
              rel="noopener"
              title={marca.whatsappVisible}
            >
              <WhatsApp width="20" height="20" />
              WhatsApp
            </a>
          </li>
          <li>
            <a
              className={styles.canal}
              href={marca.instagram}
              target="_blank"
              rel="noopener"
              title={marca.instagramVisible}
            >
              <Instagram width="20" height="20" />
              Instagram
            </a>
          </li>
        </ul>

        <p className={styles.copy}>
          © {new Date().getFullYear()} {marca.nombre}. {marca.tagline}
        </p>
      </div>
    </footer>
  );
}
