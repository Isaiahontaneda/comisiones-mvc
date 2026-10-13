"use client";

import { useState } from "react";
import TablaComisiones from "./components/TablaComisiones";

export default function Home() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [resultado, setResultado] = useState([]);
  const [mensaje, setMensaje] = useState("");

  async function calcular(evento) {
    evento.preventDefault();
    setMensaje("");
    setResultado([]);

    const respuesta = await fetch(
      "/api/comisiones?desde=" + desde + "&hasta=" + hasta
    );
    const datos = await respuesta.json();

    if (respuesta.ok) {
      setResultado(datos);
    } else {
      setMensaje(datos.error);
    }
  }

  return (
    <div>
      <h1>Calculo de comisiones</h1>
      <p>Elige un rango de fechas para ver la comision de cada vendedor.</p>

      <form onSubmit={calcular}>
        Desde: <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} required />
        <br />
        <br />
        Hasta: <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} required />
        <br />
        <br />
        <button type="submit">Calcular</button>
      </form>

      <p className="error">{mensaje}</p>

      {resultado.length > 0 && <TablaComisiones datos={resultado} />}
    </div>
  );
}