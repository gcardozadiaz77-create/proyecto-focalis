/* ==========================================================
   FOCALIS · escenas-p2.js  ·  Página 2: Qué hábitos dañan tu concentración
   Tipos: notificaciones · feed · lectura · multitarea · comparar
   (la 2.6 usa el tipo "multiple" de escenas-comunes.js)
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;

  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;
  function vibrar(el) {
    el.classList.remove('is-vibra');
    void el.offsetWidth;            // reinicia la animación aunque se repita rápido
    el.classList.add('is-vibra');
  }

  /* ---------- 2.1 Solo iba a mirar un segundo ---------- */
  F.registrarEscena('notificaciones', (esc, ctx) => {
    const d = esc.interaccion;
    const previa = ctx.leer('notif-' + esc.id, null);

    const lista = h('ul', { class: 'notif__lista', 'aria-label': 'Notificaciones nuevas' });
    const contador = h('p', { class: 'notif__cuenta' }, '0:01');
    const feed = h('div', { class: 'notif__feed', hidden: true },
      h('p', { class: 'notif__feedtit' }, 'Un video… y otro…'),
      contador,
      h('p', { class: 'notif__cuenta-et' }, 'Tiempo mirando'));
    const pantalla = h('div', { class: 'telefono__pantalla notif' },
      h('div', { class: 'telefono__barra' }, h('span', {}, 'Clase de hoy'), h('span', {}, '10:42')),
      lista, feed);
    const tel = h('div', { class: 'telefono telefono--grande' }, pantalla);

    const boton = h('button', { type: 'button', class: 'btn btn--luz', disabled: true }, icono('campana'), d.boton);
    const pregunta = h('div', { class: 'notif__pregunta', hidden: !previa });

    function mostrarPregunta() {
      pregunta.hidden = false;
      F.entrada(pregunta, { dy: 8 });
    }

    pregunta.append(F.grupoOpciones(d.opciones, {
      clase: 'opciones opciones--fila', etiqueta: esc.texto, previa,
      alElegir(o, usuario) {
        if (usuario) ctx.guardar('notif-' + esc.id, o.id);
        ctx.resultado(d.respuesta);
      }
    }));

    ctx.alMontar(() => {
      d.notificaciones.forEach((n, i) => ctx.espera(() => {
        const li = h('li', { class: 'notif' }, h('span', { class: 'notif__app' }, n.app), h('span', { class: 'notif__texto' }, n.texto));
        lista.append(li);
        F.entrada(li, { dy: -12, dur: 240 });
        vibrar(tel);
        if (i === d.notificaciones.length - 1) boton.disabled = false;
      }, 450 + i * 900));
    });

    boton.addEventListener('click', () => {
      boton.disabled = true;
      lista.hidden = true;
      feed.hidden = false;
      F.entrada(feed, { dy: 8 });
      const c = F.contarHasta(contador, 1, 600, 2600, mmss);
      ctx.limpiar(() => c.cancelar());
      ctx.espera(mostrarPregunta, F.reducirMovimiento() ? 0 : 2800);
    });

    return h('div', { class: 'celular-escena' }, tel, boton, pregunta);
  });

  /* ---------- 2.2 Un feed sin final ---------- */
  F.registrarEscena('feed', (esc, ctx) => {
    const d = esc.interaccion;
    const COLORES = [['#ff2d95', '#7b2cff'], ['#ff9a3c', '#ff3c6e'], ['#27e0ff', '#2a5cff'],
      ['#34d399', '#0f766e'], ['#ffd24a', '#ff7a3c'], ['#b86bff', '#2c2cff']];
    const feed = h('div', {
      class: 'feed', tabindex: '0', role: 'region',
      'aria-label': 'Feed de videos. Se desliza con el dedo, la rueda o el botón Siguiente video.'
    });
    const cuenta = h('p', { class: 'feed__cuenta', 'aria-live': 'off' }, 'Videos vistos: 1');
    let creados = 0;
    let maximo = 1;
    let completado = false;

    function agregar(k) {
      for (let i = 0; i < k; i++) {
        const idx = creados++;
        const [a, b] = COLORES[idx % COLORES.length];
        feed.append(h('article', { class: 'feed__item', style: { background: `linear-gradient(160deg, ${a}, ${b})` } },
          h('div', { class: 'feed__reproduce' }, icono('play')),
          h('p', { class: 'feed__titulo' }, d.titulos[idx % d.titulos.length]),
          h('div', { class: 'feed__barra' }, h('span'))));
      }
    }
    agregar(4);

    const pantalla = h('div', { class: 'telefono__pantalla feedpant' }, feed);
    const tel = h('div', { class: 'telefono telefono--grande' }, pantalla);

    function medir() { feed.style.setProperty('--alto', feed.clientHeight + 'px'); }
    function alScroll() {
      const alto = feed.clientHeight || 1;
      if (feed.scrollTop + alto * 2.4 > feed.scrollHeight) agregar(3);
      const vistos = Math.floor((feed.scrollTop + alto * 0.6) / alto) + 1;
      if (vistos > maximo) {
        maximo = vistos;
        cuenta.textContent = `Videos vistos: ${maximo}`;
        if (!completado && maximo >= d.meta) { completado = true; ctx.resultado(d.alCompletar); }
      }
    }
    feed.addEventListener('scroll', alScroll, { passive: true });

    const siguienteVideo = h('button', { type: 'button', class: 'btn btn--luz' }, icono('flecha-der'), 'Siguiente video');
    siguienteVideo.addEventListener('click', () => {
      feed.scrollBy({ top: feed.clientHeight, behavior: F.reducirMovimiento() ? 'auto' : 'smooth' });
    });
    const volver = h('button', { type: 'button', class: 'btn btn--claro' }, icono('tablero'), d.botonVolver);
    volver.addEventListener('click', () => {
      vibrar(tel);
      ctx.resultado(d.alVolver, 'pista');
      ctx.espera(() => feed.scrollBy({ top: feed.clientHeight, behavior: F.reducirMovimiento() ? 'auto' : 'smooth' }), 520);
    });

    ctx.alMontar(() => {
      medir();
      if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(medir);
        ro.observe(feed);
        ctx.limpiar(() => ro.disconnect());
      }
    });

    return h('div', { class: 'feed-escena' }, tel, cuenta,
      h('div', { class: 'feed__datos' }, siguienteVideo, volver));
  });

  /* ---------- 2.3 Léelo hasta el final ---------- */
  F.registrarEscena('lectura', (esc, ctx) => {
    const d = esc.interaccion;
    const palabras = d.frase.split(' ');
    const spans = palabras.map((p, i) => h('span', { class: 'lectura__pal' }, p + (i < palabras.length - 1 ? ' ' : '')));
    let leidas = 0;
    let intento = 0;
    let reinicios = 0;
    let bloqueado = false;
    let silencio = false;

    const estado = h('p', { class: 'lectura__estado', 'aria-live': 'polite' }, 'Lee palabra por palabra con el botón.');
    const aviso = h('div', { class: 'lectura__aviso', role: 'status', hidden: true });
    const libro = h('div', { class: 'lectura__libro' }, h('p', { class: 'lectura__texto' }, spans), aviso);
    const boton = h('button', { type: 'button', class: 'btn btn--luz' }, icono('libro'), d.boton);
    const interruptor = h('button', { type: 'button', class: 'interruptor', role: 'switch', 'aria-checked': 'false' },
      h('span', { class: 'interruptor__pista' }, h('span', { class: 'interruptor__bola' })),
      'Avisos en silencio');

    function vaciar() {
      spans.forEach((s) => s.classList.remove('is-leida'));
      leidas = 0;
    }
    function interrumpir() {
      bloqueado = true;
      reinicios++;
      aviso.textContent = d.avisos[intento % d.avisos.length];
      aviso.hidden = false;
      F.entrada(aviso, { dy: -10, dur: 220 });
      vibrar(libro);
      estado.textContent = 'Un aviso te cortó la lectura. Hay que empezar la frase otra vez.';
      ctx.espera(() => {
        aviso.hidden = true;
        vaciar();
        intento++;
        bloqueado = false;
        if (reinicios >= 3 && !silencio) {
          ctx.resultado('Pista: silencia los avisos y vuelve a intentarlo.', 'pista');
        }
      }, 1300);
    }

    boton.addEventListener('click', () => {
      if (bloqueado) return;
      if (leidas >= spans.length) { vaciar(); estado.textContent = 'Otra vez desde el principio.'; return; }
      spans[leidas].classList.add('is-leida');
      leidas++;
      const corte = d.interrupciones[intento % d.interrupciones.length];
      if (!silencio && leidas === corte && leidas < spans.length) { interrumpir(); return; }
      if (leidas === spans.length) {
        estado.textContent = reinicios
          ? `Terminaste la frase… después de empezarla ${reinicios + 1} veces.`
          : 'Terminaste la frase de corrido.';
        boton.lastChild.textContent = 'Leer otra vez';
        if (silencio) ctx.resultado(d.alCompletar);
      }
    });

    interruptor.addEventListener('click', () => {
      silencio = !silencio;
      interruptor.setAttribute('aria-checked', String(silencio));
      if (silencio) { vaciar(); boton.lastChild.textContent = d.boton; estado.textContent = 'Avisos en silencio. Intenta de nuevo.'; ctx.resultado(null); }
    });

    return h('div', { class: 'lectura' }, libro, estado,
      h('div', { class: 'lectura__acciones' }, boton, interruptor));
  });

  /* ---------- 2.4 Dos cosas a la vez ---------- */
  F.registrarEscena('multitarea', (esc, ctx) => {
    const d = esc.interaccion;
    const palabras = d.copia.split(' ');
    const copia = h('p', { class: 'multi__copia' }, 'Tu cuaderno está vacío.');
    const chat = h('ul', { class: 'multi__chat', 'aria-hidden': 'true' });
    const nota = h('p', { class: 'multi__nota', 'aria-live': 'polite' });
    const boton = h('button', { type: 'button', class: 'btn btn--luz' }, icono('lapiz'), 'Copiar y chatear a la vez');
    let corriendo = false;

    boton.addEventListener('click', () => {
      if (corriendo) return;
      corriendo = true;
      boton.disabled = true;
      copia.replaceChildren();
      chat.replaceChildren();
      nota.textContent = '';
      const reducido = F.reducirMovimiento();
      palabras.forEach((p, k) => {
        const hueco = k % 3 === 2;                    // cada tercera palabra se escapa
        ctx.espera(() => {
          const li = h('li', { class: 'multi__burbuja' }, d.chat[k % d.chat.length]);
          chat.append(li);
          if (!reducido) F.entrada(li, { dy: 6, dur: 200 });
        }, reducido ? 0 : k * 650);
        ctx.espera(() => {
          copia.append(hueco ? h('span', { class: 'multi__hueco' }, '···') : p, ' ');
        }, reducido ? 0 : k * 650 + 320);
      });
      ctx.espera(() => {
        nota.textContent = 'Las palabras con subrayado rojo se te escaparon.';
        boton.disabled = false;
        boton.lastChild.textContent = 'Probar otra vez';
        corriendo = false;
      }, reducido ? 0 : palabras.length * 650 + 400);
    });

    const opciones = F.grupoOpciones(d.opciones, {
      clase: 'opciones opciones--fila', etiqueta: esc.texto,
      previa: ctx.leer('multitarea', null),
      alElegir(o, usuario) {
        if (usuario) ctx.guardar('multitarea', o.id);
        ctx.resultado(d.respuesta);
      }
    });

    return h('div', { class: 'multi' },
      h('div', { class: 'multi__paneles' },
        h('div', { class: 'multi__panel' }, h('p', { class: 'multi__tit' }, 'Tu cuaderno (copiar el tablero)'), copia),
        h('div', { class: 'multi__panel' }, h('p', { class: 'multi__tit' }, 'El chat'), chat)),
      h('div', { class: 'multi__acciones' }, boton, nota),
      h('p', { class: 'etiqueta-grupo' }, esc.texto),
      opciones);
  });

  /* ---------- 2.5 Compites contra algo muy bien diseñado ---------- */
  F.registrarEscena('comparar', (esc, ctx) => {
    const d = esc.interaccion;
    let actual = null;
    let cambios = 0;

    function pantalla(cfg, clase, decor) {
      return h('button', { type: 'button', class: 'pantalla ' + clase, 'aria-pressed': 'false' },
        h('span', { class: 'pantalla__fondo', 'aria-hidden': 'true' }, decor),
        h('span', { class: 'pantalla__icono' }, icono(cfg.icono)),
        h('span', { class: 'pantalla__tit' }, cfg.titulo),
        h('span', { class: 'pantalla__det' }, cfg.detalle));
    }
    const izq = pantalla(d.izquierda, 'pantalla--calma', [1, 2, 3].map(() => h('span', { class: 'linea' })));
    const der = pantalla(d.derecha, 'pantalla--rapida', [1, 2, 3].map(() => h('span', { class: 'rebota' })));

    const sami = h('div', { class: 'comparar__sami' }, F.sami('neutro', 48));
    const pista = h('div', { class: 'comparar__pista' }, sami);
    const cuenta = h('p', { class: 'comparar__cuenta', 'aria-live': 'polite' }, 'Cambios de mirada: 0');

    function mirar(lado) {
      if (lado === actual) return;
      if (actual !== null) cambios++;
      actual = lado;
      izq.setAttribute('aria-pressed', String(lado === 'izq'));
      der.setAttribute('aria-pressed', String(lado === 'der'));
      const dx = (pista.clientWidth / 4) * (lado === 'izq' ? -1 : 1);
      sami.style.transform = `translateX(${dx}px)`;
      sami.replaceChildren(F.sami(lado === 'izq' ? 'neutro' : 'curioso', 48));
      cuenta.textContent = `Cambios de mirada: ${cambios}`;
      if (cambios >= 3) ctx.resultado(d.alMirar, 'pista');
    }
    izq.addEventListener('click', () => mirar('izq'));
    der.addEventListener('click', () => mirar('der'));

    return h('div', { class: 'comparar' },
      h('div', { class: 'comparar__pantallas' }, izq, der), pista, cuenta);
  });

})(window.Focalis);
