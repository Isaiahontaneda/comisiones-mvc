import { NextResponse } from "next/server";
import { calcularComisiones } from "@/controllers/comisionController";

// Se usa así: /api/comisiones?desde=2026-10-01&hasta=2026-10-31
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const desde = searchParams.get("desde");
    const hasta = searchParams.get("hasta");

    const resultado = await calcularComisiones(desde, hasta);

    return NextResponse.json(resultado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}