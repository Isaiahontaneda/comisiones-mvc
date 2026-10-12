import supabase from "@/lib/supabaseClient";

// Trae todos los vendedores
export async function obtenerVendedores() {
  const { data, error } = await supabase.from("vendedor").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}