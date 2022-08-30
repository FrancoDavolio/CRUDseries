import { Serie } from "./classSerie.js";
import {
  validarCodigo,
  validarTitulo,
  validarDescripcion,
  validarUrl,
  validarGenero,
} from "./helpers.js";

let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || []; //aqui voy a guardar todas las peliculas

//traer los input
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let imagen = document.querySelector("#imagen");
let genero = document.querySelector("#genero");
let formSerie = document.querySelector("#formSerie");
let btnCrearSerie = document.querySelector("#btnCrearSerie");
// crear una instancia de la ventana modal
const modalAdminSerie = new bootstrap.Modal(
  document.querySelector("#modalSerie")
);
let serieNueva = true;

//agregar el evento
btnCrearSerie.addEventListener("click", crearSerie);
formSerie.addEventListener("submit", guardarSerie);

function cargarInicial() {
  if (listaSeries.length > 0) {
    //dibujar las filas de la tabla
    listaSeries.forEach((itemSerie) => {
      crearFila(itemSerie);
    });
  }
}
cargarInicial();

function crearFila(serie) {
  //esta funcion dibuja un tr
  let tablaSerie = document.querySelector("#tablaSeries");
  //creamos el tr con document.createElement o innerHTML del tbody
  tablaSerie.innerHTML += `<tr>
  <th scope="row">${serie.codigo}</th> 
  <td>${serie.titulo}</td>
  <td>${serie.descripcion}</td>
  <td>${serie.imagen}</td>
  <td>${serie.genero}</td>
  <td>
    <button class="btn btn-warning" >
      <i class="bi bi-pencil-square" onclick='editarSerie("${serie.codigo}")'></i>
    </button>
    <button class="btn btn-danger" onclick='borrarSerie("${serie.codigo}")'>
      <i class="bi bi-x-square"></i>
    </button>
  </td>
</tr>`;
}

function crearSerie() {
  serieNueva = true;
  //mostrar ventana modal
  modalAdminSerie.show();
  //generar el identificador unico y asignarlo al campo del codigo
  codigo.value = uuidv4();
  // console.log( uuidv4()); esta libreria genera identificadores unicos
}

codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
titulo.addEventListener("blur", () => {
  validarTitulo(titulo);
});
descripcion.addEventListener("blur", () => {
  validarDescripcion(descripcion);
});
imagen.addEventListener("blur", () => {
  validarUrl(imagen);
});
genero.addEventListener("blur", () => {
  validarGenero(genero);
});

function guardarSerie(e) {
  e.preventDefault();
  //volver a validar todos los campos
  if (
    validarCodigo(codigo) === true &&
    validarTitulo(titulo) === true &&
    validarDescripcion(descripcion) === true &&
    validarUrl(imagen) === true &&
    validarGenero(genero) === true
  ) {
    if (serieNueva) {
      //cuando los datos fueron validos
      console.log("tengo que crear la persona");
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
      //guardar el arreglo en localstorage
      guardarSerieEnLocalStorage();
      //limpiar formulario
      limpiarFormulario();
      console.log(listaSeries);
      //dibujar la fila en la tabla
      crearFila(nuevaSerie);
      //cerrar la ventana modal
      modalAdminSerie.hide();
    } else {
      actualizarSerie();
    }
  } else {
    alert("Debe completar todos los datos");
  }
}

function limpiarFormulario() {
  formSerie.reset();
  // modificar las clases de bootstrap si es necesario
}

function guardarSerieEnLocalStorage() {
  localStorage.setItem("listaSeriesKey", JSON.stringify(listaSeries));
}

window.editarSerie = function (codigoBuscado) {
  serieNueva = false;
  console.log(codigoBuscado);
  let serieBuscada = listaSeries.find(
    (serie) => serie.codigo === codigoBuscado
  );
  modalAdminSerie.show();
  codigo.value = serieBuscada.codigo;
  titulo.value = serieBuscada.titulo;
  descripcion.value = serieBuscada.descripcion;
  imagen.value = serieBuscada.imagen;
  genero.value = serieBuscada.genero;
};

function actualizarSerie() {
  console.log("Actualizando...");
  let posicionSerie = listaSeries.findIndex(
    (serie) => codigo.value === serie.codigo
  );
  listaSeries[posicionSerie].titulo = titulo.value;
  listaSeries[posicionSerie].descripcion = descripcion.value;
  listaSeries[posicionSerie].imagen = imagen.value;
  listaSeries[posicionSerie].genero = genero.value;

  guardarSerieEnLocalStorage();
  borrarTabla();

  cargarInicial();
  Swal.fire(
    'Buen Trabajo',
    'Los datos de la pelicula fueron actualizados',
    'success'
  )
  modalAdminSerie.hide();

  limpiarFormulario();
}

window.borrarSerie = function (codigo) {
  //mostrar un a pregunta antess de borrar serie
  Swal.fire({
    title: "Estas seguro de borrar la serie?",
    text: "Este proceso no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(codigo);
      //buscar la serie en el arreglo y borrarla
      let copiaListaSerie = listaSeries.filter(
        (itemSerie) => itemSerie.codigo != codigo
      );
      listaSeries = copiaListaSerie;
      //actualizar el localstorage
      guardarSerieEnLocalStorage();
      //actualizar la tabla
      borrarTabla();
      cargarInicial();
      Swal.fire("Serie Eliminada!", "La serie fue eliminada.", "success");
    }
  });
};

function borrarTabla() {
  let tablaSerie = document.querySelector("#tablaSeries");
  tablaSerie.innerHTML = " ";
}
