import { useEffect, useState } from 'react';
import { Menu, Close } from './ui/Icons';
import styles from './Navbar.module.css';

export default function Navbar({ marca, nav }) {
  const [abierto, setAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);

  useEffect(() => {
    const alScrollear = () => setConScroll(window.scrollY > 8);
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    return () => window.removeEventListener('scroll', alScrollear);
  }, []);

  return (
    <header className={`${styles.nav} ${conScroll ? styles.navScrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.marca} onClick={() => setAbierto(false)}>
          <img
            src="/logo.png"
            alt={marca.nombre}
            width="560"
            height="232"
            className={styles.logo}
            fetchPriority="high"
          />
        </a>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {abierto ? <Close width="22" height="22" /> : <Menu width="22" height="22" />}
        </button>

        <nav
          id="menu-principal"
          className={`${styles.links} ${abierto ? styles.linksAbiertos : ''}`}
          aria-label="Navegación principal"
        >
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={() => setAbierto(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contacto" className={styles.cta} onClick={() => setAbierto(false)}>
            Agendar diagnóstico
          </a>
        </nav>
      </div>
    </header>
  );
}
