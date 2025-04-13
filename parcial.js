// Examen Parcial II - Programación I
// Sistema de Librería en Consola

const readlineSync = require('readline-sync');
const colors = require('colors');
const fs = require('fs');

let catalogo = [
  {
    titulo: 'Harry Potter y la Piedra Filosofal',
    autor: 'J.K. Rowling',
    precio: 150,
    anio: 1997
  }
];

function guardarCatalogo() {
  fs.writeFileSync('catalogo.json', JSON.stringify(catalogo, null, 2));
}

function agregarLibro() {
  const titulo = readlineSync.question('Ingrese el titulo del libro: '.cyan);
  const autor = readlineSync.question('Ingrese el autor: '.cyan);
  let precio = parseFloat(readlineSync.question('Ingrese el precio: '.cyan));
  while (isNaN(precio) || precio <= 0) {
    precio = parseFloat(readlineSync.question('Precio invalido. Ingrese un precio valido: '.red));
  }
  let anio = parseInt(readlineSync.question('Ingrese el anio de publicacion: '.cyan));
  while (isNaN(anio)) {
    anio = parseInt(readlineSync.question('Año invalido. Ingrese un año valido: '.red));
  }

  catalogo.push({ titulo, autor, precio, anio });
  console.log('Libro agregado correctamente!'.green);
  guardarCatalogo();
}

function mostrarCatalogo() {
  console.log('\nCATALOGO DE LIBROS'.yellow.bold);
  catalogo.forEach((libro, index) => {
    console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} - $${libro.precio} - ${libro.anio}`);
  });
}

function buscarLibro() {
  const titulo = readlineSync.question('Ingrese el titulo a buscar: '.cyan);
  const libro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (libro) {
    console.log('Libro encontrado:'.green, libro);
  } else {
    console.log('Libro no encontrado.'.red);
  }
}

function eliminarLibro() {
  const titulo = readlineSync.question('Ingrese el titulo del libro a eliminar: '.cyan);
  const index = catalogo.findIndex(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (index !== -1) {
    catalogo.splice(index, 1);
    console.log('Libro eliminado correctamente!'.green);
    guardarCatalogo();
  } else {
    console.log('Libro no encontrado.'.red);
  }
}

function verEstadisticas() {
  console.log('\nESTADISTICAS'.yellow.bold);
  console.log('Cantidad total de libros:'.cyan, catalogo.length);
  if (catalogo.length > 0) {
    const precioPromedio = catalogo.reduce((sum, libro) => sum + libro.precio, 0) / catalogo.length;
    const libroMasAntiguo = catalogo.reduce((a, b) => a.anio < b.anio ? a : b);
    const libroMasCaro = catalogo.reduce((a, b) => a.precio > b.precio ? a : b);
    console.log('Precio promedio:'.cyan, precioPromedio.toFixed(2));
    console.log('Libro mas antiguo:'.cyan, `${libroMasAntiguo.titulo} (${libroMasAntiguo.anio})`);
    console.log('Libro mas caro:'.cyan, `${libroMasCaro.titulo} ($${libroMasCaro.precio})`);
  }
}

function ordenarLibros() {
  console.log('\n1. Precio Ascendente\n2. Precio Descendente\n3. Anio de Publicacion');
  const opcion = readlineSync.question('Elija una opcion: '.cyan);
  if (opcion === '1') {
    catalogo.sort((a, b) => a.precio - b.precio);
  } else if (opcion === '2') {
    catalogo.sort((a, b) => b.precio - a.precio);
  } else if (opcion === '3') {
    catalogo.sort((a, b) => a.anio - b.anio);
  } else {
    console.log('Opcion invalida.'.red);
  }
  console.log('Catalogo ordenado correctamente!'.green);
}

function editarLibro() {
  const titulo = readlineSync.question('Ingrese el titulo del libro a editar: '.cyan);
  const libro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (libro) {
    libro.titulo = readlineSync.question(`Nuevo titulo (${libro.titulo}): `.cyan) || libro.titulo;
    libro.autor = readlineSync.question(`Nuevo autor (${libro.autor}): `.cyan) || libro.autor;
    let nuevoPrecio = readlineSync.question(`Nuevo precio (${libro.precio}): `.cyan);
    if (nuevoPrecio) libro.precio = parseFloat(nuevoPrecio);
    let nuevoAnio = readlineSync.question(`Nuevo anio (${libro.anio}): `.cyan);
    if (nuevoAnio) libro.anio = parseInt(nuevoAnio);
    console.log('Libro editado correctamente!'.green);
    guardarCatalogo();
  } else {
    console.log('Libro no encontrado.'.red);
  }
}

function filtrarPorAutor() {
  const autor = readlineSync.question('Ingrese el autor para filtrar: '.cyan);
  const libros = catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
  if (libros.length > 0) {
    console.log('Libros encontrados:'.green);
    libros.forEach((libro, index) => {
      console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} - $${libro.precio} - ${libro.anio}`);
    });
  } else {
    console.log('No se encontraron libros de ese autor.'.red);
  }
}

function menu() {
  let opcion;
  do {
    console.log('\n========= MENU ========='.magenta.bold);
    console.log('1. Agregar libro');
    console.log('2. Mostrar catalogo');
    console.log('3. Buscar libro por titulo');
    console.log('4. Eliminar libro');
    console.log('5. Ver estadisticas');
    console.log('6. Ordenar libros');
    console.log('7. Editar libro');
    console.log('8. Filtrar libros por autor');
    console.log('9. Salir');
    opcion = readlineSync.question('Seleccione una opcion: '.cyan);

    switch (opcion) {
      case '1': agregarLibro(); break;
      case '2': mostrarCatalogo(); break;
      case '3': buscarLibro(); break;
      case '4': eliminarLibro(); break;
      case '5': verEstadisticas(); break;
      case '6': ordenarLibros(); break;
      case '7': editarLibro(); break;
      case '8': filtrarPorAutor(); break;
      case '9': console.log('Saliendo del sistema...'.yellow); break;
      default: console.log('Opcion invalida.'.red);
    }
  } while (opcion !== '9');
}

menu();
