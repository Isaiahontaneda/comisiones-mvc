// Vista: solo muestra los datos que recibe, no calcula nada
export default function TablaComisiones({ datos }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Vendedor</th>
          <th>Cantidad de ventas</th>
          <th>Total vendido</th>
          <th>Comisión</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((vendedor) => (
          <tr key={vendedor.id}>
            <td>{vendedor.nombre}</td>
            <td>{vendedor.cantidadVentas}</td>
            <td>${vendedor.totalVentas.toFixed(2)}</td>
            <td>${vendedor.comision.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}