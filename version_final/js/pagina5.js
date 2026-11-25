/* ==========================================================
   FOCALIS · pagina5.js  ·  Página 5: Videos
   Cuatro videos de repaso (uno por cada página 1 a 4).
   Cada video es un "animatic" hecho con las escenas del JSON.
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  F.Pagina5 = {
    async montar() {
      const d = await F.cargar('pagina5.json');
      const raiz = document.getElementById('recorrido');
      const sitio = F.sitio;
      const siguiente = sitio.paginas.find((p) => p.n === 6);
      const vistos = new Set(F.respuestas.leer('videosVistos', []));
      F.progreso.total(5, 2);
      F.progreso.marcar(5, 0);

      let actual = null;        // { video, reproductor }
      const zonaVideo = h('div', { class: 'video-zona' });
      const info = h('div', { class: 'video-info' });
      const tarjetas = d.videos.map((v, i) => {
        const b = h('button', { type: 'button', class: 'video-tarjeta' + (vistos.has(v.id) ? ' is-visto' : ''), 'aria-pressed': 'false', dataset: { id: v.id } },
          h('span', { class: 'video-tarjeta__rotulo' }, icono('play'), `Video ${i + 1} · ${v.repasa}`),
          h('span', { class: 'video-tarjeta__titulo' }, v.titulo),
          h('span', { class: 'video-tarjeta__resumen' }, v.resumen),
          h('span', { class: 'video-tarjeta__visto', 'aria-label': 'Ya lo viste' }, icono('check')));
        b.addEventListener('click', () => elegir(i, true));
        return b;
      });

      function marcarVisto(v) {
        vistos.add(v.id);
        F.respuestas.guardar('videosVistos', [...vistos]);
        tarjetas.find((t) => t.dataset.id === v.id).classList.add('is-visto');
        if (vistos.size === d.videos.length) F.progreso.completar(5);
      }

      /* Cada tarjeta muestra el video de su carpeta (v.archivo en el JSON).
         Si el archivo no existe o no carga, se usa el animatic como respaldo. */
      function crearReproductor(v, conArchivo) {
        return F.Reproductor.crear({
          escenas: v.escenas, rotulo: 'Escena', claro: true,
          archivo: conArchivo ? (v.archivo || null) : null, poster: v.poster || null,
          alTerminar: () => marcarVisto(v),
          alFallar: () => {
            if (!actual || actual.video !== v) return;
            actual.reproductor.destruir();
            actual.reproductor = crearReproductor(v, false);
            zonaVideo.replaceChildren(actual.reproductor.el);
          }
        });
      }

      function elegir(i, reproducir) {
        const v = d.videos[i];
        if (actual) actual.reproductor.destruir();
        const reproductor = crearReproductor(v, true);
        actual = { video: v, reproductor };
        zonaVideo.replaceChildren(reproductor.el);
        info.replaceChildren(
          h('h3', { class: 'video-info__titulo' }, v.titulo),
          h('p', { class: 'video-info__resumen' }, v.resumen));
        tarjetas.forEach((t, j) => t.setAttribute('aria-pressed', String(j === i)));
        F.progreso.marcar(5, 0);
        if (reproducir && reproductor.reproducir) reproductor.reproducir();
      }

      const voz = h('div', { class: 'voz' },
        h('div', { class: 'voz__narradora' },
          h('span', { class: 'voz__etiqueta' }, icono('microfono'), 'Voz narradora'),
          h('p', {}, d.intro.narracion)),
        h('div', { class: 'voz__guion' }, h('p', {}, h('strong', {}, 'Escena: '), d.intro.escenario)));

      const panel = h('article', { class: 'panel', 'aria-labelledby': 'esc-5-1' },
        h('header', { class: 'escena__cab' },
          h('span', { class: 'escena__id' }, d.intro.id),
          h('h2', { id: 'esc-5-1', class: 'escena__titulo' }, 'Elige un video para repasar')),
        voz,
        h('div', { class: 'videos' },
          h('div', {}, zonaVideo, info),
          h('div', { class: 'videos__lista', role: 'group', 'aria-label': 'Los cuatro videos' }, tarjetas)));

      const cierre = h('article', { class: 'panel cierre', 'aria-labelledby': 'esc-5-14' },
        h('header', { class: 'escena__cab' },
          h('span', { class: 'escena__id' }, d.cierre.id),
          h('h2', { id: 'esc-5-14', class: 'escena__titulo' }, 'Ahora es tu turno')),
        h('div', { class: 'voz__narradora' },
          h('span', { class: 'voz__etiqueta' }, icono('microfono'), 'Voz narradora'),
          h('p', {}, d.cierre.narracion)),
        h('p', { class: 'voz__pantalla' },
          h('span', { class: 'voz__etiqueta voz__etiqueta--pantalla' }, 'En pantalla'), d.cierre.texto),
        h('div', { class: 'cierre__acciones' },
          h('a', { class: 'btn btn--luz btn--grande', href: siguiente.archivo, onclick: () => F.progreso.completar(5) },
            `Página 6: ${siguiente.corto}`, icono('flecha-der'))));

      raiz.replaceChildren(h('div', { class: 'contenedor' }, panel, cierre));
      elegir(0, false);
    }
  };
})(window.Focalis);
