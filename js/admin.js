import { Serie } from "./classSerie.js";
import {validarCodigo, validarTitulo, validarDescripcion, validarUrl,validarGenero} from "./helpers.js";

let listaSeries = []; //aqui voy a guardar todas las peliculas

//traer los input
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let imagen = document.querySelector("#imagen");
let genero = document.querySelector("#genero");
let formSerie = document.querySelector("#formPelicula");
let btnCrearSerie = document.querySelector("#btnCrearSerie");

// crear una instancia de la ventana modal
const modalAdminSerie = new bootstrap.Modal(
  document.querySelector("#modalSerie")
);

//agregar el evento
btnCrearSerie.addEventListener("click", crearSerie);
formSerie.addEventListener("submit", guardarSerie);

codigo.addEventListener("blur", ()=> { validarCodigo(codigo)});
titulo.addEventListener("blur", ()=> { validarTitulo(titulo)});
descripcion.addEventListener("blur", ()=> { validarDescripcion(descripcion)});
imagen.addEventListener("blur", ()=> { validarUrl(imagen)});
genero.addEventListener("blur", ()=> { validarGenero(genero)});

function crearSerie() {
  //mostrar ventana modal
  modalAdminSerie.show();
  //generar el identificador unico y asignarlo al campo del codigo
  codigo.value = uuidv4();
  // console.log( uuidv4()); esta libreria genera identificadores unicos
}

function guardarSerie(e) {
  e.preventDefault();
  //volver a validar todos los campos
  if(validarCodigo(codigo) && validarTitulo(titulo) && validarDescripcion(descripcion) && validarUrl(imagen) && validarGenero(genero)){
    //cuando los datos fueron validos
    console.log("tengo que crear la persona");
  }
  //si los datos son correctos
  let nuevaSerie = new Serie(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  console.log(nuevaSerie);
  listaSeries.push(nuevaSerie);
  //limpiar formulario
  limpiarFormulario();
  console.log(listaSeries);
  //cerrar la ventana modal
  modalAdminSerie.hide();
}

function limpiarFormulario() {
  formSerie.reset();
  // modificar las clases de bootstrap si es necesario
}
