import { obtenerVendedores } from "@/models/vendedorModel";
import { obtenerVentasPorFechas } from "@/models/ventaModel";
import { obtenerReglas } from "@/models/reglaModel";

// Busca el porcentaje que le corresponde a un monto.
// Las reglas vienen ordenadas de menor a mayor monto_minimo.
// Se queda con la última regla que el monto alcanza.
function buscarPorcentaje(monto, reglas) {
  let porcentaje = 0;

  for (const regla of reglas) {
    if (monto >= regla.monto_minimo) {
      porcentaje = regla.porcentaje;
    }
  }

  return porcentaje;
}

// Calcula la comisión de cada vendedor entre dos fechas
export async function calcularComisiones(desde, hasta) {
  // 1. Validar las fechas
  if (!desde || !hasta) {
    throw new Error("Debes indicar la fecha desde y la fecha hasta");
  }

  if (desde > hasta) {
    throw new Error("La fecha desde no puede ser mayor que la fecha hasta");
  }

  // 2. Pedir los datos a los modelos
  const vendedores = await obtenerVendedores();
  const ventas = await obtenerVentasPorFechas(desde, hasta);
  const reglas = await obtenerReglas();

  // 3. Calcular por cada vendedor
  const resultado = vendedores.map((vendedor) => {
    // Ventas de este vendedor
    const ventasDelVendedor = ventas.filter(
      (venta) => venta.vendedor_id === vendedor.id
    );

    let totalVentas = 0;
    let comision = 0;

    // La comisión se calcula venta por venta
    for (const venta of ventasDelVendedor) {
      const porcentaje = buscarPorcentaje(venta.monto, reglas);
      totalVentas += venta.monto;
      comision += (venta.monto * porcentaje) / 100;
    }

    return {
      id: vendedor.id,
      nombre: vendedor.nombre,
      cantidadVentas: ventasDelVendedor.length,
      totalVentas: totalVentas,
      comision: Math.round(comision * 100) / 100,
    };
  });

  return resultado;
}