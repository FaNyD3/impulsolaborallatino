import { useState } from 'react';
import content from './content.json';
import { enlaceWhatsApp } from './lib/contacto';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import CardsSection from './components/CardsSection';
import Talleres from './components/Talleres';
import Incluye from './components/Incluye';
import Ciclo from './components/Ciclo';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

const {
  marca,
  nav,
  hero,
  nosotros,
  secciones,
  talleresSeccion,
  talleres,
  incluye,
  ciclo,
  contacto,
} = content;

const enlaceGeneral = enlaceWhatsApp(marca.whatsapp, marca.whatsappMensaje);
const [portafolioPrincipal, ...portafolioRestante] = secciones;

export default function App() {
  const [tallerActivo, setTallerActivo] = useState(talleres[0].id);

  /** Abre un taller concreto desde las líneas de servicio y desplaza hasta él. */
  const verTaller = (id) => {
    setTallerActivo(id);
    document.getElementById('talleres')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <a href="#servicios" className="sr-only skip-link">
        Saltar al contenido
      </a>

      <Navbar marca={marca} nav={nav} />

            <main>
        <CardsSection seccion={portafolioPrincipal} onVerTaller={verTaller} />

        <Hero hero={hero} tagline={marca.tagline} />

        {portafolioRestante.map((seccion) => (
          <CardsSection key={seccion.id} seccion={seccion} onVerTaller={verTaller} />
        ))}

        <Nosotros nosotros={nosotros} logoAlt={marca.nombre} />

        <Talleres
          seccion={talleresSeccion}
          talleres={talleres}
          activoId={tallerActivo}
          onCambiar={setTallerActivo}
        />
        <Incluye incluye={incluye} />
        <Ciclo ciclo={ciclo} />
        <Contacto
          contacto={contacto}
          marca={marca}
          talleres={talleres}
          enlaceGeneral={enlaceGeneral}
        />
      </main>

      <Footer marca={marca} nav={nav} enlaceWhatsApp={enlaceGeneral} />
      <WhatsAppFab enlace={enlaceGeneral} numeroVisible={marca.whatsappVisible} />
    </>
  );
}
