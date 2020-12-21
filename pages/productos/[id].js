import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { FirebaseContext } from "../../firebase";
import Layout from "../../components/Layouts/Layout";
import Error404 from "../../components/Layouts/404";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Producto = () => {
  const [producto, guardarProducto] = useState({});
  const [error, guardarError] = useState(false);

  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();

        if (producto.exists) {
          guardarProducto(producto.data());
          guardarError(false);
        } else {
          guardarError(true);
        }
      };
      obtenerProducto();
    }
  }, [id, producto]);

  if (Object.keys(producto).length === 0) return <h1>Cargando...</h1>;

  const {
    comentarios,
    creado,
    creador,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    haVotado,
    votos,
  } = producto;

  const votarProducto = async () => {
    if (!usuario) {
      return router.push("/login");
    }
    // obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1;

    // verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    // guardar el ID del usuario que ha votado

    const hanVotado = [...haVotado, usuario.uid];

    // Actualizar base de datos
    await firebase.db
      .collection("productos")
      .doc(id)
      .update({ votos: nuevoTotal, haVotado: hanVotado });
    // actualizar state
    guardarProducto({
      ...producto,
      votos: nuevoTotal,
    });
  };

  return (
    <Layout>
      <>
        {error && <Error404 mensaje="No hay productos existentes" />}

        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {nombre}
          </h1>
          <ContenedorProducto>
            <div>
              <p>
                Publicado hace:
                {formatDistanceToNow(new Date(creado), { locale: es })}
                <p>
                  Por {creador.nombre} de {empresa}{" "}
                </p>
              </p>
              <img src={urlimagen} alt={nombre} />

              <p>{descripcion}</p>

              {usuario && (
                <>
                  <h2>Agrega tu comentario</h2>

                  <form>
                    <Campo>
                      <input type="text" name="mensaje" />
                    </Campo>

                    <InputSubmit type="submit" value="Agregar Comentario" />
                  </form>
                </>
              )}
              <h2
                css={css`
                  margin-top: 5rem;
                `}
              >
                Comentarios
              </h2>

              {comentarios.map((comentario) => (
                <li>
                  <p>{comentario.nombre}</p>
                  <p>Escrito por : {comentario.usuarioNombre}</p>
                </li>
              ))}
            </div>
            <aside>
              <Boton target="_blank" bgColor="true" href={url}>
                Visitar Url
              </Boton>

              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                <p css={css`text-align : center}`}>{votos} votos</p>
                {usuario && <Boton onClick={votarProducto}>Votar</Boton>}
              </div>
            </aside>
          </ContenedorProducto>
        </div>
      </>
    </Layout>
  );
};

export default Producto;
