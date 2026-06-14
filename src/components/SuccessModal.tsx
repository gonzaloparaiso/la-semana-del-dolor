import { useEffect } from "react";
import { X, Check } from "lucide-react";

// Comunidad de WhatsApp: último paso tras el registro.
const COMMUNITY_URL = "https://chat.whatsapp.com/JbD59hHAnhxKCThLLBpxER";

export default function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Registro completado"
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
          textAlign: "center",
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
          acceso, entra ahora en la comunidad de WhatsApp: ahí daremos todos los
          avisos y el enlace a las sesiones.
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
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A0A0A" width="20" height="20">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Entrar en la comunidad
        </a>
      </div>
    </div>
  );
}
