/* ==========================================================
   FOCALIS · reproductor.js
   Reproductor de "animatic": muestra, escena por escena, lo que
   dice el guion (imagen simple + voz en subtítulos) con el
   tiempo real de cada escena. Sirve para los 4 videos de repaso
   (página 5) y el video de presentación (inicio).

   Cuando exista el video final, basta con poner "archivo" en el
   JSON del video: el reproductor usa entonces <video> nativo.
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s) % 60).padStart(2, '0')}`;
  const objetoFalso = (id, etiqueta, ic, extra) => h('div', { class: 'objeto' + (extra ? ' ' + extra : ''), dataset: { id } },
    h('span', { class: 'objeto__icono' }, icono(ic)), h('span', { class: 'objeto__etq' }, etiqueta));
  const COLORES = [['#ff2d95', '#7b2cff'], ['#27e0ff', '#2a5cff'], ['#ffd24a', '#ff7a3c'], ['#34d399', '#0f766e']];

  /* ---------- Imágenes de cada escena ---------- */
  const VIS = {
    vacio() { return h('div', { class: 'vv' }); },

    /* La linterna salta entre la clase y el celular */
    haz(v, esc, c) {
      const clase = objetoFalso('clase', 'La clase', 'tablero');
      const cel = objetoFalso('cel', 'Mi celular', 'celular', v.celularAbajo ? 'is-guardado' : '');
      const marco = h('div', { class: 'oscura' }, h('div', { class: 'linterna__fila linterna__fila--2' }, clase, cel));
      const haz = F.crearHaz(marco, 170);
      c.limpiar(() => haz.destruir());
      const objs = [clase, cel];
      const foco = v.foco || [0];
      let k = 0;
      const poner = (i) => { objs.forEach((o, j) => o.classList.toggle('is-luz', j === i)); haz.mover(objs[i]); };
      requestAnimationFrame(() => poner(foco[0]));
      if (foco.length > 1) {
        const iv = setInterval(() => { if (!c.activo()) return; k = (k + 1) % foco.length; poner(foco[k]); }, 1500);
        c.limpiar(() => clearInterval(iv));
      }
      return h('div', { class: 'vv' }, marco);
    },

    /* El celular vibra y llegan avisos */
    vibra(v, esc, c) {
      const lista = h('div', {});
      const tel = h('div', { class: 'telefono' }, h('div', { class: 'telefono__pantalla notif' }, lista));
      const avisos = ['Chat: mira esto', 'Redes: 3 «me gusta»'];
      avisos.forEach((t, i) => {
        const id = setTimeout(() => {
          const n = h('div', { class: 'vv__notif' }, t);
          lista.append(n);
          F.entrada(n, { dy: -8, dur: 220 });
          tel.classList.remove('is-vibra'); void tel.offsetWidth; tel.classList.add('is-vibra');
        }, 600 + i * 1400);
        c.limpiar(() => clearTimeout(id));
      });
      return h('div', { class: 'vv vv--tel' }, tel, h('div', { class: 'vv__grande' }, icono('campana')));
    },

    /* Un feed que no termina */
    feed() {
      const items = [0, 1, 2, 3, 0, 1].map((k) => h('i', { style: { background: `linear-gradient(160deg, ${COLORES[k][0]}, ${COLORES[k][1]})` } }));
      const tel = h('div', { class: 'telefono' }, h('div', { class: 'telefono__pantalla' }, h('div', { class: 'vv__minifeed' }, items)));
      return h('div', { class: 'vv vv--tel' }, tel, h('div', { class: 'vv__grande' }, icono('reloj')));
    },

    /* Avisos apagados, celular guardado */
    silencio(v) {
      return h('div', { class: 'vv' },
        h('div', { class: 'vv__fila' },
          h('div', { class: 'vv__grande' }, icono('silencio')),
          v.mochila ? [icono('flecha-der'), h('div', { class: 'vv__grande' }, icono('mochila'))] : null),
        h('span', { class: 'vv__rotulo' }, v.mochila ? 'No molestar activado · celular en la mochila' : 'Avisos apagados · el salón en calma'));
    },

    /* La libreta de notas */
    notas(v) {
      const vals = v.valores || [];
      const barras = h('div', { class: 'vv__barras', style: { gridTemplateColumns: `repeat(${Math.max(vals.length, 2)}, 1fr)` } },
        vals.map((n) => h('span', { class: n < 3.5 ? 'baja' : '', style: { height: (n / 5 * 100) + '%' } })));
      return h('div', { class: 'vv' }, barras, h('span', { class: 'vv__rotulo' }, 'Notas de Sami: ' + vals.map((n) => n.toFixed(1)).join(' → ')));
    },

    /* Un motivo propio y una meta pequeña */
    meta() {
      return h('div', { class: 'vv' },
        h('div', { class: 'vv__fila' }, h('div', { class: 'vv__grande' }, icono('meta')),
          h('p', { class: 'vv__nota' }, 'Hoy: entender una sola idea')),
        h('span', { class: 'vv__rotulo' }, '¿Para qué me sirve esto?'));
    },

    /* Bloque de estudio y descanso */
    bloque() {
      return h('div', { class: 'vv' },
        h('div', { class: 'vv__linea' }, h('span', { class: 'est' }, 'Estudio · sin celular'), h('span', { class: 'des' }, 'Descanso')),
        h('span', { class: 'vv__rotulo' }, 'El celular sale solo en el descanso'));
    },

    /* Más tareas cumplidas, menos distracciones */
    registro() {
      const hoja = (t, x, ok) => h('div', { class: 'vv__hoja' }, t,
        h('div', { class: 'marcas' }, Array.from({ length: x }, () => icono('x', 'x'))),
        h('div', { class: 'marcas' }, Array.from({ length: ok }, () => icono('check', 'ok'))));
      return h('div', { class: 'vv' }, h('div', { class: 'vv__hojas' }, hoja('Antes', 6, 1), hoja('Después', 2, 4)),
        h('span', { class: 'vv__rotulo' }, 'Más tareas cumplidas, menos distracciones'));
    },

    /* ----- Video de presentación ----- */
    pantallas() {
      const celdas = Array.from({ length: 12 }, (_, i) => h('div', { class: 'vp-pupitre' + (i % 2 ? '' : ' off') }, h('i')));
      return h('div', { class: 'vv' }, h('div', { class: 'vp-aula' }, celdas),
        h('span', { class: 'vv__rotulo' }, 'Con el cuerpo en el salón y la mente en la nube'));
    },
    bateria() {
      return h('div', { class: 'vv' }, h('div', { class: 'vp-bateria' },
        h('div', { class: 'vp-bateria__cuerpo' }, [0, 1, 2, 3, 4].map(() => h('i'))),
        h('span', { class: 'vv__rotulo' }, 'Batería de atención')));
    },
    montaje(v, esc, c) {
      const cortes = [
        { ic: 'celular', t: 'Un rostro iluminado por la pantalla' },
        { grande: '2.0', t: 'El examen vuelve con la nota en rojo' },
        { ic: 'estrella', t: 'Los amigos ríen en el patio… sin él' }
      ];
      const caja = h('div', { class: 'vp-montaje' });
      let k = 0;
      const pintar = () => {
        const x = cortes[k % cortes.length];
        caja.replaceChildren(
          x.grande ? h('p', { class: 'vp-montaje__nota' }, x.grande) : h('div', { class: 'vv__grande' }, icono(x.ic)),
          h('span', { class: 'vv__rotulo' }, x.t));
      };
      pintar();
      const iv = setInterval(() => { if (!c.activo()) return; k++; pintar(); }, 1800);
      c.limpiar(() => clearInterval(iv));
      return h('div', { class: 'vv' }, caja);
    },
    calido() {
      return h('div', { class: 'vv vp-calido' },
        h('div', { class: 'vv__fila' }, h('div', { class: 'vv__grande' }, icono('teclado')), h('div', { class: 'vv__grande' }, icono('estrella'))),
        h('span', { class: 'vv__rotulo' }, 'Sala de sistemas · luz cálida · música lo-fi'));
    },
    terminal(v, esc, c) {
      const e404 = (F.sitio && F.sitio.marca && F.sitio.marca.error404) || { titulo: 'Error 404: Atención no encontrada.', lema: 'Desconecta para Conectar.' };
      const lineas = ['> buscando atención…', '> error: atención no encontrada', '> reiniciando hábitos…'];
      const caja = h('div', { class: 'vv vp-terminal' });
      lineas.forEach((t, i) => {
        const id = setTimeout(() => { caja.append(h('p', {}, t)); }, 500 + i * 900);
        c.limpiar(() => clearTimeout(id));
      });
      const idFin = setTimeout(() => {
        const fin = h('div', { class: 'vp-terminal__fin' }, h('strong', {}, e404.titulo), h('span', {}, e404.lema));
        caja.append(fin);
        F.entrada(fin, { dy: 6 });
      }, 500 + lineas.length * 900);
      c.limpiar(() => clearTimeout(idFin));
      return caja;
    }
  };

  F.Reproductor = {
    /* opciones: { escenas: [{id, seg, visual, descripcion|plano, sami?, voz}], rotulo, claro, alTerminar, archivo, poster } */
    crear(opts) {
      if (opts.archivo) {
        const v = h('video', { class: 'repro__archivo', controls: true, playsinline: true, preload: 'metadata', poster: opts.poster || null, src: opts.archivo });
        if (opts.alTerminar) v.addEventListener('ended', opts.alTerminar);
        if (opts.alFallar) v.addEventListener('error', opts.alFallar, { once: true });
        return {
          el: v,
          reproducir() { const p = v.play(); if (p && p.catch) p.catch(() => { /* el navegador pidió un toque */ }); },
          pausar() { v.pause(); },
          destruir() { v.pause(); }
        };
      }

      const escenas = opts.escenas;
      const total = escenas.reduce((s, e) => s + e.seg, 0);
      const inicios = [];
      escenas.reduce((acc, e) => { inicios.push(acc); return acc + e.seg; }, 0);
      const rotulo = opts.rotulo || 'Escena';
      let t = 0;
      let jugando = false;
      let raf = 0;
      let tInicio = 0;
      let idx = -1;
      let limpiezas = [];
      let ultimoRango = -1;

      const visual = h('div', { class: 'repro__visual', 'aria-hidden': 'true' });
      const chip = h('span', { class: 'repro__chip', 'aria-hidden': 'true' });
      const subs = h('div', { class: 'repro__subs', 'aria-live': 'off' });
      const iconoCentro = h('span', {}, icono('play'));
      const centro = h('button', { type: 'button', class: 'repro__centro', 'aria-label': 'Reproducir video' }, iconoCentro);
      const pantalla = h('div', { class: 'repro__pantalla' }, visual, chip, subs, centro);

      const btn = h('button', { type: 'button', class: 'repro__btn', 'aria-label': 'Reproducir' }, icono('play'));
      const rango = h('input', { type: 'range', class: 'repro__rango', min: '0', max: '1000', value: '0', step: '1', 'aria-label': 'Posición del video' });
      const tiempo = h('span', { class: 'repro__tiempo' }, `0:00 / ${mmss(total)}`);
      const desc = h('p', { class: 'repro__desc' });
      const raiz = h('div', { class: 'repro' + (opts.claro ? ' repro--claro' : '') },
        pantalla, h('div', { class: 'repro__ctrl' }, btn, rango, tiempo), desc);

      const limpiar = () => { limpiezas.splice(0).forEach((f) => { try { f(); } catch (e) { /* ya limpio */ } }); };
      const indiceEn = (seg) => { let r = 0; inicios.forEach((s, i) => { if (seg >= s) r = i; }); return r; };

      function dibujar(i) {
        limpiar();
        idx = i;
        const e = escenas[i];
        const tipo = e.visual && e.visual.tipo;
        const nodo = (VIS[tipo] || VIS.vacio)(e.visual || {}, e, { limpiar: (f) => limpiezas.push(f), activo: () => jugando });
        visual.replaceChildren(nodo);
        F.entrada(nodo, { dy: 0, dur: 220 });
        chip.textContent = `${e.id} · ${e.seg} s`;
        subs.replaceChildren(...[
          e.sami ? h('p', { class: 'repro__sami' }, 'Sami: «' + e.sami + '»') : null,
          e.voz ? h('p', { class: 'repro__voz' }, e.voz) : null].filter(Boolean));
        desc.replaceChildren(h('strong', {}, `${rotulo} ${e.id}: `), e.descripcion || e.plano || '');
      }

      function refrescar() {
        const i = indiceEn(Math.min(t, total - 0.001));
        if (i !== idx) dibujar(i);
        const r = Math.round(t / total * 1000);
        if (r !== ultimoRango) {
          ultimoRango = r;
          rango.value = String(r);
          rango.style.background = `linear-gradient(90deg, var(--luz-fuerte) ${r / 10}%, rgba(127,127,127,.35) ${r / 10}%)`;
          tiempo.textContent = `${mmss(t)} / ${mmss(total)}`;
        }
      }

      function marcarEstado() {
        raiz.classList.toggle('is-jugando', jugando);
        btn.replaceChildren(icono(jugando ? 'pausa' : 'play'));
        btn.setAttribute('aria-label', jugando ? 'Pausar' : 'Reproducir');
      }
      function tick(now) {
        if (!jugando) return;
        t = (now - tInicio) / 1000;
        if (t >= total) { t = total; refrescar(); terminar(); return; }
        refrescar();
        raf = requestAnimationFrame(tick);
      }
      function reproducir() {
        if (t >= total) t = 0;
        jugando = true;
        tInicio = performance.now() - t * 1000;
        iconoCentro.replaceChildren(icono('play'));
        marcarEstado();
        raf = requestAnimationFrame(tick);
      }
      function pausar() {
        jugando = false;
        cancelAnimationFrame(raf);
        marcarEstado();
      }
      function terminar() {
        pausar();
        iconoCentro.replaceChildren(icono('repetir'));
        centro.setAttribute('aria-label', 'Ver de nuevo');
        raiz.classList.remove('is-jugando');
        if (opts.alTerminar) opts.alTerminar();
      }

      const alternar = () => { if (jugando) pausar(); else { centro.setAttribute('aria-label', 'Reproducir video'); reproducir(); } };
      btn.addEventListener('click', alternar);
      centro.addEventListener('click', alternar);
      rango.addEventListener('input', () => {
        t = (Number(rango.value) / 1000) * total;
        if (jugando) tInicio = performance.now() - t * 1000;
        refrescar();
      });
      const alOcultar = () => { if (document.hidden && jugando) pausar(); };
      document.addEventListener('visibilitychange', alOcultar);

      refrescar();
      marcarEstado();

      return {
        el: raiz,
        reproducir, pausar,
        destruir() {
          pausar();
          limpiar();
          document.removeEventListener('visibilitychange', alOcultar);
        }
      };
    }
  };
})(window.Focalis);
