import { Route, Router, Switch } from "wouter";
import Home from "./pages/Home";
import Ventas from "./pages/Ventas";
import NotFound from "./pages/NotFound";

// Base path del despliegue (p. ej. "/la-semana-del-dolor" en GitHub Pages).
// Se deriva de la base de Vite, sin la barra final.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <Router base={BASE}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ventas" component={Ventas} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
