import React from "react";
import DetallesProducto from "../components/Layouts/DetallesProducto";
import Layout from "../components/Layouts/Layout";
import useProductos from "../hooks/useProductos";

const Populares = () => {
  const { productos } = useProductos("votos");
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {productos.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Populares;
