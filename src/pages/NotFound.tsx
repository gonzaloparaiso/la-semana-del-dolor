import { Link } from "wouter";

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "6rem", color: "#F3C148", lineHeight: 1 }}>
        404
      </h1>
      <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#AAAAAA" }}>
        Esta página no existe.
      </p>
      <Link href="/" className="btn-gold" style={{ textDecoration: "none" }}>
        Volver al inicio
      </Link>
    </div>
  );
}
