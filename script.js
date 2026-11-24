(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Año del footer */
  var y = $('#anio'); if (y) y.textContent = new Date().getFullYear();

  /* Menú móvil */
  var burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('abierto');
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? '✕' : '☰';
  });
  $$('a', menu).forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('abierto');
      burger.setAttribute('aria-expanded', 'false');
      burger.textContent = '☰';
    });
  });

  /* Pestañas Misión / Visión */
  var tabs = $$('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (o) {
        var on = o === t;
        o.setAttribute('aria-selected', on);
        o.tabIndex = on ? 0 : -1;
        var p = document.getElementById(o.getAttribute('aria-controls'));
        p.hidden = !on;
        p.classList.toggle('on', on);
      });
    });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        var i = tabs.indexOf(t), n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        n.focus(); n.click();
      }
    });
  });

  /* Galería: filtros */
  var cards = $$('.tarjeta'), filtros = $$('.filtro');
  filtros.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.f;
      filtros.forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      cards.forEach(function (c) { c.hidden = !(f === 'todos' || c.dataset.cat === f); });
    });
  });

  /* Lightbox */
  var lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), idx = 0, lista = [], opener = null;
  function visibles() { return cards.filter(function (c) { return !c.hidden; }); }
  function mostrar(i) {
    idx = (i + lista.length) % lista.length;
    var c = lista[idx];
    lbImg.src = c.dataset.src;
    lbImg.alt = c.dataset.cap;
    lbCap.textContent = c.dataset.cap + '  (' + (idx + 1) + '/' + lista.length + ')';
  }
  function abrir(c) {
    lista = visibles(); opener = c;
    mostrar(lista.indexOf(c));
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
    $('#lb-x').focus();
  }
  function cerrar() {
    lb.classList.remove('on');
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }
  cards.forEach(function (c) { c.addEventListener('click', function () { abrir(c); }); });
  $('#lb-x').addEventListener('click', cerrar);
  $('#lb-p').addEventListener('click', function () { mostrar(idx - 1); });
  $('#lb-n').addEventListener('click', function () { mostrar(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) cerrar(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') cerrar();
    if (e.key === 'ArrowLeft') mostrar(idx - 1);
    if (e.key === 'ArrowRight') mostrar(idx + 1);
  });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var d = e.changedTouches[0].clientX - tx;
    if (Math.abs(d) > 50) mostrar(idx + (d < 0 ? 1 : -1));
    tx = null;
  });

  /* Devocional */
  var textos = {
    esperanza: ['Esperanza', 'Cada día es una nueva oportunidad para sembrar algo bueno. Aun en medio de la dificultad, la esperanza se hace real cuando alguien decide acompañar a otro.'],
    servicio: ['Servicio al Prójimo', 'Servir no es dar lo que nos sobra, es darnos a nosotros mismos. Un gesto sencillo, una comida compartida o una palabra a tiempo pueden cambiar el día de una familia.'],
    comunidad: ['Comunidad y Fe', 'Nadie camina solo. La fe se fortalece en comunidad, cuando nos escuchamos, nos cuidamos y respetamos la dignidad y la libertad de cada persona.'],
    fortaleza: ['Fortaleza', 'La fortaleza no es no caer: es levantarse con otros. Cuando buscamos Su Presencia, encontramos calma para seguir y valentía para servir.']
  };
  var temas = $$('.tema');
  temas.forEach(function (b) {
    b.addEventListener('click', function () {
      temas.forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      var t = textos[b.dataset.t];
      $('#r-t').textContent = t[0];
      $('#r-p').textContent = t[1];
    });
  });

  /* Formulario → WhatsApp */
  $('#form-wa').addEventListener('submit', function (e) {
    e.preventDefault();
    var nombre = $('#f-nombre').value.trim();
    if (!nombre) { $('#f-nombre').focus(); $('#f-nombre').style.borderColor = '#E85D2A'; return; }
    var tipo = $('#f-tipo').value, msg = $('#f-msg').value.trim();
    var texto = 'Hola, soy ' + nombre + '. Me comunico con la Fundación Buscando Su Presencia (BSP) para: ' + tipo + '.' + (msg ? '\n\n' + msg : '');
    window.open('https://wa.me/573238085179?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  });

  /* Animación al entrar */
  var revs = $$('.rev');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('vis'); io.unobserve(en.target); } });
    }, { threshold: .12 });
    revs.forEach(function (r) { io.observe(r); });
  } else { revs.forEach(function (r) { r.classList.add('vis'); }); }
})();
