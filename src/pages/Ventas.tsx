import { useEffect } from "react";

// La carta de ventas es ahora una página estática en /ventas/ (public/ventas/index.html),
// con el HTML que ha proporcionado el cliente. Este componente solo redirige a ella
// por si se entra a /ventas sin barra final (a través del fallback SPA).
export default function Ventas() {
  useEffect(() => {
    window.location.replace(import.meta.env.BASE_URL + "ventas/");
  }, []);
  return null;
}
