# Cálculo de comisiones con Next.js, React y Supabase (patrón MVC)

Tarea 4 de Ingeniería Web, Universidad de las Américas.

Es una aplicación de una sola pantalla. Se elige una fecha de inicio y una fecha final, se pulsa "Calcular" y aparece una tabla con lo que le corresponde de comisión a cada vendedor por las ventas hechas en ese periodo. Elegí como base el ejercicio "Minicore" de un semestre anterior (React y Supabase) y lo rehice con Next.js y React, separando el código en modelo, vista y controlador.

## Estado del proyecto

Terminado y desplegado.

## Qué se puede hacer

- Elegir un rango de fechas y calcular la comisión de cada vendedor.
- Ver por vendedor la cantidad de ventas, el total vendido y la comisión.
- Ver un mensaje de error si la fecha de inicio es mayor que la final.

## Regla de comisión

La comisión se calcula venta por venta, no sobre el total del vendedor:

| Monto de la venta | Comisión |
|---|---|
| Menos de $500 | 0 % |
| Desde $500 hasta menos de $1000 | 6 % |
| Desde $1000 | 8 % |

Los porcentajes no están escritos en el código, están en la tabla `reglas` de la base de datos. Si se agrega una fila nueva con otro monto mínimo, el cálculo la toma sin cambiar el código.

## Cómo apliqué el patrón MVC

| Capa | Carpeta | Qué hace |
|---|---|---|
| Modelo | `src/models/` | Hace las consultas a Supabase: vendedores, ventas entre dos fechas y reglas. No calcula nada. |
| Vista | `src/app/page.js` y `src/app/components/` | El formulario de fechas y la tabla, hechos con componentes de React. No habla con la base de datos. |
| Controlador | `src/controllers/` | Valida las fechas, pide los datos a los modelos y calcula la comisión de cada vendedor. |

El archivo `src/app/api/comisiones/route.js` solo conecta la vista con el controlador. La conexión a Supabase está en `src/lib/supabaseClient.js`.

## Estructura de carpetas

```
comisiones-mvc/
├── capturas/                     Imágenes para este README
├── database/
│   └── schema.sql                Tablas y datos de prueba
├── public/
└── src/
    ├── app/
    │   ├── api/comisiones/
    │   │   └── route.js          Conecta la vista con el controlador
    │   ├── components/
    │   │   └── TablaComisiones.js
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js               Formulario de fechas
    ├── controllers/
    │   └── comisionController.js
    ├── lib/
    │   └── supabaseClient.js
    └── models/
        ├── reglaModel.js
        ├── vendedorModel.js
        └── ventaModel.js
```

## Base de datos

Uso Supabase (PostgreSQL) con tres tablas:

- `vendedor`: id, nombre.
- `ventas`: id, vendedor_id (llave foránea a vendedor), monto, fecha_venta.
- `reglas`: id, monto_minimo, porcentaje.

El script para crearlas y cargar los datos de prueba está en `database/schema.sql`.

## Tecnologías

- Next.js (App Router), que aporta las rutas y el backend en el mismo proyecto
- React, con el que hice la vista (componentes, estado con `useState` y JSX)
- Supabase (PostgreSQL) con `@supabase/supabase-js`
- Netlify para el despliegue


## Datos de prueba

El script carga cuatro vendedores y ocho ventas de octubre de 2026. Para comprobar que todo funciona, el resultado de todo el mes (del 01/10/2026 al 31/10/2026) debe ser:

| Vendedor | Ventas | Total vendido | Comisión |
|---|---|---|---|
| Ana Torres | 2 | $1110 | $54 |
| Luis Mena | 2 | $1800 | $132 |
| Carla Ruiz | 2 | $450 | $0 |
| Pedro Salas | 2 | $1700 | $122 |

## Enlaces del proyecti

- Aplicación desplegada: [https://spectacular-starlight-f5b816.netlify.app/]
- Video explicativo: [PEGA-AQUÍ-EL-ENLACE-DEL-VIDEO]
- GitHub: [https://github.com/Isaiahontaneda/comisiones-mvc.git]

## Autor

Isaiah Ontaneda - Ingeniería de Software, Universidad de las Américas  
