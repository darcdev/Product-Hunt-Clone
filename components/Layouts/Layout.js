import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <h1>Header</h1>
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/nosotros">Nosotros</Link>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
