// Órale – Authentic Mexican Flavor Limited
// Resalta en el sidebar la sección/subsección visible mientras se hace scroll,
// y mantiene esa entrada a la vista dentro del propio panel de navegación.
//
// Varios enlaces de subsección comparten href con su sección padre (p.ej. las
// 8 entradas de la sección 0 apuntan todas a #seccion-0): esos NO se tratan
// como anclas propias, solo se resalta el enlace principal. Únicamente las
// subsecciones con href único (apuntando a un <h2 id="..."> real dentro del
// contenido, como #sec-4-2 o #pcc4) se observan y resaltan por separado.
(function () {
  var sidebar = document.querySelector('.sidebar');
  var secciones = document.querySelectorAll('.contenido .seccion');
  if (!sidebar || !secciones.length) return;

  var mainLinks = sidebar.querySelectorAll('.nav-link:not(.subseccion)');
  var subLinks = sidebar.querySelectorAll('.nav-link.subseccion');

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

  var seccionesArr = Array.prototype.slice.call(secciones);
  var visibleSecciones = {};
  var visibleSub = {};
  var ultimoActivoId = null;

  function actualizar() {
    var seccionActiva = null;
    seccionesArr.forEach(function (s) {
      if (visibleSecciones[s.id]) seccionActiva = s;
    });
    if (!seccionActiva) return;

    var subActiva = null;
    subAnchors.forEach(function (el) {
      if (visibleSub[el.id] && el.closest('.seccion') === seccionActiva) subActiva = el;
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

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var map = entry.target.classList.contains('seccion') ? visibleSecciones : visibleSub;
      map[entry.target.id] = entry.isIntersecting;
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
