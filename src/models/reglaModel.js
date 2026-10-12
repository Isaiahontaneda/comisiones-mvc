import supabase from "@/lib/supabaseClient";

// Trae las reglas de comisión, ordenadas de menor a mayor monto
export async function obtenerReglas() {
  const { data, error } = await supabase
    .from("reglas")
    .select("*")
    .order("monto_minimo", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}