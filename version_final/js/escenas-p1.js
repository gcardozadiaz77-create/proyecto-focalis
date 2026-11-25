/* ==========================================================
   FOCALIS · escenas-p1.js  ·  Página 1: Cómo mejorar tu atención
   Tipos: linterna · distractores · medidor · rompecabezas · guardar
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  /* Un "objeto" iluminable: botón con ícono y etiqueta */
  function objeto(o, extra) {
    return h('button', { type: 'button', class: 'objeto' + (extra ? ' ' + extra : ''), dataset: { id: o.id }, 'aria-pressed': 'false' },
      h('span', { class: 'objeto__icono' }, icono(o.icono)),
      h('span', { class: 'objeto__etq' }, o.etiqueta),
      o.detalle ? h('span', { class: 'objeto__det' }, o.detalle) : null);
  }

  /* ---------- 1.2 La linterna ---------- */
  F.registrarEscena('linterna', (esc, ctx) => {
    const d = esc.interaccion;
    const objetos = d.objetos.map((o) => objeto(o));
    const marco = h('div', { class: 'oscura' }, h('div', { class: 'linterna__fila' }, objetos));
    const haz = F.crearHaz(marco, 200);
    ctx.limpiar(() => haz.destruir());
    const visitados = new Set();
    let actual = 0;

    function iluminar(i) {
      actual = i;
      objetos.forEach((b, j) => {
        b.classList.toggle('is-luz', j === i);
        b.setAttribute('aria-pressed', String(j === i));
      });
      haz.mover(objetos[i]);
      visitados.add(i);
      if (visitados.size === objetos.length) ctx.resultado(d.alCompletar);
    }
    objetos.forEach((b, i) => b.addEventListener('click', () => iluminar(i)));

    const mano = h('button', { type: 'button', class: 'btn btn--luz linterna__mano',
      onclick: () => iluminar((actual + 1) % objetos.length) },
      icono('linterna'), 'Mover la linterna');

    ctx.alMontar(() => iluminar(0));
    return h('div', { class: 'linterna' }, marco, mano);
  });

  /* ---------- 1.3 Lo que jala tu linterna ---------- */
  F.registrarEscena('distractores', (esc, ctx) => {
    const d = esc.interaccion;
    const base = objeto(d.base, 'objeto--base');
    const otros = d.distractores.map((o) => objeto(o, 'objeto--distractor'));
    const efecto = h('p', { class: 'distractores__efecto', 'aria-live': 'polite' }, 'Toca cada cosa y mira hacia dónde se va la luz.');
    const marco = h('div', { class: 'oscura' },
      h('div', { class: 'distractores__rejilla' }, base, ...otros));
    const haz = F.crearHaz(marco, 190);
    ctx.limpiar(() => haz.destruir());

    function mover(btn, texto) {
      [base, ...otros].forEach((b) => {
        b.classList.toggle('is-luz', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      haz.mover(btn);
      efecto.textContent = texto;
    }
    base.addEventListener('click', () => mover(base, 'La luz vuelve a la clase.'));
    otros.forEach((b, i) => b.addEventListener('click', () => mover(b, d.distractores[i].efecto)));

    const chips = F.grupoOpciones(
      d.distractores.map((o) => ({ id: o.id, etiqueta: o.etiqueta, icono: o.icono })),
      {
        clase: 'opciones opciones--fila', etiqueta: d.pregunta || esc.texto,
        previa: ctx.leer('distractor', null),
        alElegir(o, usuario) {
          if (usuario) ctx.guardar('distractor', o.id);
          ctx.resultado(d.alElegir);
        }
      });

    ctx.alMontar(() => mover(base, 'Toca cada cosa y mira hacia dónde se va la luz.'));
    return h('div', { class: 'distractores' },
      marco, efecto,
      h('p', { class: 'etiqueta-grupo' }, d.pregunta),
      chips);
  });

  /* ---------- 1.5 El medidor de uso ---------- */
  F.registrarEscena('medidor', (esc, ctx) => {
    const d = esc.interaccion;
    const relleno = h('div', { class: 'medidor__relleno' });
    const valor = h('p', { class: 'medidor__valor' }, '¿?');
    const pantalla = h('div', { class: 'telefono__pantalla medidor' },
      h('div', { class: 'telefono__barra' }, h('span', {}, 'Ajustes'), h('span', {}, 'Ayer')),
      h('p', { class: 'medidor__titulo' }, 'Tiempo de uso'),
      valor,
      h('div', { class: 'medidor__pista' }, relleno),
      h('p', { class: 'medidor__leyenda' }, 'En clase o estudiando'));
    const tel = h('div', { class: 'telefono' }, pantalla);

    function mostrar(o) {
      pantalla.classList.toggle('is-nose', o.nivel === null);
      if (o.nivel === null) {
        valor.textContent = '¿?';
        relleno.style.transform = 'scaleX(0)';
      } else {
        valor.textContent = o.etiqueta;
        relleno.style.transform = `scaleX(${o.nivel})`;
      }
    }
    const opciones = F.grupoOpciones(d.opciones, {
      clase: 'opciones opciones--2', etiqueta: esc.texto,
      previa: ctx.leer('usoAyer', null),
      alElegir(o, usuario) {
        if (usuario) ctx.guardar('usoAyer', o.id);
        mostrar(o);
        ctx.resultado(d.respuesta, o.nivel === null ? 'pista' : 'ok');
      }
    });
    return h('div', { class: 'medidor-escena' }, tel, opciones);
  });

  /* ---------- 1.6 El rompecabezas de la clase ---------- */
  F.registrarEscena('rompecabezas', (esc, ctx) => {
    const d = esc.interaccion;
    let vistazos = 0;
    const huecos = d.frase.map((w) => h('div', { class: 'pieza' }, h('span', {}, w)));
    huecos.push(h('div', { class: 'pieza pieza--luz' }, icono('linterna')));
    const rejilla = h('div', { class: 'rompe' }, huecos.map((p) => h('div', { class: 'rompe__hueco' }, p)));
    const cuenta = h('p', { class: 'rompe__cuenta', 'aria-live': 'polite' }, 'La explicación está completa.');
    const boton = h('button', { type: 'button', class: 'btn btn--coral' }, icono('celular'), d.boton);
    const reiniciar = h('button', { type: 'button', class: 'btn btn--claro btn--chico', hidden: true }, icono('repetir'), 'Volver a empezar');

    boton.addEventListener('click', () => {
      if (vistazos >= d.maximo) return;
      vistazos++;
      const disponibles = huecos.filter((p) => !p.classList.contains('is-falta'));
      for (let k = 0; k < d.piezasPorVez && disponibles.length; k++) {
        const i = Math.floor(Math.random() * disponibles.length);
        disponibles.splice(i, 1)[0].classList.add('is-falta');
      }
      const faltan = huecos.filter((p) => p.classList.contains('is-falta')).length;
      cuenta.textContent = `Vistazos al celular: ${vistazos}. Piezas que faltan: ${faltan}.`;
      reiniciar.hidden = false;
      if (vistazos >= 2) ctx.mostrarSami();
      if (vistazos >= d.maximo) { boton.disabled = true; ctx.resultado(d.alTerminar); }
    });
    reiniciar.addEventListener('click', () => {
      vistazos = 0;
      huecos.forEach((p) => p.classList.remove('is-falta'));
      boton.disabled = false;
      reiniciar.hidden = true;
      cuenta.textContent = 'La explicación está completa.';
      ctx.resultado(null);
    });

    return h('div', { class: 'rompe-escena' },
      h('p', { class: 'etiqueta-grupo' }, 'La explicación del profe'),
      rejilla, cuenta,
      h('div', { class: 'rompe__acciones' }, boton, reiniciar));
  });

  /* ---------- 1.7 Guardar el celular ---------- */
  F.registrarEscena('guardar', (esc, ctx) => {
    const d = esc.interaccion;
    const clase = objeto({ id: 'clase', etiqueta: 'La clase', detalle: 'Explicación del profe', icono: 'tablero' });
    const cel = objeto({ id: 'cel', etiqueta: 'Mi celular', detalle: 'Está vibrando', icono: 'celular' }, 'objeto--vibra');
    const marco = h('div', { class: 'oscura' }, h('div', { class: 'linterna__fila linterna__fila--2' }, clase, cel));
    const haz = F.crearHaz(marco, 210);
    ctx.limpiar(() => haz.destruir());
    let guardado = false;

    function poner(g, usuario) {
      guardado = g;
      cel.classList.toggle('is-guardado', g);
      clase.classList.toggle('is-luz', g);
      cel.classList.toggle('is-luz', !g);
      cel.querySelector('.objeto__det').textContent = g ? 'En la mochila' : 'Está vibrando';
      haz.mover(g ? clase : cel);
      boton.replaceChildren(icono(g ? 'celular' : 'mochila'), g ? d.botonAtras : d.boton);
      boton.classList.toggle('btn--luz', !g);
      boton.classList.toggle('btn--claro', g);
      if (g) ctx.resultado('La linterna vuelve a la clase. Tú decides.');
      else if (usuario) ctx.resultado(null);
    }
    const boton = h('button', { type: 'button', class: 'btn btn--luz linterna__mano', onclick: () => poner(!guardado, true) });
    ctx.alMontar(() => poner(false, false));
    return h('div', { class: 'linterna' }, marco, boton);
  });

})(window.Focalis);
