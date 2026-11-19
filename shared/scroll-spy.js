// Órale – Authentic Mexican Flavor Limited
// Resalta en el sidebar la sección/subsección visible mientras se hace scroll,
// y mantiene esa entrada a la vista dentro del propio panel de navegación.
//
// Cada enlace de subsección del sidebar apunta a su propia ancla real dentro
// del contenido (<h2>/<h3> con id, p.ej. #sec-0-1, #pcc4, #haccp-10). Si
// algún href coincidiera con el de una sección principal o se repitiera, se
// ignora como ancla propia y solo se resalta el enlace principal.
//
// Sección activa: la última .seccion que ocupa la banda de detección
// (10%–20% desde arriba del viewport).
// Subsección activa: dentro de la sección activa, el ÚLTIMO encabezado cuyo
// borde superior ya pasó la banda (top <= 20% del viewport), aunque ya no
// esté dentro de ella. Así la subsección sigue resaltada mientras se lee su
// cuerpo, no solo mientras el encabezado cruza la banda.
//
// #indice es una .seccion sin entrada en el sidebar: cuando está activa no
// se resalta ningún enlace (no hay main link con ese href ni subsecciones
// observadas dentro de ella).
(function () {
  var sidebar = document.querySelector('.sidebar');
  var secciones = document.querySelectorAll('.contenido .seccion');
  if (!sidebar || !secciones.length) return;

  var mainLinks = sidebar.querySelectorAll('.nav-link:not(.subseccion)');
  var subLinks = sidebar.querySelectorAll('.nav-link.subseccion');

  /* Límite inferior de la banda de detección, como fracción del alto del
     viewport. Debe coincidir con rootMargin del observer (-80% abajo). */
  var BANDA_INFERIOR = 0.2;

  var mainHrefs = {};
  mainLinks.forEach(function (link) {
    mainHrefs[link.getAttribute('href')] = true;
  });

  var subAnchors = [];
  var hrefsVistos = {};
  subLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (mainHrefs[href] || hrefsVistos[href]) return; // compartido con el padre o duplicado
    hrefsVistos[href] = true;
    var el = document.querySelector(href);
    if (el) subAnchors.push(el);
  });
  // Orden del documento, para que "el último que pasó la banda" sea correcto
  // aunque el sidebar listara las entradas en otro orden.
  subAnchors.sort(function (a, b) {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  var seccionesArr = Array.prototype.slice.call(secciones);
  var visibleSecciones = {};
  var ultimoActivoId = null;

  function actualizar() {
    var seccionActiva = null;
    seccionesArr.forEach(function (s) {
      if (visibleSecciones[s.id]) seccionActiva = s;
    });
    if (!seccionActiva) return;

    var limite = window.innerHeight * BANDA_INFERIOR;
    var subActiva = null;
    subAnchors.forEach(function (el) {
      if (el.closest('.seccion') !== seccionActiva) return;
      if (el.getBoundingClientRect().top <= limite) subActiva = el;
    });

    mainLinks.forEach(function (link) {
      link.classList.toggle('activo', link.getAttribute('href') === '#' + seccionActiva.id);
    });
    subLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('activo', !!subActiva && href === '#' + subActiva.id);
    });

    var idActivo = (subActiva || seccionActiva).id;
    if (idActivo === ultimoActivoId) return;
    ultimoActivoId = idActivo;

    /* scrollIntoView con block:'nearest' solo mueve el contenedor scrolleable
       más cercano (el propio .sidebar, que es position:fixed con overflow-y
       propio) y solo si el enlace no es ya visible — no arrastra el scroll
       de la página, y no salta si la entrada ya está a la vista. */
    var activo = sidebar.querySelector('.nav-link.activo');
    if (activo) activo.scrollIntoView({ block: 'nearest' });
  }

  /* Las secciones se registran en visibleSecciones; los encabezados de
     subsección solo sirven de disparador: cada vez que uno entra o sale de
     la banda, actualizar() recalcula con getBoundingClientRect cuál es el
     último que ya la pasó. No hace falta escuchar el evento scroll. */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.target.classList.contains('seccion')) {
        visibleSecciones[entry.target.id] = entry.isIntersecting;
      }
    });
    actualizar();
  }, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });
  /* Banda de detección fina (10%-20% desde arriba del viewport) en vez de
     un threshold alto: en móvil las secciones suelen ser más altas que el
     viewport, así que exigir gran superficie visible dejaría la sección
     activa desactualizada durante buena parte del scroll. */

  seccionesArr.forEach(function (s) { observer.observe(s); });
  subAnchors.forEach(function (s) { observer.observe(s); });

  /* Al final del documento la última sección puede no ocupar la banda de
     detección (es corta, o el resto de la página es el footer). Un
     observer aparte sobre el footer fuerza la última sección como activa
     sin recurrir a eventos de scroll. */
  var footer = document.querySelector('.pie-documento');
  if (footer) {
    var footerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var ultima = seccionesArr[seccionesArr.length - 1];
        visibleSecciones = {};
        visibleSecciones[ultima.id] = true;
        actualizar();
      });
    }, { threshold: 0 });
    footerObserver.observe(footer);
  }
})();
