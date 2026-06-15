import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const WEBHOOK_URL = "https://hook.eu2.make.com/kamky7gf2njcebcpuqh4v6qn1um64243";

// URL de la política de privacidad para el checkbox de condiciones.
const PRIVACY_URL = "https://trainingnorte.com/politica-de-proteccion-de-datos/";

type Errors = {
  nombre?: string;
  email?: string;
  telefono?: string;
  acepta?: string;
};

// Recoge los parámetros utm_* de la URL actual (p. ej. utm_origen, utm_anuncio).
// Si no vienen utm_origen / utm_anuncio, se rellenan con valores por defecto
// para distinguir el tráfico orgánico del de campañas.
function getUtmParams(): Record<string, string> {
  const utm: Record<string, string> = {};
  try {
    new URL(window.location.href).searchParams.forEach((value, key) => {
      if (key.startsWith("utm_") && value) utm[key] = value;
    });
  } catch {
    /* noop */
  }
  if (!utm.utm_origen) utm.utm_origen = "organico";
  if (!utm.utm_anuncio) utm.utm_anuncio = "no_aplica";
  return utm;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState<string | undefined>(undefined);
  const [acepta, setAcepta] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const validate = (): boolean => {
    const next: Errors = {};
    if (!nombre.trim()) next.nombre = "Indica tu nombre";
    if (!email.trim()) next.email = "Indica tu correo";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Correo no válido";
    if (!telefono) next.telefono = "Indica tu teléfono";
    else if (!isValidPhoneNumber(telefono)) next.telefono = "Teléfono no válido";
    if (!acepta) next.acepta = "Debes aceptar las condiciones";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    const payload = {
      nombre: nombre.trim(),
      email: email.trim(),
      telefono,
      acepta_condiciones: true,
      pagina: window.location.href,
      enviado_en: new Date().toISOString(),
      ...getUtmParams(),
    };
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onSuccess();
    } catch (err) {
      console.error("Error enviando el formulario:", err);
      setStatus("error");
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#AAAAAA",
    marginBottom: "0.4rem",
    display: "block",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#111111",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#FFFFFF",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9375rem",
    padding: "0.75rem 0.875rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const errStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    color: "#ff6b6b",
    marginTop: "0.35rem",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "440px",
        backgroundColor: "#1A1A1A",
        border: "1px solid rgba(243,193,72,0.3)",
        borderTop: "4px solid #F3C148",
        padding: "2rem 1.75rem",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "2rem",
          color: "#FFFFFF",
          letterSpacing: "0.03em",
          lineHeight: 1.05,
          marginBottom: "0.4rem",
        }}
      >
        Apúntate gratis a las 3 clases
      </h3>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.875rem",
          color: "#AAAAAA",
          lineHeight: "1.6",
          marginBottom: "1.5rem",
        }}
      >
        Déjanos tus datos y recibirás el acceso a las clases en directo del 25,
        27 y 28 de junio.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="sm-nombre" style={labelStyle}>
            Nombre
          </label>
          <input
            id="sm-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            style={{
              ...inputStyle,
              borderColor: errors.nombre ? "#ff6b6b" : (inputStyle.border as string),
            }}
          />
          {errors.nombre && <p style={errStyle}>{errors.nombre}</p>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="sm-email" style={labelStyle}>
            Correo electrónico
          </label>
          <input
            id="sm-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            style={{
              ...inputStyle,
              borderColor: errors.email ? "#ff6b6b" : (inputStyle.border as string),
            }}
          />
          {errors.email && <p style={errStyle}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="sm-tel" style={labelStyle}>
            Teléfono
          </label>
          <PhoneInput
            id="sm-tel"
            international
            defaultCountry="ES"
            value={telefono}
            onChange={setTelefono}
            placeholder="Tu teléfono"
            className={errors.telefono ? "sm-phone sm-phone-error" : "sm-phone"}
          />
          {errors.telefono && <p style={errStyle}>{errors.telefono}</p>}
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.6rem",
            cursor: "pointer",
            marginBottom: "0.4rem",
          }}
        >
          <input
            type="checkbox"
            checked={acepta}
            onChange={(e) => setAcepta(e.target.checked)}
            style={{
              marginTop: "0.2rem",
              width: "16px",
              height: "16px",
              accentColor: "#F3C148",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.8125rem",
              color: "#AAAAAA",
              lineHeight: "1.5",
            }}
          >
            Acepto la{" "}
            <a
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#F3C148", textDecoration: "underline" }}
            >
              política de privacidad
            </a>{" "}
            y el tratamiento de mis datos.
          </span>
        </label>
        {errors.acepta && <p style={errStyle}>{errors.acepta}</p>}

        {status === "error" && (
          <p style={{ ...errStyle, fontSize: "0.8125rem", marginTop: "1rem" }}>
            No hemos podido enviar tus datos. Inténtalo de nuevo en unos segundos.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-gold"
          style={{
            width: "100%",
            marginTop: "1.5rem",
            textAlign: "center",
            border: "2px solid #F3C148",
            opacity: status === "sending" ? 0.7 : 1,
            cursor: status === "sending" ? "wait" : "pointer",
          }}
        >
          {status === "sending" ? "Enviando…" : "Reservar mi plaza gratis"}
        </button>
      </form>
    </div>
  );
}
