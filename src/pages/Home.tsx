/* ============================================================
   ARMOUR Landing Page — "Tactical Dark" Design System
   Fondo: #121212 | Acento: #F3C148 | Tipografía: Bebas Neue + Montserrat
   ============================================================ */

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Check, ArrowRight } from "lucide-react";

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

// ── Enlaces ─────────────────────────────────────────────────
// Los CTA genéricos hacen scroll a la sección de productos (#precio).
// Checkout de los 3 productos en trainingnorte.com.
const CHECKOUT_197 = "https://trainingnorte.com/finalizar-compra/?add-to-cart=31914";
const CHECKOUT_397 = "https://trainingnorte.com/finalizar-compra/?add-to-cart=31916";
const CHECKOUT_597 = "https://trainingnorte.com/finalizar-compra/?add-to-cart=31917";

// ── Clases gratuitas de la semana ───────────────────────────
const CLASES = [
  {
    dia: "Miércoles 24",
    mes: "junio",
    titulo: "Por qué te duele la espalda",
    desc: "Entiende qué hay detrás del dolor lumbar y por qué casi nunca es lo que te han contado.",
  },
  {
    dia: "Sábado 27",
    mes: "junio",
    titulo: "Mover sin miedo",
    desc: "Los patrones que tu cuerpo necesita recuperar para volver a confiar en el movimiento.",
  },
  {
    dia: "Domingo 28",
    mes: "junio",
    titulo: "Tu plan para dejar de convivir con el dolor",
    desc: "Cómo integrar todo en un sistema que funcione a largo plazo. Y qué viene después.",
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

// ── FAQ Item ─────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-question w-full text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        {open ? (
          <ChevronUp size={18} className="text-[#F3C148] flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown size={18} className="text-[#F3C148] flex-shrink-0 ml-4" />
        )}
      </button>
      {open && <p className="faq-answer">{answer}</p>}
    </div>
  );
}

// ── Testimonial ──────────────────────────────────────────────
function Testimonial({
  text,
  name,
  program,
}: {
  text: string;
  name: string;
  program?: string;
}) {
  return (
    <div className="testimonial-card fade-in-up">
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.9375rem",
          lineHeight: "1.8",
          color: "#CCCCCC",
          fontStyle: "italic",
          marginBottom: "1.25rem",
        }}
      >
        "{text}"
      </p>
      <div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "#F3C148",
            letterSpacing: "0.05em",
          }}
        >
          {name}
        </p>
        {program && (
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.75rem",
              color: "#666666",
              marginTop: "0.25rem",
            }}
          >
            {program}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Pillar Card ──────────────────────────────────────────────
function PillarCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="pillar-card fade-in-up">
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "3rem",
          color: "rgba(243,193,72,0.15)",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {number}
      </div>
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.5rem",
          color: "#F3C148",
          letterSpacing: "0.05em",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.875rem",
          color: "#AAAAAA",
          lineHeight: "1.7",
        }}
      >
        {description}
      </p>
    </div>
  );
}

// ── Pricing Tier ─────────────────────────────────────────────
function PricingTier({
  name,
  tagline,
  price,
  features,
  href,
  featured = false,
  badge,
  ctaLabel,
}: {
  name: string;
  tagline: string;
  price: string;
  features: string[];
  href: string;
  featured?: boolean;
  badge?: string;
  ctaLabel: string;
}) {
  return (
    <div
      className={"pricing-tier fade-in-up" + (featured ? " pricing-tier-featured" : "")}
      style={{
        backgroundColor: featured ? "#1C1C1C" : "#161616",
        border: featured ? "2px solid #F3C148" : "1px solid rgba(243,193,72,0.18)",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: featured ? "0 18px 50px rgba(0,0,0,0.45)" : "none",
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: "-0.85rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#F3C148",
            color: "#121212",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.35rem 1rem",
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </div>
      )}
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.75rem",
          color: featured ? "#F3C148" : "#FFFFFF",
          letterSpacing: "0.04em",
          marginBottom: "0.35rem",
        }}
      >
        {name}
      </h3>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.8125rem",
          color: "#888888",
          lineHeight: "1.5",
          marginBottom: "1.5rem",
          minHeight: "2.4em",
        }}
      >
        {tagline}
      </p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.75rem" }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", color: "#FFFFFF", lineHeight: 1 }}>
          {price}
        </span>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#F3C148" }}>
          €
        </span>
      </div>
      <div style={{ flexGrow: 1, marginBottom: "1.75rem" }}>
        {features.map((f) => (
          <div
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.65rem",
              padding: "0.55rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Check size={15} style={{ color: "#F3C148", marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem", color: "#CCCCCC", lineHeight: "1.5" }}>
              {f}
            </span>
          </div>
        ))}
      </div>
      <a
        href={href}
        className={featured ? "btn-gold btn-gold-pulse" : "btn-outline-gold"}
        style={{ textAlign: "center", textDecoration: "none", display: "block", width: "100%", boxSizing: "border-box" }}
      >
        {ctaLabel}
      </a>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  const [navScrolled, setNavScrolled] = useState(false);

  // ── UTM propagation ─────────────────────────────────────────
  // Se ejecuta DESPUÉS del renderizado de React, cuando los <a> ya existen en el DOM
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const utmParams: Record<string, string> = {};

    // Extraer todos los parámetros UTM de la URL actual
    currentUrl.searchParams.forEach((value, key) => {
      if (key.startsWith("utm_")) {
        utmParams[key] = value;
      }
    });

    // Si no hay parámetros UTM, no hacemos nada
    if (Object.keys(utmParams).length === 0) return;

    // Seleccionar todos los enlaces que apuntan a finalizar-compra
    const ctaLinks = document.querySelectorAll<HTMLAnchorElement>('a[href*="finalizar-compra"]');
    ctaLinks.forEach((link) => {
      try {
        const targetUrl = new URL(link.href);
        for (const key in utmParams) {
          targetUrl.searchParams.set(key, utmParams[key]);
        }
        link.href = targetUrl.toString();
      } catch (e) {
        console.error("Error procesando URL UTM:", e);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    {
      question: "¿Las clases online son gratuitas?",
      answer:
        "Sí, totalmente gratis. Son 3 clases en directo con Alba Estrada los días 24, 27 y 28 de junio. Solo tienes que apuntarte para reservar tu sitio y recibir el enlace de acceso.",
    },
    {
      question: "¿Y si no puedo conectarme en directo a alguna clase?",
      answer:
        "No te preocupes. Apúntate igualmente: durante la semana del lanzamiento tendrás acceso a la grabación de cada clase para que puedas verla cuando te venga bien.",
    },
    {
      question: "¿Qué diferencia hay entre los tres programas?",
      answer:
        "Low Back Armour (197€) es el programa completo de 3 meses en vídeo, para hacer a tu ritmo sin seguimiento. Low Back Armour + Seguimiento (397€) añade las sesiones en directo el primer mes, el grupo privado y las correcciones de movimiento cada 15 días. Y la opción Premium (597€) incluye todo lo anterior más WhatsApp directo con Alba Estrada para resolver tus dudas; solo hay 10 plazas.",
    },
    {
      question: "¿Cuándo puedo comprar el programa?",
      answer:
        "Las plazas del programa se abren durante la semana de clases y se cierran al terminar. Apúntate a las clases gratuitas para enterarte el primero cuando se abra la inscripción (y no quedarte sin una de las 10 plazas Premium).",
    },
    {
      question: "¿Cómo funciona el programa?",
      answer:
        "A través de nuestra plataforma recibirás 5 sesiones semanales guiadas con vídeos explicativos detallados. Debes comprometerte con un mínimo de 3 sesiones por semana para obtener resultados. El programa está diseñado para reeducar tu sistema completo: respiración, postura, movimiento, fuerza y hábitos.",
    },
    {
      question: "¿Es para mí si no hago CrossFit o entrenamiento funcional?",
      answer:
        "Por supuesto. El programa está diseñado para población general y para personas que ya entrenan. No necesitas experiencia previa ni material específico. Recibirás todas las adaptaciones que necesites.",
    },
    {
      question: "¿Perderé forma física durante el programa?",
      answer:
        "No. Al contrario: te sentirás más fuerte que nunca. Mejorarás movilidad, resistencia y fuerza. El programa no te pide que dejes de moverte, sino que te muevas mejor.",
    },
    {
      question: "¿Puedo hacerlo si tengo una lesión diagnosticada?",
      answer:
        "Si tienes un informe médico, puedes escribirnos contando tu caso y evaluaremos si el programa es adecuado para ti. En cualquier caso, siempre habrá una opción para ayudarte.",
    },
    {
      question: "¿Por qué el dolor lumbar es multifactorial?",
      answer:
        "El 80% de los dolores de espalda se diagnostican como 'dolor lumbar inespecífico'. Esto ocurre porque el dolor puede ser detonado por el estrés, malas posturas, hábitos, exceso de carga, o incluso por cómo interpretas el dolor. Por eso trabajar solo un músculo aislado no funciona: hay que abordar todo el sistema.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#121212", color: "#ffffff", minHeight: "100vh" }}>

      {/* ── URGENCY BAR ─────────────────────────────────── */}
      <div className="urgency-bar">
        La semana del dolor · 3 clases gratis con Alba · 24, 27 y 28 de junio
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
          <a
            href="#precio"
            className="btn-gold"
            style={{ fontSize: "0.75rem", padding: "0.625rem 1.5rem", textDecoration: "none", display: "inline-block" }}
          >
            Quiero eliminar mi dolor
          </a>
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
              No tienes por qué{" "}
              <span style={{ color: "#F3C148" }}>vivir con dolor</span>
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
              Esta semana, 3 clases online gratuitas con Alba Estrada para entender tu dolor lumbar y empezar a moverte sin miedo.
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
              En directo los días 24, 27 y 28 de junio. Reserva tu sitio gratis (y se queda grabado por si no puedes asistir).
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="#precio"
                className="btn-gold btn-gold-pulse"
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                Quiero eliminar mi dolor
              </a>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8125rem",
                  color: "#666666",
                  letterSpacing: "0.05em",
                }}
              >
                ↓ Plazas limitadas
              </span>
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
              Una semana para cambiar tu relación con el dolor de espalda. Tres sesiones online, en directo y gratuitas. Apúntate y recibe el enlace de acceso.
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
                  {clase.mes} · online en directo
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
            <a
              href="#precio"
              className="btn-gold btn-gold-pulse"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Quiero eliminar mi dolor
            </a>
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

      {/* ── LOS 5 PILARES ───────────────────────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#121212" }}>
        <div className="container">
          <div style={{ marginBottom: "3.5rem" }} className="fade-in-up">
            <p className="section-label">El sistema</p>
            <span className="gold-line" />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                lineHeight: 1.05,
                color: "#FFFFFF",
                maxWidth: "560px",
              }}
            >
              Trabajamos cinco pilares
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
            className="pillars-grid"
          >
            <PillarCard
              number="01"
              title="Respiración"
              description="Aprender a activar y relajar el sistema nervioso. La base de todo proceso de recuperación."
            />
            <PillarCard
              number="02"
              title="Postura"
              description="Cómo te organizas frente al entorno durante el día. Cambios pequeños con impacto enorme."
            />
            <PillarCard
              number="03"
              title="Movimiento"
              description="Recuperar los patrones naturales del cuerpo. Bisagra de cadera, estabilidad de tronco y más."
            />
            <PillarCard
              number="04"
              title="Fuerza"
              description="Desarrollar capacidad para que el cuerpo vuelva a confiar en el movimiento sin miedo."
            />
            <PillarCard
              number="05"
              title="Hábitos"
              description="Eres aquello que haces repetidamente. Integraremos herramientas para usar fuera del entrenamiento."
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── TESTIMONIOS 1 ───────────────────────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#0F0F0F" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }} className="fade-in-up">
            <p className="section-label">Lo que dicen</p>
            <span className="gold-line" />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.25rem, 4vw, 3rem)",
                color: "#FFFFFF",
              }}
            >
              Resultados reales de personas reales
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
            className="testimonials-grid"
          >
            <Testimonial
              text="Mi experiencia con Armour ha sido beneficiosa en muchos sentidos. Evidentemente y por lo que todos acudimos a este programa, mitigar dolores de espalda. Pero también aprender a conectar con tu cuerpo. Desde que empecé Armour me tomo todo de otra forma y lo más importante soy yo, no los kilos. Gracias a Alba porque nunca me ha dejado sola en el proceso."
              name="Erika Hernández Gómez"
              program="Armour"
            />
            <Testimonial
              text="Plan Armour ha sido mi salvación. Cuando el dolor crónico apareció en mi vida pensé que el CrossFit había terminado para mí. Al dolor físico se unieron la frustración y la falta de motivación. Ahora, gracias a Alba y Armour soy mucho más fuerte no sólo físicamente, también mentalmente."
              name="María Peralta"
              program="Armour"
            />
            <Testimonial
              text="El feedback de Armour es brutal: pasé de no poder hacer nada a tener una sentadilla frontal de 3x80 y un peso muerto de 3x90. Estoy más fuerte que nunca. El traumatólogo me recomendaba infiltración y no coger pesos. Armour cambió mi vida."
              name="Aixa A.J."
              program="Armour"
            />
            <Testimonial
              text="La programación me está ayudando y gustando mucho. Estoy recuperando una lesión de psoas y con la programación me mantengo activa mientras rehabilito. La técnica de respiración me ha abierto un nuevo mundo."
              name="María A. Martínez Díaz"
              program="Armour + Knee Armour + Carrera"
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

           {/* ── ESTRUCTURA DEL PROGRAMA ───────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#121212" }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: "3.5rem" }} className="fade-in-up">
            <p className="section-label">Estructura del sistema</p>
            <span className="gold-line" />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight: 1.05,
                color: "#FFFFFF",
                marginBottom: "0.75rem",
              }}
            >
              3 meses. 5 sesiones semanales.
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9375rem",
                lineHeight: "1.8",
                color: "#AAAAAA",
                maxWidth: "600px",
              }}
            >
              Comprométete con un mínimo de 3 sesiones por semana. El programa se divide en dos fases claras.
            </p>
          </div>

          {/* Timeline de 3 columnas */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
            className="fade-in-up structure-grid-3"
          >
            {/* Mes 1 */}
            <div>
              <div style={{ backgroundColor: "#F3C148", padding: "0.5rem 1.25rem", display: "inline-block", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.9rem", color: "#121212", letterSpacing: "0.1em" }}>MES 1</span>
              </div>
              <div style={{ backgroundColor: "#1A1A1A", borderTop: "3px solid #F3C148", padding: "1.75rem 1.5rem", minHeight: "320px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", color: "#F3C148", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Fase intensiva</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem", color: "#777777", marginBottom: "1.25rem", lineHeight: "1.6" }}>Sesiones en directo cada semana</p>
                {[
                  { n: "01", desc: "Respiración y sistema nervioso" },
                  { n: "02", desc: "Postura y organización corporal" },
                  { n: "03", desc: "Bisagra de cadera y estabilidad" },
                  { n: "04", desc: "Integración de todo lo aprendido" },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: "#F3C148", opacity: 0.5, flexShrink: 0, lineHeight: 1.4 }}>{s.n}</span>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem", color: "#CCCCCC", lineHeight: "1.5", margin: 0 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Meses 2 y 3 */}
            <div>
              <div style={{ backgroundColor: "rgba(243,193,72,0.12)", border: "1px solid rgba(243,193,72,0.3)", padding: "0.5rem 1.25rem", display: "inline-block", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.9rem", color: "#F3C148", letterSpacing: "0.1em" }}>MESES 2 Y 3</span>
              </div>
              <div style={{ backgroundColor: "#1A1A1A", borderTop: "3px solid rgba(243,193,72,0.4)", padding: "1.75rem 1.5rem", minHeight: "320px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", color: "#CCCCCC", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Consolidación</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem", color: "#777777", marginBottom: "1.25rem", lineHeight: "1.6" }}>Correcciones cada 15 días</p>
                {[
                  "Sesión de corrección de movimiento",
                  "Profundización en tu caso concreto",
                  "Ajuste de carga y progresión",
                  "Grupo privado de seguimiento activo",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <Check size={14} style={{ color: "#F3C148", opacity: 0.6, marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem", color: "#CCCCCC", lineHeight: "1.5", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compromiso */}
            <div>
              <div style={{ backgroundColor: "rgba(243,193,72,0.12)", border: "1px solid rgba(243,193,72,0.3)", padding: "0.5rem 1.25rem", display: "inline-block", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.9rem", color: "#F3C148", letterSpacing: "0.1em" }}>COMPROMISO</span>
              </div>
              <div style={{ backgroundColor: "#1A1A1A", borderTop: "3px solid rgba(243,193,72,0.4)", padding: "1.75rem 1.5rem", minHeight: "320px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", color: "#CCCCCC", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Tu parte del trato</h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem", color: "#777777", marginBottom: "1.25rem", lineHeight: "1.6" }}>Mínimo 3 sesiones por semana</p>
                {[
                  "3 meses de duración total",
                  "5 sesiones semanales disponibles",
                  "Sesiones en directo el primer mes",
                  "Correcciones cada 15 días (meses 2-3)",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <Check size={14} style={{ color: "#F3C148", opacity: 0.6, marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8125rem", color: "#CCCCCC", lineHeight: "1.5", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── QUÉ INCLUYE ─────────────────────────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#0F0F0F" }}>
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
              <p className="section-label">Todo incluido</p>
              <span className="gold-line" />
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                  lineHeight: 1.05,
                  color: "#FFFFFF",
                  marginBottom: "2rem",
                }}
              >
                Acceso completo durante 3 meses
              </h2>
              {[
                "Programa de entrenamiento guiado con vídeos y explicaciones detalladas",
                "Adaptado a todo tipo de personas con dolor lumbar",
                "Sesiones en directo con Alba Estrada (mes 1, semanales)",
                "Grabaciones de todas las sesiones en directo",
                "Guía de hábitos para el día a día",
                "Respiraciones guiadas para equilibrar el sistema nervioso",
                "Grupo privado de seguimiento con Alba Estrada",
                "Correcciones de movimiento cada 15 días (meses 2-3)",
              ].map((item) => (
                <div key={item} className="includes-item">
                  <Check size={16} className="gold-check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="fade-in-up">
              <div
                style={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid rgba(243,193,72,0.2)",
                  padding: "2.5rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#888888",
                    marginBottom: "0.5rem",
                  }}
                >
                  ¿Para quién es?
                </p>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2rem",
                    color: "#F3C148",
                    letterSpacing: "0.05em",
                    marginBottom: "1.5rem",
                  }}
                >
                  Este programa es para ti si...
                </h3>
                {[
                  "Tienes dolor lumbar recurrente",
                  "Quieres volver a moverte con seguridad",
                  "Sientes rigidez o molestias al entrenar o al despertar",
                  "Has decidido dejar de normalizar vivir con dolor",
                  "Eres población general o ya entrenas",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.75rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      textAlign: "left",
                    }}
                  >
                    <ArrowRight size={16} style={{ color: "#F3C148", marginTop: "2px", flexShrink: 0 }} />
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.875rem",
                        color: "#CCCCCC",
                        lineHeight: "1.6",
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
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
                  +10 años
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
                  estudiando el dolor y la espalda
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
                He creado este programa desde las ganas absolutas de ayudarte, porque yo misma pasé por un dolor que me inhabilitó durante{" "}
                <strong style={{ color: "#FFFFFF" }}>5 años</strong>. Miedo. Incertidumbre. Pero sobre todo: aprendizaje.
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
                Llevo más de 10 años estudiando el dolor y la espalda: cómo funcionan las estructuras, qué factores influyen en el dolor y cómo el sistema nervioso regula todo lo que sucede.
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
                Durante estos años he ayudado a cientos de personas a volver a correr, sentarse sin miedo, jugar con sus hijos… partes necesarias de la vida que el dolor lumbar arrebata.
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
                <strong style={{ color: "#FFFFFF" }}>ARMOUR</strong> es el conjunto de pasos que hacen que todo funcione. Durante 3 meses vamos a ir de la mano. Y puedo prometerte que lo vas a conseguir.
              </p>
              <a
                href="#precio"
                className="btn-outline-gold"
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                Quiero eliminar mi dolor
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── TESTIMONIOS 2 ───────────────────────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#0F0F0F" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }} className="fade-in-up">
            <p className="section-label">Más historias reales</p>
            <span className="gold-line" />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight: 1.05,
                color: "#FFFFFF",
              }}
            >
              Ellos ya dieron el paso
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
            className="testimonials-grid"
          >
            <Testimonial
              text="Pasé de no poder levantarme del suelo sin ayuda a hacer sentadilla con barra. No lo habría creído si no lo hubiera vivido. El trabajo de respiración fue lo que más me sorprendió: nunca pensé que tuviera tanto impacto en el dolor."
              name="Carlos M."
              program="Armour"
            />
            <Testimonial
              text="Llevaba 3 años con dolor crónico. Médicos, fisios, ostéopatas... nada funcionaba a largo plazo. Armour fue diferente porque atacó el problema desde todos los ángulos. A los 6 semanas ya notaba la diferencia."
              name="Laura G."
              program="Armour"
            />
            <Testimonial
              text="Lo que más valoro es el grupo de seguimiento. Saber que Alba está ahí para responder cualquier duda hace que el proceso sea mucho más seguro y motivador. Nunca me sentí sola en el proceso."
              name="Ana R."
              program="Armour"
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PRECIO / OFERTA DE LANZAMIENTO ───────────────── */}
      <section id="precio" style={{ padding: "5rem 0", backgroundColor: "#121212" }}>
        <div className="container">
          <div style={{ marginBottom: "3.5rem", textAlign: "center", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }} className="fade-in-up">
            <p className="section-label" style={{ textAlign: "center" }}>La oferta de lanzamiento</p>
            <span className="gold-line" style={{ margin: "0 auto 1.5rem" }} />
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight: 1.05,
                color: "#FFFFFF",
                marginBottom: "1rem",
              }}
            >
              Elige cómo quieres dejar atrás tu dolor
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9375rem",
                color: "#AAAAAA",
                lineHeight: "1.7",
              }}
            >
              Tres formas de entrar a Low Back Armour. Las plazas se abren durante la semana de clases y se cierran al terminar.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              alignItems: "stretch",
              maxWidth: "1080px",
              margin: "0 auto",
            }}
            className="pricing-grid-3"
          >
            <PricingTier
              name="Low Back Armour"
              tagline="El programa completo, a tu ritmo y sin seguimiento."
              price="197"
              href={CHECKOUT_197}
              ctaLabel="Lo quiero"
              features={[
                "Programa completo de 3 meses en vídeo",
                "Los 5 pilares: respiración, postura, movimiento, fuerza y hábitos",
                "Adaptado a todo tipo de personas con dolor lumbar",
                "Guía de hábitos y respiraciones guiadas",
                "Acceso durante 3 meses",
              ]}
            />
            <PricingTier
              name="LBA + Seguimiento"
              tagline="El programa con acompañamiento de Alba para no ir solo."
              price="397"
              href={CHECKOUT_397}
              featured
              badge="El más elegido"
              ctaLabel="Quiero seguimiento"
              features={[
                "Todo lo del programa Low Back Armour",
                "Sesiones en directo con Alba el primer mes",
                "Grabaciones de todas las sesiones",
                "Grupo privado de seguimiento con Alba",
                "Correcciones de movimiento cada 15 días (meses 2-3)",
              ]}
            />
            <PricingTier
              name="LBA Premium"
              tagline="Todo lo anterior + WhatsApp directo con Alba. Solo 10 plazas."
              price="597"
              href={CHECKOUT_597}
              badge="Solo 10 plazas"
              ctaLabel="Quiero una plaza"
              features={[
                "Todo lo del programa + seguimiento",
                "WhatsApp directo con Alba Estrada",
                "Resolución de dudas personalizada y prioritaria",
                "Acompañamiento al máximo nivel",
                "Plazas estrictamente limitadas a 10 personas",
              ]}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "2.5rem",
            }}
            className="fade-in-up"
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#F3C148",
                animation: "pulse-gold 1.5s infinite",
              }}
            />
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.8125rem",
                color: "#888888",
                letterSpacing: "0.08em",
                textAlign: "center",
              }}
            >
              Pago único · Acceso durante 3 meses · Plazas limitadas
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section style={{ padding: "5rem 0", backgroundColor: "#0F0F0F" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "4rem",
              alignItems: "start",
            }}
            className="responsive-grid-2"
          >
            <div className="fade-in-up">
              <p className="section-label">FAQ</p>
              <span className="gold-line" />
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.25rem, 4vw, 3rem)",
                  lineHeight: 1.05,
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                }}
              >
                Preguntas frecuentes
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.875rem",
                  color: "#666666",
                  lineHeight: "1.7",
                }}
              >
                Todo lo que necesitas saber sobre el programa antes de dar el paso.
              </p>
            </div>
            <div className="fade-in-up">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
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
              Sí. Y empezamos esta semana. 3 clases gratis con Alba los días 24, 27 y 28 de junio. Reserva tu sitio antes de que se llenen.
            </p>
            <a
              href="#precio"
              className="btn-gold btn-gold-pulse"
              style={{ fontSize: "1rem", padding: "1.125rem 3.5rem", textDecoration: "none", display: "inline-block" }}
            >
              Quiero eliminar mi dolor
            </a>
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
        href="https://wa.me/34628436530?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20programa%20LOW%20BACK%20ARMOUR"
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

        /* Featured pricing tier: slightly larger, desktop only.
           Scoped to min-width so it simply doesn't exist on mobile (no scale there).
           !important beats .fade-in-up.visible, which has higher selector specificity. */
        @media (min-width: 769px) {
          .pricing-tier-featured {
            transform: scale(1.03) !important;
          }
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

          /* Classes + pricing grids collapse to 1 column */
          .classes-grid-3,
          .pricing-grid-3 {
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
    </div>
  );
}
