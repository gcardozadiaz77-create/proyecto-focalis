/* ==========================================================
   FOCALIS · escenas-p4.js  ·  Página 4: Técnicas para potenciar el estudio
   Tipos: tecnica · hojas
   (4.1 y 4.7 usan "intro", de escenas-comunes.js)
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  /* ---------- Dibujos de cada técnica ----------
     Cada uno recibe data-paso (-1 = ninguno, 0, 1, 2) en el contenedor .tvisual.
     Los elementos con data-v="p0 e1" se encienden en esos pasos
     (pN = solo el paso N; e1 = pasos 1 y 2; e2 = solo el 2). */
  const VISUALES = {
    bloques() {
      return [
        h('span', { class: 'tv-chip', 'data-v': 'p0 e1' }, 'Tarea: leer el capítulo de sociales'),
        h('div', { class: 'tv-bloques' },
          h('div', { class: 'tv-seg tv-seg--estudio', 'data-v': 'p1' }, '25 min de estudio, sin celular'),
          h('div', { class: 'tv-seg tv-seg--descanso', 'data-v': 'e2' }, '5 min'))
      ];
    },
    plan(d) {
      const orden = [1, 2, 0];                      // orden desordenado al inicio
      const filas = d.plan.map((p, i) => {
        const f = h('li', { class: 'tv-plan__item' },
          h('span', { class: 'tv-plan__hora' }, p.hora), p.tarea);
        f._i = i;
        return f;
      });
      const lista = h('ul', { class: 'tv-plan', 'aria-label': 'Plan de estudio de Sami' }, filas);
      lista._pintar = (paso) => {
        filas.forEach((f, i) => { f.style.order = String(paso >= 1 ? i : orden[i]); });
      };
      return [lista];
    },
    entorno() {
      return [
        h('div', { class: 'tv-entorno' },
          h('div', { class: 'tv-obj tv-obj--cel', 'data-v': 'p0' }, icono('celular'), 'Mi celular'),
          h('span', { class: 'tv-flecha' }, icono('flecha-der')),
          h('div', { class: 'tv-obj', 'data-v': 'e1' }, icono('mochila'), 'La mochila',
            h('span', { class: 'tv-dentro' }, 'celular guardado'))),
        h('span', { class: 'tv-chip', 'data-v': 'p0' }, 'No molestar: activado'),
        h('span', { class: 'tv-solo', 'data-v': 'p2' }, 'Solo si el plan lo dice: en el descanso')
      ];
    },
    autoevaluacion() {
      return [h('div', { class: 'tv-check' },
        h('div', { class: 'tv-check__fila', 'data-v': 'p0' }, icono('check'), 'Terminé el taller'),
        h('div', { class: 'tv-check__fila', 'data-v': 'p1' }, 'Veces que miré el celular:',
          h('span', { class: 'tv-marcas', 'aria-label': '2 veces' }, h('i'), h('i'))),
        h('div', { class: 'tv-check__fila', 'data-v': 'p2' }, icono('lapiz'), 'Mañana: lo dejo en otro cuarto'))];
    }
  };

  /* ---------- 4.2 a 4.5 Las cuatro técnicas ---------- */
  F.registrarEscena('tecnica', (esc, ctx) => {
    const d = esc.interaccion;
    const vistos = new Set();
    let actual = -1;

    const detalle = h('p', { class: 'tecnica__detalle es-vacio', 'aria-live': 'polite' }, 'Toca un paso para verlo.');
    const dibujo = (VISUALES[d.visual] || (() => []))(d);
    const visual = h('div', { class: 'tvisual', 'data-paso': '-1' }, dibujo);
    const ejemplo = h('div', { class: 'tecnica__ejemplo', hidden: true },
      h('div', { class: 'dialogo' },
        h('div', { class: 'dialogo__avatar' }, F.sami('alegre', 52)),
        h('div', { class: 'dialogo__burbuja' }, h('span', { class: 'dialogo__quien' }, 'Ejemplo de Sami'), d.ejemplo)));

    function pintarVisual() {
      visual.dataset.paso = String(actual);
      const lista = visual.querySelector('.tv-plan');
      if (lista && lista._pintar) lista._pintar(actual);
    }

    const botones = d.pasos.map((p, i) => h('button', {
      type: 'button', class: 'paso', 'aria-pressed': 'false',
      onclick: () => elegir(i)
    },
      h('span', { class: 'paso__n' }, `Paso ${i + 1}`, icono('check')),
      h('span', { class: 'paso__corto' }, p.corto)));

    function elegir(i) {
      actual = i;
      vistos.add(i);
      botones.forEach((b, j) => {
        b.setAttribute('aria-pressed', String(j === i));
        b.classList.toggle('is-vista', vistos.has(j));
      });
      detalle.classList.remove('es-vacio');
      detalle.textContent = d.pasos[i].texto;
      F.entrada(detalle, { dy: 4, dur: 180 });
      pintarVisual();
      if (vistos.size === d.pasos.length && ejemplo.hidden) {
        ejemplo.hidden = false;
        F.entrada(ejemplo, { dy: 8 });
      }
    }
    pintarVisual();

    return h('div', { class: 'tecnica' },
      h('div', { class: 'tecnica__cab' },
        h('span', { class: 'tecnica__num' }, String(d.numero)),
        h('div', {},
          h('p', { class: 'tecnica__rotulo' }, `Técnica ${d.numero} de 4`),
          h('p', { class: 'tecnica__nombre' }, d.nombre))),
      h('p', { class: 'tecnica__que' }, h('strong', {}, 'Qué es: '), d.queEs),
      visual,
      h('div', { class: 'pasos', role: 'group', 'aria-label': 'Pasos de la técnica' }, botones),
      detalle,
      ejemplo);
  });

  /* ---------- 4.6 Antes y después ---------- */
  F.registrarEscena('hojas', (esc, ctx) => {
    const d = esc.interaccion;
    const hojas = d.hojas.map((x) => {
      const marcas = h('div', { class: 'hoja__marcas', 'aria-hidden': 'true' },
        Array.from({ length: x.distracciones }, () => icono('x', 'ico--x')));
      const tareas = h('div', { class: 'hoja__marcas', 'aria-hidden': 'true' },
        Array.from({ length: x.tareas }, () => icono('check', 'ico--ok')));
      const b = h('button', {
        type: 'button', class: 'hoja', 'aria-pressed': 'false', dataset: { id: x.id },
        'aria-label': `Hoja ${x.titulo}: ${x.distracciones} veces miró el celular sin querer y ${x.tareas} tareas cumplidas`
      },
        h('span', { class: 'hoja__tit' }, x.titulo),
        h('span', { class: 'hoja__rot' }, 'Miré el celular sin querer'), marcas,
        h('span', { class: 'hoja__rot' }, 'Tareas cumplidas'), tareas,
        h('span', { class: 'hoja__sello' }, 'Me quedo con esta'));
      b.addEventListener('click', () => elegir(x.id, true));
      return b;
    });

    function elegir(id, usuario) {
      hojas.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
      if (usuario) ctx.guardar('hoja-' + esc.id, id);
      ctx.resultado(d.respuestas[id]);
      ctx.mostrarSami();
    }
    const previa = ctx.leer('hoja-' + esc.id, null);
    if (previa) elegir(previa, false);

    return h('div', { class: 'hojas' },
      h('div', { class: 'hojas__par', role: 'group', 'aria-label': 'Elige una hoja de registro' }, hojas),
      h('p', { class: 'hojas__aviso' }, d.aviso));
  });

})(window.Focalis);
