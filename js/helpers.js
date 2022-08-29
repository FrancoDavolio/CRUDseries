export function validarCodigo(input) {
  // let patron = /^[0-9]{1,3}$/;
  if (input.value == input.value) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarTitulo(input) {
  if (input.value.length >= 3 && input.value.length <= 80) {
    console.log("dato correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato incorrecto");
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarDescripcion(input) {
  if (input.value.length >= 3 && input.value.length <= 600) {
    console.log("dato correcto");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("dato incorrecto");
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarUrl(input) {
  let patron =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarGenero(input) {
  if (input.value == input.value) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}
