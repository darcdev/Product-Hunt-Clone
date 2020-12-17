export default function validarCrearCuenta(valores) {
  let errores = {};
  // validar nombre de usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  // validar email usuario
  if (!valores.email) {
    errores.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no valido";
  }
  // validar password usuario
  if (!valores.password) {
    errores.password = "EL password es obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "El password debe ser de al menos 6 caracteres";
  }
  return errores;
}
