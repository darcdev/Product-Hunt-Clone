import React, { useEffect, useState } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        fn(); // Funcion que se ejecuta en el componente
      }

      guardarSubmitForm(false);
    }
  }, []);
  // cuando el usuario escribe algo
  const handleChange = (e) => {
    guardarValores({
      [e.target.name]: e.target.value,
    });
  };
  // cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  return { valores, errores, submitForm, handleChange, handleSubmit };
};

export default useValidacion;
