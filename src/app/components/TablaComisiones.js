export default function TablaComisiones({ datos }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Vendedor</th>
          <th>Ventas</th>
          <th>Total vendido</th>
          <th>Comision</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((vendedor) => (
          <tr key={vendedor.id}>
            <td>{vendedor.nombre}</td>
            <td>{vendedor.cantidadVentas}</td>
            <td>${vendedor.totalVentas}</td>
            <td>${vendedor.comision}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}