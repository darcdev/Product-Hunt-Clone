import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import Router, { useRouter } from "next/router";
import useProductos from "../hooks/useProductos";
import DetallesProducto from "../components/Layouts/DetallesProducto";

const Buscar = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  const { productos } = useProductos("creado");
  const [resultado, guardarResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      );
    });

    guardarResultado(filtro);
  }, [q, productos]);
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {resultado.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Buscar;
