import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
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

// Recoge los parámetros utm_* de la URL actual.
function getUtmParams(): Record<string, string> {
  const utm: Record<string, string> = {};
  try {
    new URL(window.location.href).searchParams.forEach((value, key) => {
      if (key.startsWith("utm_")) utm[key] = value;
    });
  } catch {
    /* noop */
  }
  return utm;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState<string | undefined>(undefined);
  const [acepta, setAcepta] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Cerrar con Escape y bloquear el scroll del body mientras está abierta.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

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
      setStatus("success");
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
      role="dialog"
      aria-modal="true"
      aria-label="Apúntate a las clases gratuitas"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#1A1A1A",
          border: "1px solid rgba(243,193,72,0.3)",
          borderTop: "4px solid #F3C148",
          padding: "2.5rem 2rem 2rem",
          maxHeight: "calc(100vh - 2.5rem)",
          overflowY: "auto",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: "0.875rem",
            right: "0.875rem",
            background: "none",
            border: "none",
            color: "#888888",
            cursor: "pointer",
            padding: "0.25rem",
            lineHeight: 0,
          }}
        >
          <X size={22} />
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#F3C148",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}
            >
              <Check size={30} color="#121212" />
            </div>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.85rem",
                color: "#F3C148",
                letterSpacing: "0.03em",
                marginBottom: "0.75rem",
              }}
            >
              ¡Estás dentro!
            </h3>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9375rem",
                color: "#CCCCCC",
                lineHeight: "1.7",
                marginBottom: "1.75rem",
              }}
            >
              Te hemos apuntado a las clases gratuitas. Revisa tu correo: ahí
              recibirás el enlace de acceso a las sesiones.
            </p>
            <button type="button" onClick={onClose} className="btn-gold" style={{ border: "2px solid #F3C148" }}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>
              La semana del dolor · Gratis
            </p>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2rem",
                color: "#FFFFFF",
                letterSpacing: "0.03em",
                lineHeight: 1.05,
                marginBottom: "0.5rem",
              }}
            >
              Apúntate a las 3 clases
            </h3>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.875rem",
                color: "#AAAAAA",
                lineHeight: "1.6",
                marginBottom: "1.75rem",
              }}
            >
              Déjanos tus datos y recibirás el acceso a las clases en directo del
              24, 27 y 28 de junio.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: "1.1rem" }}>
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
                    borderColor: errors.nombre ? "#ff6b6b" : inputStyle.border as string,
                  }}
                />
                {errors.nombre && <p style={errStyle}>{errors.nombre}</p>}
              </div>

              <div style={{ marginBottom: "1.1rem" }}>
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

              <div style={{ marginBottom: "1.1rem" }}>
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    política de privacidad
                  </a>{" "}
                  y el tratamiento de mis datos.
                </span>
              </label>
              {errors.acepta && <p style={errStyle}>{errors.acepta}</p>}

              {status === "error" && (
                <p
                  style={{
                    ...errStyle,
                    fontSize: "0.8125rem",
                    marginTop: "1rem",
                  }}
                >
                  No hemos podido enviar tus datos. Inténtalo de nuevo en unos
                  segundos.
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
          </>
        )}
      </div>
    </div>
  );
}
