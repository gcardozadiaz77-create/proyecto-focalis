/* ==========================================================
   FOCALIS · util.js
   Espacio de nombres global y herramientas compartidas:
   crear elementos, guardar progreso, cargar JSON, animaciones
   de entrada y el "haz" de la linterna.
   ========================================================== */
window.Focalis = window.Focalis || {};

(function (F) {
  'use strict';

  /* ---------- Crear elementos del DOM ----------
     h('button', { class: 'btn', onclick: fn }, 'Texto', otroNodo)
     Los textos entran como nodos de texto (seguro: nada de innerHTML). */
  F.h = function (tag, props, ...hijos) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of hijos.flat(Infinity)) {
      if (c === null || c === undefined || c === false) continue;
      el.append(c.nodeType ? c : document.createTextNode(c));
    }
    return el;
  };

  /* ---------- Almacenamiento seguro ----------
     localStorage puede fallar (modo privado, bloqueado...). Siempre en try/catch
     y con una copia en memoria para que la página funcione igual. */
  const CLAVE = 'focalis.v1';
  let memoria = {};
  function leerTodo() {
    try { return JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { return memoria; }
  }
  function escribirTodo(obj) {
    memoria = obj;
    try { localStorage.setItem(CLAVE, JSON.stringify(obj)); } catch (e) { /* sin almacenamiento */ }
  }
  F.almacen = {
    get(k, def) { const o = leerTodo(); return k in o ? o[k] : def; },
    set(k, v) { const o = leerTodo(); o[k] = v; escribirTodo(o); },
    borrarTodo() { escribirTodo({}); }
  };

  /* Respuestas del estudiante (se reutilizan entre escenas) */
  F.respuestas = {
    leer(clave, def) { return (F.almacen.get('respuestas', {}))[clave] ?? def; },
    guardar(clave, valor) {
      const r = F.almacen.get('respuestas', {});
      r[clave] = valor;
      F.almacen.set('respuestas', r);
    }
  };

  /* Progreso del recorrido */
  F.progreso = {
    total(n, total) {
      const t = F.almacen.get('totales', {});
      if (total != null && t[n] !== total) { t[n] = total; F.almacen.set('totales', t); }
      return t[n] || 0;
    },
    vistas(n) { return (F.almacen.get('vistas', {})[n]) || []; },
    marcar(n, i) {
      const v = F.almacen.get('vistas', {});
      const s = new Set(v[n] || []);
      s.add(i);
      v[n] = [...s];
      F.almacen.set('vistas', v);
    },
    completar(n) {
      const c = F.almacen.get('completas', {});
      c[n] = true;
      F.almacen.set('completas', c);
    },
    completa(n) { return !!(F.almacen.get('completas', {})[n]); }
  };

  /* ---------- Movimiento ---------- */
  F.reducirMovimiento = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Última forma de entrada: las acciones de teclado no se animan
     (se repiten cientos de veces; la animación las vuelve lentas). */
  F.modo = 'puntero';
  addEventListener('keydown', () => { F.modo = 'teclado'; }, true);
  addEventListener('pointerdown', () => { F.modo = 'puntero'; }, true);

  const EASE_OUT = 'cubic-bezier(.23, 1, .32, 1)';

  /* Entrada de un elemento: opacidad + un pequeño desplazamiento. Nunca desde escala 0. */
  F.entrada = function (el, { dx = 0, dy = 10, dur = 260, delay = 0 } = {}) {
    if (!el || !el.animate) return;
    const reducido = F.reducirMovimiento();
    const desde = { opacity: 0, transform: reducido ? 'none' : `translate(${dx}px, ${dy}px)` };
    el.animate([desde, { opacity: 1, transform: 'none' }], {
      duration: dur, delay, easing: EASE_OUT, fill: 'backwards'
    });
  };

  /* Entrada escalonada: retrasos cortos y no uniformes (30-80 ms entre elementos). */
  const ESCALON = [0, 45, 100, 150, 205, 255, 310, 360];
  F.escalonar = function (elementos, opciones) {
    [...elementos].forEach((el, i) => {
      F.entrada(el, { ...(opciones || {}), delay: ESCALON[Math.min(i, ESCALON.length - 1)] });
    });
  };

  F.esperar = (ms) => new Promise((r) => setTimeout(r, ms));
  F.aleatorio = (arr) => arr[Math.floor(Math.random() * arr.length)];
  F.limitar = (v, a, b) => Math.min(b, Math.max(a, v));

  /* Número que sube hasta un valor (para cronómetros y contadores). */
  F.contarHasta = function (el, desde, hasta, ms, formato) {
    const fmt = formato || ((v) => String(Math.round(v)));
    if (F.reducirMovimiento()) { el.textContent = fmt(hasta); return { cancelar() {} }; }
    let raf, t0;
    const paso = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(desde + (hasta - desde) * e);
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return { cancelar() { cancelAnimationFrame(raf); } };
  };

  /* ---------- Cargar JSON ----------
     La ruta es relativa a este archivo (js/ -> ../json/). */
  const BASE_JSON = new URL('../json/', document.currentScript.src).href;
  const BASE_JS = new URL('./', document.currentScript.src).href;

  /* Con doble clic (file://) el navegador bloquea fetch(). Para ese caso existe
     js/datos-offline.js, una copia de los JSON que genera
     herramientas/generar-datos-offline.py. Se carga solo si hace falta. */
  let promesaOffline = null;
  function cargarOffline() {
    if (window.FOCALIS_DATOS) return Promise.resolve(window.FOCALIS_DATOS);
    if (!promesaOffline) {
      promesaOffline = new Promise((ok, mal) => {
        const s = document.createElement('script');
        s.src = BASE_JS + 'datos-offline.js';
        s.onload = () => ok(window.FOCALIS_DATOS || {});
        s.onerror = () => mal(new Error('Sin servidor local y sin datos-offline.js'));
        document.head.append(s);
      });
    }
    return promesaOffline;
  }

  F.cargar = async function (nombre) {
    let r;
    try { r = await fetch(BASE_JSON + nombre); }
    catch (e) {
      try {
        const copia = await cargarOffline();
        if (copia[nombre]) return JSON.parse(JSON.stringify(copia[nombre]));
      } catch (e2) { /* se informa abajo */ }
      const err = new Error('No se pudo leer ' + nombre); err.causa = 'red'; throw err;
    }
    if (!r.ok) { const err = new Error('No se encontró ' + nombre + ' (' + r.status + ')'); err.causa = 'http'; throw err; }
    return r.json();
  };

  /* ---------- El haz de la linterna ----------
     Un círculo con una sombra enorme: lo de dentro se ve, lo de fuera queda a oscuras.
     Se mueve solo con transform (no recalcula el layout). */
  F.crearHaz = function (escenario, diametro) {
    const D = diametro || 170;
    const haz = F.h('div', { class: 'haz', 'aria-hidden': 'true', style: { width: D + 'px', height: D + 'px' } });
    escenario.append(haz);
    let objetivo = null;
    let listo = false;

    function colocar() {
      if (!objetivo || !objetivo.isConnected) return;
      const e = escenario.getBoundingClientRect();
      const o = objetivo.getBoundingClientRect();
      const x = o.left - e.left + o.width / 2 - D / 2;
      const y = o.top - e.top + o.height / 2 - D / 2;
      haz.style.transform = `translate(${x}px, ${y}px)`;
      if (!listo) { listo = true; requestAnimationFrame(() => requestAnimationFrame(() => haz.classList.add('is-listo'))); }
    }
    const ro = 'ResizeObserver' in window ? new ResizeObserver(colocar) : null;
    if (ro) ro.observe(escenario);

    return {
      el: haz,
      mover(el) { objetivo = el; colocar(); },
      apagar(on) { haz.classList.toggle('is-apagado', !!on); },
      destruir() { if (ro) ro.disconnect(); haz.remove(); }
    };
  };

})(window.Focalis);
