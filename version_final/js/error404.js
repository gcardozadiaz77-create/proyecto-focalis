/* ==========================================================
   FOCALIS · error404.js  ·  Página que no existe
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  F.Error404 = {
    montar() {
      const e = F.sitio.marca.error404;
      const terminal = h('div', { class: 'error404__term', 'aria-hidden': 'true' });
      const lineas = ['> buscando la página…', '> error: página no encontrada', '> buscando tu atención…'];
      const escribir = (t) => terminal.append(h('p', {}, t));
      if (F.reducirMovimiento()) lineas.forEach(escribir);
      else lineas.forEach((t, i) => setTimeout(() => escribir(t), 300 + i * 700));

      document.title = `${e.titulo} · FOCALIS`;
      document.getElementById('contenido').replaceChildren(
        h('section', { class: 'error404' },
          h('div', { class: 'contenedor' },
            terminal,
            h('h1', {}, e.titulo),
            h('p', { class: 'lema' }, e.lema),
            h('p', { style: { maxWidth: '52ch', marginBottom: '24px', color: 'rgba(234,247,238,.82)' } },
              'Esta página no está en el recorrido. Vuelve al inicio y sigue la ruta.'),
            h('a', { class: 'btn btn--luz btn--grande', href: 'inicio.html' }, icono('casa'), 'Volver al inicio'))));
    }
  };
})(window.Focalis);
