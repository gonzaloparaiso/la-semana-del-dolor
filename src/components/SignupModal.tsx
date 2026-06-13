import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const WEBHOOK_URL = "https://hook.eu2.make.com/kamky7gf2njcebcpuqh4v6qn1um64243";

// Comunidad de WhatsApp: último paso tras el registro.
const COMMUNITY_URL = "https://chat.whatsapp.com/JbD59hHAnhxKCThLLBpxER";

// URL de la política de privacidad para el checkbox de condiciones.
const PRIVACY_URL = "https://trainingnorte.com/politica-de-proteccion-de-datos/";

type Errors = {
  nombre?: string;
  email?: string;
  telefono?: string;
  acepta?: string;
};

// Recoge los parámetros utm_* de la URL actual (p. ej. utm_origen, utm_anuncio).
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
              ¡Casi listo! Falta un último paso
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
              Te hemos apuntado a las clases. Para confirmar tu plaza y recibir el
              acceso, entra ahora en la comunidad de WhatsApp: ahí daremos todos
              los avisos y el enlace a las sesiones.
            </p>
            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "#25D366",
                color: "#0A0A0A",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "0.9375rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "1rem 1.5rem",
                marginBottom: "1rem",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A0A0A" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Entrar en la comunidad
            </a>
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
