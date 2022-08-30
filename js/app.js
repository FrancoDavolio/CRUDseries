// verrificar el localStorage
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];
let padre = document.querySelector("#grillaSeries");

if (listaSeries.length > 0) {
  listaSeries.map((serie) => {
    crearColumna(serie);
  });
} else {
  padre.innerHTML = '<h1 class="text-center">No hay peliculas cargadas</h1>';
}

function crearColumna(serie) {
  console.log(serie);
  padre.innerHTML += `
        <aside class="col-12 col-md-4 col-lg-3 my-3">
         <div class="card">
           <img src="${serie.imagen}" class="card-img-top w-100"  alt="img">
           <div class="card-body">
             <h5 class="card-title">${serie.titulo}<br><span class="badge text-bg-danger rounded-pill mx-2">Nuevo</span></h5>
             <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalMedialuna">Ver mas</button>
           </div>
         </div>
       </aside>`;
}
