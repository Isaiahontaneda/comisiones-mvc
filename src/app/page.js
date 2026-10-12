"use client";

import { useState } from "react";
import TablaComisiones from "./components/TablaComisiones.js";

// Vista: formulario con las fechas y la tabla de resultados
export default function Home() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [resultado, setResultado] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [calculado, setCalculado] = useState(false);

  async function calcular(evento) {
    evento.preventDefault();
    setMensaje("");
    setResultado([]);
    setCalculado(false);
    setCargando(true);

    try {
      const respuesta = await fetch(
        `/api/comisiones?desde=${desde}&hasta=${hasta}`
      );
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(datos.error);
      } else {
        setResultado(datos);
        setCalculado(true);
      }
    } catch (error) {
      setMensaje("No se pudo conectar con el servidor");
    }

    setCargando(false);
  }

  return (
    <main>
      <h1>Cálculo de comisiones</h1>
      <p>Elige un rango de fechas para ver la comisión de cada vendedor.</p>

      <form onSubmit={calcular}>
        <label>
          Desde:{" "}
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            required
          />
        </label>{" "}
        <label>
          Hasta:{" "}
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            required
          />
        </label>{" "}
        <button type="submit" disabled={cargando}>
          {cargando ? "Calculando..." : "Calcular"}
        </button>
      </form>

      {mensaje && <p className="error">{mensaje}</p>}

      {calculado && <TablaComisiones datos={resultado} />}
    </main>
  );
}