/* ==========================================================
   FOCALIS · escenas-p3.js  ·  Página 3: Cómo motivarte en clase
   Tipos: notas · relojes · completar · meta · participar
   (3.2 usa "multiple" y 3.4 usa "clasificar", de escenas-comunes.js)
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;
  const SVG = 'http://www.w3.org/2000/svg';

  /* ---------- 3.1 Un día pierdes un tema ---------- */
  F.registrarEscena('notas', (esc, ctx) => {
    const d = esc.interaccion;
    let dia = -1;

    const sami = h('div', { class: 'libreta__sami' }, F.sami('neutro', 56));
    const rotulo = h('p', { class: 'libreta__dia' }, 'Semana de Sami');
    const estado = h('p', { class: 'libreta__estado', 'aria-live': 'polite' }, 'Todavía no ha pasado ningún día.');
    const barras = d.dias.map((x) => {
      const col = h('div', { class: 'barra__col' + (x.nota < 3.5 ? ' is-baja' : ''), style: { '--h': String(x.nota / 5) } });
      col.style.setProperty('--h', String(x.nota / 5));
      return h('div', { class: 'barra' },
        h('span', { class: 'barra__nota' }, x.nota.toFixed(1)),
        h('div', { class: 'barra__zona' }, col),
        h('span', { class: 'barra__dia' }, x.dia.slice(0, 3)));
    });
    const libreta = h('div', { class: 'libreta' },
      h('div', { class: 'libreta__cab' }, sami, h('div', {}, rotulo, estado)),
      h('div', { class: 'libreta__barras', role: 'img', 'aria-label': 'Notas de Sami durante la semana' }, barras));

    const boton = h('button', { type: 'button', class: 'btn btn--luz' }, icono('flecha-der'), 'Pasar al siguiente día');
    const reiniciar = h('button', { type: 'button', class: 'btn btn--claro btn--chico', hidden: true }, icono('repetir'), 'Volver al lunes');

    function pintar() {
      barras.forEach((b, i) => b.classList.toggle('is-dada', i <= dia));
      if (dia < 0) return;
      const x = d.dias[dia];
      rotulo.textContent = x.dia;
      estado.textContent = `${x.estado} Nota: ${x.nota.toFixed(1)}.`;
      sami.replaceChildren(F.sami(x.expresion, 56));
      reiniciar.hidden = false;
      if (dia === d.dias.length - 1) {
        boton.disabled = true;
        ctx.resultado(d.alCompletar);
      }
    }
    boton.addEventListener('click', () => { if (dia < d.dias.length - 1) { dia++; pintar(); } });
    reiniciar.addEventListener('click', () => {
      dia = -1;
      barras.forEach((b) => b.classList.remove('is-dada'));
      rotulo.textContent = 'Semana de Sami';
      estado.textContent = 'Todavía no ha pasado ningún día.';
      sami.replaceChildren(F.sami('neutro', 56));
      boton.disabled = false;
      reiniciar.hidden = true;
      ctx.resultado(null);
    });

    return h('div', { class: 'notas' }, libreta,
      h('div', { class: 'notas__acciones' }, boton, reiniciar),
      h('p', { class: 'notas__aviso' }, d.aviso));
  });

  /* ---------- 3.3 Dos relojes ---------- */
  function reloj(cfg, clase) {
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('class', 'reloj__cara');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `
      <circle cx="60" cy="60" r="54" fill="#fff" stroke="#0b2a16" stroke-width="5"/>
      <g stroke="#0b2a16" stroke-width="3" stroke-linecap="round">
        <path d="M60 12v8M60 100v8M12 60h8M100 60h8"/>
      </g>
      <g class="reloj__aguja"><path d="M60 62V22" stroke="#ff5f52" stroke-width="4" stroke-linecap="round"/></g>
      <circle cx="60" cy="60" r="5" fill="#0b2a16"/>`;
    const cuenta = h('p', { class: 'reloj__cuenta' }, '0');
    return {
      aguja: svg.querySelector('.reloj__aguja'),
      cuenta,
      el: h('div', { class: 'reloj ' + clase }, svg,
        h('p', { class: 'reloj__etq' }, cfg.etiqueta), cuenta,
        h('p', { class: 'reloj__cuenta-et' }, cfg.contador))
    };
  }

  F.registrarEscena('relojes', (esc, ctx) => {
    const d = esc.interaccion;
    const ra = reloj(d.rapido, 'reloj--rapido');
    const le = reloj(d.lento, 'reloj--lento');
    const boton = h('button', { type: 'button', class: 'btn btn--luz' }, icono('reloj'), d.boton);
    const total = d.duracion;                 // segundos que dura la demostración
    const videos = total * 2;                 // un video cada 0,5 s
    const ideas = Math.max(1, Math.round(total / 6));  // una idea cada ~6 s
    let animaciones = [];
    let raf = 0;

    function detener() {
      animaciones.forEach((a) => a.cancel());
      animaciones = [];
      cancelAnimationFrame(raf);
    }
    ctx.limpiar(detener);

    boton.addEventListener('click', () => {
      detener();
      boton.disabled = true;
      ctx.resultado(null);
      if (F.reducirMovimiento()) {
        ra.cuenta.textContent = String(videos);
        le.cuenta.textContent = String(ideas);
        boton.disabled = false;
        ctx.resultado(d.alCompletar);
        return;
      }
      animaciones.push(ra.aguja.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: 1000, iterations: total }));
      animaciones.push(le.aguja.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], { duration: total * 1000, iterations: 1 }));
      const t0 = performance.now();
      (function paso(t) {
        const p = Math.min(1, (t - t0) / (total * 1000));       // movimiento constante: lineal
        ra.cuenta.textContent = String(Math.floor(p * videos));
        le.cuenta.textContent = String(Math.floor(p * ideas));
        if (p < 1) raf = requestAnimationFrame(paso);
        else {
          ra.cuenta.textContent = String(videos);
          le.cuenta.textContent = String(ideas);
          boton.disabled = false;
          boton.lastChild.textContent = 'Repetir';
          ctx.resultado(d.alCompletar);
        }
      })(t0);
    });

    return h('div', { class: 'relojes' },
      h('div', { class: 'relojes__par' }, ra.el, le.el), boton);
  });

  /* ---------- 3.5 Cambio 1: busca tu «para qué» ---------- */
  F.registrarEscena('completar', (esc, ctx) => {
    const d = esc.interaccion;
    const previa = ctx.leer(d.clave, '');
    const hueco = h('span', { class: 'completar__hueco' }, previa || '______');
    const frase = h('p', { class: 'completar__frase', 'aria-live': 'polite' }, d.inicio + ' ', hueco, '.');
    const campo = h('input', { type: 'text', class: 'campo', maxlength: '80', placeholder: d.otra, 'aria-label': d.otra });
    const usar = h('button', { type: 'button', class: 'btn btn--claro' }, icono('check'), 'Usar mi frase');

    function elegir(texto, usuario) {
      hueco.textContent = texto;
      if (usuario) ctx.guardar(d.clave, texto);
      ctx.resultado('Ese es tu «para qué». Lo vas a ver de nuevo en la escena 3.7.');
    }
    const lista = d.opciones.map((t, i) => ({ id: String(i), etiqueta: t }));
    const opciones = F.grupoOpciones(lista, {
      clase: 'opciones', etiqueta: 'Opciones para completar la frase',
      previa: (() => { const i = d.opciones.indexOf(previa); return i >= 0 ? String(i) : null; })(),
      alElegir(o, usuario) { elegir(o.etiqueta, usuario); campo.value = ''; }
    });
    function propia() {
      const t = campo.value.trim();
      if (!t) { campo.focus(); return; }
      [...opciones.children].forEach((b) => b.setAttribute('aria-pressed', 'false'));
      elegir(t, true);
    }
    usar.addEventListener('click', propia);
    campo.addEventListener('keydown', (e) => { if (e.key === 'Enter') propia(); });
    if (previa && !d.opciones.includes(previa)) { campo.value = previa; elegir(previa, false); }

    return h('div', { class: 'completar' }, frase, opciones,
      h('div', { class: 'completar__otra' }, campo, usar));
  });

  /* ---------- 3.6 Cambio 2: una meta pequeña ---------- */
  F.registrarEscena('meta', (esc, ctx) => {
    const d = esc.interaccion;
    const nota = h('div', { class: 'nota-adhesiva meta__nota', hidden: true, 'aria-live': 'polite' },
      h('p', { class: 'nota-adhesiva__titulo' }, d.notaTitulo),
      h('p', { class: 'nota-adhesiva__texto' }));
    const previa = ctx.leer(d.clave, null);

    function poner(o, usuario) {
      nota.querySelector('.nota-adhesiva__texto').textContent = o.etiqueta;
      const estaba = nota.hidden;
      nota.hidden = false;
      if (estaba && usuario) F.entrada(nota, { dy: 10 });
      if (usuario) ctx.guardar(d.clave, o.etiqueta);
      ctx.resultado('Una sola idea alcanza por hoy. Esa es tu meta mínima.');
    }
    const opciones = F.grupoOpciones(d.opciones, {
      clase: 'opciones', etiqueta: 'Elige tu meta pequeña',
      previa: (d.opciones.find((o) => o.etiqueta === previa) || {}).id,
      alElegir: poner
    });
    return h('div', { class: 'meta' }, opciones, nota);
  });

  /* ---------- 3.7 Cambio 3: participa ---------- */
  F.registrarEscena('participar', (esc, ctx) => {
    const d = esc.interaccion;
    const profe = h('p', { class: 'participar__profe', hidden: true, role: 'status' }, d.profe);
    const boton = h('button', { type: 'button', class: 'btn btn--luz' }, icono('mano'), d.boton);
    let manoArriba = false;

    const filas = d.cambios.map((c) => {
      let detalle;
      let vacio = false;
      if (c.fijo) detalle = c.fijo;
      else {
        const v = ctx.leer(c.clave, null);
        detalle = v || c.vacio;
        vacio = !v;
      }
      const det = h('p', { class: 'cambio__det' + (vacio ? ' es-vacio' : '') }, detalle);
      const fila = h('li', { class: 'cambio' + (!vacio && !c.fijo ? ' is-hecho' : '') },
        h('span', { class: 'cambio__n' }, String(c.n)),
        h('div', {}, h('p', { class: 'cambio__tit' }, c.titulo), det));
      fila._fijo = !!c.fijo;
      return fila;
    });

    boton.addEventListener('click', () => {
      manoArriba = !manoArriba;
      boton.replaceChildren(icono('mano'), manoArriba ? 'Bajar la mano' : d.boton);
      profe.hidden = !manoArriba;
      if (manoArriba) F.entrada(profe, { dy: 6 });
      filas.forEach((f) => { if (f._fijo) f.classList.toggle('is-hecho', manoArriba); });
      if (manoArriba) ctx.resultado('Tres cambios pequeños: un motivo propio, una meta chica y participar.');
      else ctx.resultado(null);
    });

    return h('div', { class: 'participar' },
      h('div', {}, boton),
      profe,
      h('ol', { class: 'cambios', 'aria-label': 'Los tres cambios pequeños' }, filas));
  });

})(window.Focalis);
