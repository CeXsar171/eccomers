import "../../styles/admin/RecentProducts.css";

function RecentProducts({ productos }) {

  if (productos.length === 0) {

    return (
      <div className="recent-products">

        <h2>Últimos Productos</h2>

        <p>No existen productos registrados.</p>

      </div>
    );

  }

  return (

    <div className="recent-products">

      <h2>Últimos Productos</h2>

      <table>

        <thead>

          <tr>

            <th>Nombre</th>

            <th>Precio</th>

            <th>Categoría</th>

          </tr>

        </thead>

        <tbody>

          {productos.map((producto) => (

            <tr key={producto.id}>

              <td>{producto.name}</td>

              <td>${producto.price}</td>

              <td>{producto.category}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default RecentProducts;