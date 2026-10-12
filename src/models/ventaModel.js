import supabase from "@/lib/supabaseClient";

// Trae las ventas que estén entre dos fechas (incluyéndolas)
export async function obtenerVentasPorFechas(desde, hasta) {
  const { data, error } = await supabase
    .from("ventas")
    .select("*")
    .gte("fecha_venta", desde)
    .lte("fecha_venta", hasta);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}