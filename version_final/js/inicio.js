/* ==========================================================
   FOCALIS · inicio.js  ·  Página de inicio
   Hero con linterna que sigue al puntero, la ruta de 6 páginas,
   el video de presentación y el brief del proyecto.
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  /* La luz sigue al puntero con un pequeño retraso (decorativo, así que puede
     tener "peso"). Sin puntero, o en pantalla táctil, deriva sola y despacio.
     Con movimiento reducido: no hay deriva, solo sigue al puntero. */
  function linterna(hero, luz, titulo) {
    const reducido = F.reducirMovimiento();
    const rect = () => hero.getBoundingClientRect();
    let objetivo = null;       // coordenadas de ventana
    let actual = null;
    let ultimoPuntero = -1e9;
    let raf = 0;
    let visible = true;

    function poner(cx, cy) {
      const r = rect();
      luz.style.setProperty('--x', (cx - r.left) + 'px');
      luz.style.setProperty('--y', (cy - r.top) + 'px');
      const t = titulo.getBoundingClientRect();
      titulo.style.setProperty('--tx', (cx - t.left) + 'px');
      titulo.style.setProperty('--ty', (cy - t.top) + 'px');
    }

    const r0 = rect();
    const inicio = { x: r0.left + r0.width * 0.62, y: r0.top + r0.height * 0.4 };
    actual = { ...inicio };
    objetivo = { ...inicio };
    poner(actual.x, actual.y);

    hero.addEventListener('pointermove', (e) => {
      ultimoPuntero = performance.now();
      objetivo = { x: e.clientX, y: e.clientY };
      if (reducido) { actual = { ...objetivo }; poner(actual.x, actual.y); }
    });

    if (reducido) return;

    function paso(t) {
      if (!visible) return;
      const r = rect();
      if (t - ultimoPuntero > 2500) {                       // deriva suave
        objetivo = {
          x: r.left + r.width * (0.5 + 0.3 * Math.sin(t * 0.00035)),
          y: r.top + r.height * (0.42 + 0.2 * Math.sin(t * 0.0006 + 1))
        };
      }
      actual.x += (objetivo.x - actual.x) * 0.1;
      actual.y += (objetivo.y - actual.y) * 0.1;
      poner(actual.x, actual.y);
      raf = requestAnimationFrame(paso);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        visible = en.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(paso);
      }).observe(hero);
    } else raf = requestAnimationFrame(paso);
  }

  function seccionCab(kicker, titulo, idTitulo, intro) {
    return h('header', { class: 'seccion__cab' },
      h('p', { class: 'seccion__kicker' }, kicker),
      h('h2', { class: 'seccion__titulo', id: idTitulo }, titulo),
      intro ? h('p', { class: 'seccion__intro' }, intro) : null);
  }

  F.Inicio = {
    async montar() {
      const s = F.sitio;
      const primera = s.paginas[0];
      document.title = `${s.marca.nombre} · ${s.marca.lema[0].toUpperCase()}${s.marca.lema.slice(1)}`;

      /* --- Hero --- */
      const hero = document.getElementById('hero');
      const luz = h('div', { class: 'hero__luz', 'aria-hidden': 'true' });
      const titulo = h('h1', { class: 'hero__titulo', id: 'hero-titulo' },
        s.marca.nombre, h('span', { class: 'hero__titulo-luz', 'aria-hidden': 'true' }, s.marca.nombre));
      hero.replaceChildren(luz,
        h('div', { class: 'contenedor hero__in' },
          h('p', { class: 'hero__kicker' }, `${s.equipo.institucion} · ${s.equipo.curso}`),
          titulo,
          h('p', { class: 'hero__lema' }, s.marca.lema[0].toUpperCase() + s.marca.lema.slice(1)),
          h('p', { class: 'hero__mensaje' }, s.marca.mensaje),
          h('div', { class: 'hero__acciones' },
            h('a', { class: 'btn btn--luz btn--grande', href: primera.archivo }, 'Empezar el recorrido', icono('flecha-der')),
            h('a', { class: 'btn btn--fantasma btn--grande', href: '#ruta' }, 'Ver la ruta')),
          h('p', { class: 'hero__meta' }, `${s.paginas.length} páginas · ${s.producto.duracionTotal || 'recorrido corto'} · grados 8.º a 11.º`)));
      linterna(hero, luz, titulo);

      /* --- Ruta --- */
      const minutos = (seg) => Math.max(1, Math.round(seg / 60));
      document.getElementById('ruta').replaceChildren(
        h('div', { class: 'contenedor' },
          seccionCab('La ruta', 'Seis páginas, una idea', 'ruta-titulo',
            'Puedes recorrerlas en orden o saltar a la que más te interese. Cada una dura un par de minutos.'),
          h('ol', { class: 'ruta' }, s.paginas.map((p) => {
            const hecha = F.progreso.completa(p.n);
            return h('li', {},
              h('a', { class: 'ruta-tarjeta' + (hecha ? ' is-hecha' : ''), href: p.archivo },
                h('span', { class: 'ruta-tarjeta__cab' },
                  h('span', { class: 'ruta-tarjeta__n' }, String(p.n)),
                  h('span', { class: 'ruta-tarjeta__icono' }, icono(p.icono))),
                h('h3', { class: 'ruta-tarjeta__titulo' }, p.titulo),
                h('p', { class: 'ruta-tarjeta__idea' }, p.idea),
                h('span', { class: 'ruta-tarjeta__pie' },
                  h('span', { class: 'etiqueta' }, `≈ ${minutos(p.segundos)} min`),
                  h('span', { class: 'ruta-tarjeta__ir' }, icono('flecha-der')))));
          }))));

      /* --- Video de presentación --- */
      const vp = s.videoPresentacion;
      const repro = F.Reproductor.crear({
        rotulo: 'Plano',
        archivo: vp.archivo || null,
        escenas: vp.escenas.map((e) => ({ id: e.id, seg: e.seg, visual: e.visual, descripcion: e.plano, voz: e.voz }))
      });
      document.getElementById('presentacion').replaceChildren(
        h('div', { class: 'contenedor' },
          seccionCab('Video de presentación', vp.titulo, 'presentacion-titulo', vp.subtitulo),
          h('div', { style: { maxWidth: '900px' } }, repro.el)));

      /* --- Brief --- */
      document.getElementById('brief').replaceChildren(
        h('div', { class: 'contenedor' },
          seccionCab('El proyecto', 'Por qué existe FOCALIS', 'brief-titulo', s.producto.tematica),
          h('div', { class: 'brief' }, s.brief.map((b) =>
            h('article', { class: 'brief__tarjeta' },
              h('span', { class: 'brief__icono' }, icono(b.icono)),
              h('h3', { class: 'brief__titulo' }, b.titulo),
              h('p', { class: 'brief__texto' }, b.texto)))),
          h('div', { class: 'objetivos' },
            h('div', { class: 'objetivos__general' },
              h('p', { class: 'seccion__kicker' }, 'Objetivo general'),
              h('p', {}, s.producto.objetivoGeneral),
              h('p', { class: 'objetivos__publico' }, h('strong', {}, 'Para quién es: '), s.producto.publico)),
            h('div', {},
              h('p', { class: 'seccion__kicker', style: { marginBottom: '12px' } }, 'Lo que vas a lograr'),
              h('ol', { class: 'objetivos__lista' }, s.producto.objetivos.map((o) => h('li', {}, o)))))));
    }
  };
})(window.Focalis);
