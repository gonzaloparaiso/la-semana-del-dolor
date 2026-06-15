/* ============================================================
   ARMOUR Landing Page — "Tactical Dark" Design System
   Fondo: #121212 | Acento: #F3C148 | Tipografía: Bebas Neue + Montserrat
   ============================================================ */

import { useEffect, useState } from "react";
import SignupForm from "../components/SignupForm";
import SuccessModal from "../components/SuccessModal";

// ── Assets ──────────────────────────────────────────────────
// BASE_URL incluye la barra final (p. ej. "/la-semana-del-dolor/"), así los
// assets de public/ resuelven bien tanto en local como en GitHub Pages.
const ASSET = import.meta.env.BASE_URL;
const LOGO_URL = `${ASSET}logo-tn.png`;
// Hero: foto del peso muerto (alumno con barra, Alba corrigiendo)
const HERO_BG = `${ASSET}hero.jpg`;
// Sección problema: foto de corrección lateral con barra (TN BOX)
const LATERAL_IMG = `${ASSET}lateral.jpg`;
// Sección Alba: foto de Alba con brazos cruzados (Training Norte)
const ALBA_IMG = `${ASSET}alba.jpg`;

// ── Clases gratuitas de la semana ───────────────────────────
const CLASES = [
  {
    dia: "Jueves 25",
    mes: "junio",
    hora: "19:30",
    titulo: "Por qué te duele la espalda",
    desc: "Aprenderás qué es el dolor: cómo tu sistema nervioso regula lo que sucede y de qué modo puedes eliminarlo.",
  },
  {
    dia: "Sábado 27",
    mes: "junio",
    hora: "18:30",
    titulo: "Cómo moverte sin miedo",
    desc: "Los patrones que tu cuerpo necesita recuperar para volver a confiar en el movimiento.",
  },
  {
    dia: "Domingo 28",
    mes: "junio",
    hora: "18:30",
    titulo: "Tu plan para dejar de convivir con el dolor",
    desc: "Cómo integrar todo en un sistema que funcione a largo plazo, construyendo una nueva relación con tu cuerpo.",
  },
];

// ── Scroll animation hook ────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Main Component ───────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  const [navScrolled, setNavScrolled] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const scrollToForm = () =>
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: "#121212", color: "#ffffff", minHeight: "100vh" }}>

      {/* ── URGENCY BAR ─────────────────────────────────── */}
      <div className="urgency-bar">
        La semana del dolor · 3 clases gratis con Alba · 25, 27 y 28 de junio
      </div>

      {/* ── NAVBAR ──────────────────────────────────────── */}
      <nav
        className="sticky-nav"
        style={{
          backgroundColor: navScrolled ? "rgba(18,18,18,0.98)" : "rgba(18,18,18,0.85)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
          }}
        >
          <img
             src={LOGO_URL}
             alt="Training Norte"
             width="220"
             height="52"
             loading="eager"
             style={{ height: "52px", objectFit: "contain", maxWidth: "220px" }}
           />
          <button
            type="button"
            onClick={scrollToForm}
            className="btn-gold"
            style={{ fontSize: "0.75rem", padding: "0.625rem 1.5rem", display: "inline-block" }}
          >
            Quiero eliminar mi dolor
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            opacity: 0.7,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(18,18,18,0.92) 0%, rgba(18,18,18,0.75) 50%, rgba(18,18,18,0.2) 100%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{ maxWidth: "620px" }}>
            <p className="section-label" style={{ marginBottom: "1rem" }}>
              Semana gratuita · 3 clases en directo · Alba Estrada
            </p>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                lineHeight: 0.95,
                letterSpacing: "0.02em",
                color: "#FFFFFF",
                marginBottom: "1.5rem",
              }}
            >
              La semana del{" "}
              <span style={{ color: "#F3C148" }}>dolor de espalda</span>
            </h1>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.125rem",
                lineHeight: "1.75",
                color: "#CCCCCC",
                marginBottom: "0.75rem",
                fontWeight: 400,
              }}
            >
              3 clases online gratuitas con Alba Estrada para entender tu dolor lumbar y empezar a moverte sin miedo.
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9375rem",
                lineHeight: "1.7",
                color: "#888888",
                marginBottom: "2.5rem",
              }}
            >
              En directo los días 25, 27 y 28 de junio. Reserva tu sitio gratis.
            </p>
            <div id="registro" style={{ scrollMarginTop: "90px" }}>
              <SignupForm onSuccess={() => setSuccessOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── LAS 3 CLASES GRATUITAS ──────────────────────── */}
      <section id="clases" style={{ padding: "5rem 0", backgroundColor: "#0F0F0F" }}>
        <div className="container">
          <div style={{ marginBottom: "3.5rem", maxWidth: "640px" }} className="fade-in-up">
            <p className="section-label">La semana del dolor · Gratis</p>
            <span className="gold-line" />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                lineHeight: 1.05,
                color: "#FFFFFF",
                marginBottom: "1rem",
              }}
            >
              3 clases en directo con Alba Estrada
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9375rem",
                lineHeight: "1.8",
                color: "#AAAAAA",
              }}
            >
              Una semana para dejar de pensar que siempre vivirás con dolor y ver los primeros resultados en directo. Tres sesiones online, en directo y gratuitas. Plazas muy limitadas.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
            className="fade-in-up classes-grid-3"
          >
            {CLASES.map((clase, i) => (
              <div
                key={clase.dia}
                style={{
                  backgroundColor: "#1A1A1A",
                  borderTop: "3px solid #F3C148",
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.1rem",
                    color: "rgba(243,193,72,0.4)",
                    letterSpacing: "0.1em",
                    marginBottom: "0.75rem",
                  }}
                >
                  CLASE {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.75rem",
                    color: "#F3C148",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {clase.dia}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#777777",
                    marginBottom: "1.25rem",
                  }}
                >
                  {clase.mes} · {clase.hora}h · online en directo
                </div>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.35rem",
                    color: "#FFFFFF",
                    letterSpacing: "0.03em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {clase.titulo}
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8125rem",
                    color: "#AAAAAA",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  {clase.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }} className="fade-in-up">
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-gold btn-gold-pulse"
              style={{ display: "inline-block" }}
            >
              Quiero eliminar mi dolor
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PROBLEMA / IDENTIFICACIÓN ───────────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#121212" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="responsive-grid-2"
          >
            <div className="fade-in-up">
              <p className="section-label">¿Te suena esto?</p>
              <span className="gold-line" />
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                  lineHeight: 1.05,
                  color: "#FFFFFF",
                  marginBottom: "1.5rem",
                }}
              >
                Muchas personas conviven con dolor de espalda durante años
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: "1.8",
                  color: "#AAAAAA",
                  marginBottom: "1.5rem",
                }}
              >
                Al principio aparece solo de vez en cuando. Pero después empieza a condicionar todo.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem" }}>
                {[
                  "Cómo te despiertas por las mañanas",
                  "Cómo duermes cada noche",
                  "Tu estado de ánimo y tus relaciones",
                  "Tu vida social y tu trabajo",
                  "Tu autoestima y tu confianza",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.9375rem",
                      color: "#CCCCCC",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ color: "#F3C148", fontSize: "0.75rem" }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: "1.8",
                  color: "#AAAAAA",
                }}
              >
                Y ya no sabes qué hacer. Empiezas a reducir los entrenamientos, te dicen que hagas reposo, coges miedo al movimiento…{" "}
                <strong style={{ color: "#FFFFFF" }}>¿Algún día volveré a estar sin dolor?</strong>
              </p>
            </div>
            <div className="fade-in-up" style={{ position: "relative" }}>
              <img
                src={LATERAL_IMG}
                alt="Corrección de movimiento con barra"
                className="problem-image"
                width="800"
                height="480"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                className="stat-badge"
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "-1.5rem",
                  backgroundColor: "#F3C148",
                  color: "#121212",
                  padding: "1.25rem 1.5rem",
                  maxWidth: "260px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.75rem",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  +100
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  casos de éxito probados
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />
      {/* ── SOBRE ALBA ───────────────────────────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#121212" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="responsive-grid-2"
          >
            <div className="fade-in-up" style={{ position: "relative" }}>
              <img
                src={ALBA_IMG}
                alt="Alba Estrada — Creadora de Armour"
                className="alba-image"
                width="600"
                height="580"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "580px",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
              <div
                className="alba-badge"
                style={{
                  position: "absolute",
                  top: "2rem",
                  right: "0",
                  backgroundColor: "#121212",
                  border: "2px solid #F3C148",
                  padding: "1.25rem 1.5rem",
                  maxWidth: "200px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2rem",
                    color: "#F3C148",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  +17 años
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#CCCCCC",
                    letterSpacing: "0.05em",
                  }}
                >
                  dedicada al entrenamiento y la salud
                </p>
              </div>
            </div>
            <div className="fade-in-up">
              <p className="section-label">Quién hay detrás</p>
              <span className="gold-line" />
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                  lineHeight: 1.05,
                  color: "#FFFFFF",
                  marginBottom: "1.5rem",
                }}
              >
                Hola, soy Alba Estrada
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: "1.85",
                  color: "#AAAAAA",
                  marginBottom: "1.25rem",
                }}
              >
                Llevo <strong style={{ color: "#FFFFFF" }}>+17 años</strong> dedicándome al entrenamiento y la salud. Pero no fue hasta 2018, después de competir en los CrossFit Games, que empecé un proceso de <strong style={{ color: "#FFFFFF" }}>5 años de dolor</strong> del que creía que no saldría.
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: "1.85",
                  color: "#AAAAAA",
                  marginBottom: "1.25rem",
                }}
              >
                En ese tiempo, donde el dolor me modificó por completo la vida, estudié, aprendí y ayudé a cientos de personas a vivir sin dolor.
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: "1.85",
                  color: "#AAAAAA",
                  marginBottom: "1.25rem",
                }}
              >
                Nadie está hablando de cómo diferentes técnicas, posturas y factores influyen en el dolor y cómo, a través de equilibrar tu sistema nervioso, puedes recuperar tu salud.
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.9375rem",
                  lineHeight: "1.85",
                  color: "#AAAAAA",
                  marginBottom: "2rem",
                }}
              >
                En <strong style={{ color: "#FFFFFF" }}>la semana del dolor de espalda</strong> te compartiré el paso a paso para que tú también puedas recuperar la confianza en tu cuerpo y eliminar el dolor de espalda.
              </p>
              <button
                type="button"
                onClick={scrollToForm}
                className="btn-outline-gold"
                style={{ display: "inline-block" }}
              >
                Quiero eliminar mi dolor
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />
      {/* ── CTA FINAL ───────────────────────────────────── */}
      <section
        style={{
          padding: "6rem 0",
          backgroundColor: "#121212",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${LATERAL_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.06,
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="fade-in-up">
            <p className="section-label" style={{ textAlign: "center" }}>
              Nadie tiene por qué vivir con dolor
            </p>
            <span className="gold-line" style={{ margin: "0 auto 1.5rem" }} />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight: 1,
                color: "#FFFFFF",
                marginBottom: "1.5rem",
                maxWidth: "800px",
                margin: "0 auto 1.5rem",
              }}
            >
              ¿Algún día volveré a estar{" "}
              <span style={{ color: "#F3C148" }}>sin dolor?</span>
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: "1.8",
                color: "#AAAAAA",
                maxWidth: "560px",
                margin: "0 auto 2.5rem",
              }}
            >
              Sí. Y empiezas ahora. En estos 3 días gratis con Alba los días 25, 27 y 28 de junio. Reserva tu sitio y recupera tu vitalidad.
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-gold btn-gold-pulse"
              style={{ fontSize: "1rem", padding: "1.125rem 3.5rem", display: "inline-block" }}
            >
              Quiero eliminar mi dolor
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: "#0A0A0A",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "3rem 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
           <img
             src={LOGO_URL}
             alt="Training Norte"
             width="160"
             height="32"
             loading="lazy"
             style={{ height: "32px", objectFit: "contain", opacity: 0.7 }}
           />
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.8125rem",
              color: "#444444",
              letterSpacing: "0.05em",
            }}
          >
            © 2024 Training Norte · Todos los derechos reservados
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { label: "Términos y condiciones", href: "https://trainingnorte.com/condiciones-de-compra/" },
              { label: "Política de privacidad", href: "https://trainingnorte.com/politica-de-proteccion-de-datos/" },
              { label: "Aviso legal", href: "https://trainingnorte.com/aviso-legal/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  color: "#444444",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F3C148")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444444")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ──────────────────── */}
      <a
        href="https://wa.me/34611227185?text=quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20semana%20del%20dolor"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "1.75rem",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.45)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          textDecoration: "none",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.12)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 28px rgba(37, 211, 102, 0.65)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(37, 211, 102, 0.45)";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="32"
          height="32"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── Responsive styles ───────────────────────────── */}
      <style>{`
        /* Prevent horizontal overflow globally */
        html, body, #root {
          overflow-x: hidden;
          max-width: 100%;
        }

        @media (max-width: 768px) {
          /* All 2-column grids collapse to 1 column */
          .responsive-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          /* 3-column structure grid collapses to 1 column */
          .structure-grid-3 {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          /* Classes grid collapses to 1 column */
          .classes-grid-3 {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          /* Testimonial grids: 1 column on mobile */
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }

          /* Pillar cards: 1 column on mobile */
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }

          /* Hero section adjustments */
          .hero-section {
            min-height: 100svh !important;
            padding: 6rem 0 3rem !important;
          }

          /* Reduce hero title size on mobile */
          .hero-title {
            font-size: clamp(3rem, 12vw, 5rem) !important;
          }

          /* Section padding reduction on mobile */
          .mobile-section {
            padding: 3.5rem 0 !important;
          }

          /* Announcement bar text smaller */
          .announcement-bar {
            font-size: 0.65rem !important;
            letter-spacing: 0.08em !important;
          }

          /* Price box padding */
          .price-box {
            padding: 2rem 1.25rem !important;
          }

          /* Fix image overflow in problem section */
          .problem-image {
            height: 320px !important;
          }

          /* Fix the stat badge that overflows left */
          .stat-badge {
            left: 0 !important;
            bottom: 1rem !important;
          }

          /* Alba section image height */
          .alba-image {
            height: 380px !important;
          }

          /* Badge a la parte inferior en móvil para no tapar la cara */
          .alba-badge {
            top: auto !important;
            bottom: 0 !important;
            right: 0 !important;
          }

          /* Nav padding on mobile */
          .nav-container {
            padding: 0.75rem 1rem !important;
          }

          /* Logo size on mobile */
          .nav-logo {
            height: 36px !important;
          }

          /* CTA button in nav smaller */
          .nav-cta {
            font-size: 0.65rem !important;
            padding: 0.5rem 0.875rem !important;
          }

          /* Footer links wrap */
          .footer-links {
            flex-direction: column !important;
            gap: 0.75rem !important;
            align-items: center !important;
          }

          /* Includes items text size */
          .includes-item {
            font-size: 0.875rem !important;
          }

          /* FAQ section */
          .faq-section {
            padding: 3rem 0 !important;
          }
        }

        @media (max-width: 480px) {
          /* Extra small screens */
          .hero-title {
            font-size: clamp(2.75rem, 14vw, 4rem) !important;
          }
          .price-amount {
            font-size: 4rem !important;
          }
        }
      `}</style>

      {/* ── MODAL DE ÉXITO (paso a la comunidad) ────────── */}
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  );
}
