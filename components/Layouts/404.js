import React from "react";
import { css } from "@emotion/react";
const Error404 = ({ mensaje }) => {
  return (
    <h1
      css={css`
        margin-top: 4rem;
        text-align: center;
      `}
    >
      {mensaje}
    </h1>
  );
};

export default Error404;
