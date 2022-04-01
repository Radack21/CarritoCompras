// Variables

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //Resetear arreglo
    carritoHTML();
  });
}

//Fuciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Eliminar un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Eliminar del arreglo articulosCarrito
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}

//Leer el contenido del HTML
function leerDatosCurso(curso) {
  //Objeto con el contenido del curso

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //Retorna el objeto actualizado
      } else {
        return curso; //Retorna los no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agregar elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
  console.log(articulosCarrito);
}

//Muestra el carrrito de compras en el HTML

function carritoHTML() {
  //Limpiar el HTML
  limpiarHTMl();
  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td> 
                <img src="${imagen}" width="100" >
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTMl() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
