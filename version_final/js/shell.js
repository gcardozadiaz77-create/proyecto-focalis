/* ==========================================================
   FOCALIS · shell.js
   Lo que se repite en todas las páginas: cabecera con la ruta
   de 6 pasos, encabezado de página, pie con créditos y manejo
   de errores de carga.
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  function minutos(seg) { return Math.max(1, Math.round(seg / 60)); }

  F.Shell = {
    montar(id) {
      const sitio = F.sitio;
      const esInicio = id === 'inicio';

      /* --- Cabecera --- */
      const lista = h('ol', { class: 'nav__lista' }, sitio.paginas.map((p) => {
        const actual = String(p.n) === id;
        const hecha = !actual && F.progreso.completa(p.n);
        return h('li', {},
          h('a', {
            class: 'nav__enlace' + (hecha ? ' is-hecha' : ''),
            href: p.archivo,
            'aria-current': actual ? 'page' : null,
            title: p.titulo
          },
            h('span', { class: 'nav__n' }, hecha ? icono('check') : String(p.n)),
            h('span', { class: 'nav__texto' }, p.corto))
        );
      }));
      document.getElementById('cabecera').replaceChildren(
        h('div', { class: 'cabecera__in contenedor' },
          h('a', { class: 'marca', href: 'inicio.html', 'aria-label': 'FOCALIS, ir al inicio' },
            h('span', { class: 'marca__icono' }, icono('linterna')), 'FOCALIS'),
          h('nav', { class: 'nav', 'aria-label': 'Ruta de FOCALIS' }, lista))
      );

      /* --- Encabezado de página (páginas 1 a 6) --- */
      const cab = document.getElementById('pagina-cab');
      if (cab && !esInicio) {
        const p = sitio.paginas.find((x) => String(x.n) === id);
        cab.replaceChildren(
          h('div', { class: 'contenedor' },
            h('div', { class: 'pagina-cab__in' },
              h('p', { class: 'pagina-cab__kicker' },
                h('span', {}, `Página ${p.n} de ${sitio.paginas.length}`),
                h('span', { class: 'punto' }),
                h('span', {}, `≈ ${minutos(p.segundos)} min`)),
              h('h1', { id: 'pagina-titulo' }, p.titulo),
              h('p', { class: 'pagina-cab__idea' }, icono('linterna'), h('span', {}, p.idea))))
        );
        document.title = `${p.titulo} · FOCALIS`;
      }

      /* --- Pie --- */
      const e = sitio.equipo;
      const modoGuion = !!F.almacen.get('modoGuion', false);
      document.body.classList.toggle('modo-guion', modoGuion);

      const btnGuion = h('button', {
        type: 'button', class: 'btn btn--fantasma btn--chico', 'aria-pressed': String(modoGuion),
        onclick(ev) {
          const on = !document.body.classList.contains('modo-guion');
          document.body.classList.toggle('modo-guion', on);
          ev.currentTarget.setAttribute('aria-pressed', String(on));
          F.almacen.set('modoGuion', on);
        }
      }, icono('guion'), 'Ver notas del guion');

      const btnReiniciar = h('button', {
        type: 'button', class: 'btn btn--fantasma btn--chico',
        onclick() {
          if (confirm('¿Borrar tu progreso y tus respuestas de este navegador?')) {
            F.almacen.borrarTodo();
            location.reload();
          }
        }
      }, icono('borrar'), 'Reiniciar mi progreso');

      document.getElementById('pie').replaceChildren(
        h('div', { class: 'contenedor pie__in' },
          h('div', {},
            h('p', { class: 'pie__marca' }, sitio.marca.nombre),
            h('p', { class: 'pie__lema' }, sitio.marca.lema[0].toUpperCase() + sitio.marca.lema.slice(1)),
            h('ul', { class: 'pie__equipo' }, e.integrantes.map((n) => h('li', {}, n))),
            h('p', { class: 'pie__curso' }, `${e.institucion} · ${e.curso}`)),
          h('div', { class: 'pie__acciones' }, btnGuion, btnReiniciar),
          h('p', { class: 'pie__nota' }, 'Los datos de Sami (notas, hojas de registro) son ejemplos del personaje, no datos reales. Tus respuestas se guardan solo en este navegador.')
        )
      );
    },

    /* Error de carga: lo más común es abrir el archivo con doble clic (file://),
       donde el navegador bloquea la lectura de los JSON. */
    error(err) {
      console.error(err);
      const destino = document.getElementById('recorrido') || document.getElementById('contenido') || document.body;
      const local = location.protocol === 'file:';
      destino.replaceChildren(
        h('div', { class: 'contenedor' },
          h('div', { class: 'aviso', role: 'alert' },
            h('strong', {}, local ? 'Falta un servidor local' : 'No se pudo cargar el contenido'),
            local
              ? h('p', {}, 'Abriste la página con doble clic (file://) y el navegador bloquea la lectura de los archivos JSON. Abre la carpeta del proyecto con Live Server en VS Code, o ejecuta ',
                  h('code', {}, 'python -m http.server 8000'), ' y entra a ', h('code', {}, 'http://localhost:8000'), '.')
              : h('p', {}, err && err.message ? err.message : 'Intenta recargar la página.')))
      );
    }
  };
})(window.Focalis);
