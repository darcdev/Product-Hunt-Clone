export default function validarCrearCuenta(valores) {
  let errores = {};
  // validar nombre de usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  if (!valores.empresa) {
    errores.empresa = "El nombre de empresa es obligatorio";
  }
  // validar url
  if (!valores.url) {
    errores.url = "La url del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "Url mal formateada o no valida";
  }
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripcion al producto";
  }
  return errores;
}
