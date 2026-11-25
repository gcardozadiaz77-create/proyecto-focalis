/* ==========================================================
   FOCALIS · escenas-comunes.js
   Tipos de escena que se usan en varias páginas:
   intro · clasificar · multiple
   y la ayuda F.grupoOpciones() (respuesta única).
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  /* Grupo de botones de respuesta única.
     lista: [{id, etiqueta, icono?}]  ·  alElegir(opcion, fueUsuario) */
  F.grupoOpciones = function (lista, { previa, alElegir, clase, etiqueta } = {}) {
    const grupo = h('div', { class: clase || 'opciones', role: 'group', 'aria-label': etiqueta || null });
    const botones = lista.map((o) => {
      const b = h('button', { type: 'button', class: 'opcion', 'aria-pressed': 'false', dataset: { id: o.id } },
        o.icono ? icono(o.icono) : null,
        h('span', {}, o.etiqueta));
      b.addEventListener('click', () => marcar(o.id, true));
      grupo.append(b);
      return b;
    });
    function marcar(id, usuario) {
      botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
      if (alElegir) alElegir(lista.find((o) => o.id === id), usuario);
    }
    if (previa) marcar(previa, false);
    return grupo;
  };

  /* ---------- intro: una ilustración de la escena ---------- */
  F.registrarEscena('intro', (esc) => {
    return h('div', { class: 'ilustracion' }, F.ilustracion(esc.ilustracion));
  });

  /* ---------- clasificar: llevar cada frase a una categoría ---------- */
  F.registrarEscena('clasificar', (esc, ctx) => {
    const d = esc.interaccion;
    const previas = ctx.leer('clasif-' + esc.id, {});
    const respuestas = {};
    const progreso = h('p', { class: 'clasif__prog', 'aria-hidden': 'true' });

    function actualizarProgreso() {
      progreso.textContent = `${Object.keys(respuestas).length} de ${d.items.length} clasificadas`;
    }

    const filas = d.items.map((item) => {
      const nota = h('p', { class: 'clasif__nota', hidden: true });
      const botones = d.categorias.map((cat) =>
        h('button', {
          type: 'button', class: 'clasif__btn', 'aria-pressed': 'false', dataset: { cat: cat.id },
          onclick: () => elegir(fila, cat.id, true)
        }, icono(cat.icono), cat.etiqueta));
      const fila = h('li', { class: 'clasif__fila' },
        h('p', { class: 'clasif__texto' }, item.texto),
        h('div', { class: 'clasif__opciones', role: 'group', 'aria-label': 'Clasificar: ' + item.texto }, botones),
        nota);
      fila._datos = { item, botones, nota };
      return fila;
    });

    function elegir(fila, catId, usuario) {
      const { item, botones, nota } = fila._datos;
      respuestas[item.id] = catId;
      botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === catId)));
      if (d.evaluar) {
        const ok = catId === item.correcta;
        nota.textContent = (ok ? '¡Eso! ' : 'Mira esto: ') + item.nota;
        fila.dataset.estado = ok ? 'ok' : 'revisar';
      } else {
        nota.textContent = item.nota;
      }
      const eraOculta = nota.hidden;
      nota.hidden = false;
      if (usuario && eraOculta) F.entrada(nota, { dy: 4, dur: 180 });
      actualizarProgreso();
      if (usuario) ctx.guardar('clasif-' + esc.id, respuestas);
      if (Object.keys(respuestas).length === d.items.length) ctx.resultado(d.alCompletar);
    }

    filas.forEach((f) => { const p = previas[f._datos.item.id]; if (p) elegir(f, p, false); });
    actualizarProgreso();
    return h('div', { class: 'clasif' }, progreso, h('ul', { class: 'clasif__lista' }, filas));
  });

  /* ---------- multiple: tarjetas que se marcan (varias a la vez) ---------- */
  F.registrarEscena('multiple', (esc, ctx) => {
    const d = esc.interaccion;
    const sel = new Set(ctx.leer('multi-' + esc.id, []));
    const botones = d.opciones.map((o) => {
      const b = h('button', { type: 'button', class: 'opcion opcion--tarjeta', 'aria-pressed': 'false', dataset: { id: o.id } },
        o.icono ? icono(o.icono) : null,
        h('span', { class: 'opcion__texto' }, o.etiqueta),
        h('span', { class: 'opcion__marca' }, icono('check')));
      b.addEventListener('click', () => {
        if (sel.has(o.id)) sel.delete(o.id); else sel.add(o.id);
        pintar(true);
      });
      return b;
    });

    function pintar(usuario) {
      botones.forEach((b) => b.setAttribute('aria-pressed', String(sel.has(b.dataset.id))));
      if (usuario) ctx.guardar('multi-' + esc.id, [...sel]);
      const n = sel.size;
      if (d.fijo) {
        if (n > 0) ctx.resultado(d.resultado[0]); else ctx.resultado(null);
      } else if (usuario || n > 0) {
        const msg = d.resultado[Math.min(n, d.resultado.length - 1)].replace('{n}', n);
        ctx.resultado(msg);
      }
    }
    pintar(false);
    return h('div', { class: 'opciones opciones--2', role: 'group', 'aria-label': esc.texto || esc.titulo }, botones);
  });

})(window.Focalis);
