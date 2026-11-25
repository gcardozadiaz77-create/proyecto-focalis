/* ==========================================================
   FOCALIS · motor.js
   Motor de recorrido: lee las escenas de paginaN.json y las
   muestra una a una. Cada "tipo" de escena (linterna, clasificar,
   feed...) se registra desde escenas-pN.js con F.registrarEscena().

   Decisiones de movimiento:
   - La salida es más rápida (150 ms) que la entrada (240 ms).
   - Con teclado (flechas) el cambio es instantáneo: se repite mucho.
   - Se puede interrumpir: un clic rápido cancela la animación anterior.
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;
  const REGISTRO = {};
  const EASE = 'cubic-bezier(.23, 1, .32, 1)';

  F.registrarEscena = function (tipo, fn) { REGISTRO[tipo] = fn; };

  function dialogoSami(esc, texto) {
    return h('div', { class: 'dialogo' },
      h('div', { class: 'dialogo__avatar' }, F.sami(esc.expresion || 'neutro', 52)),
      h('div', { class: 'dialogo__burbuja' },
        h('span', { class: 'dialogo__quien' }, 'Sami'),
        '«' + (texto || esc.sami) + '»'));
  }

  F.Motor = {
    async iniciar(n) {
      const datos = await F.cargar(`pagina${n}.json`);
      const escenas = datos.escenas;
      const total = escenas.length;
      const siguiente = F.sitio.paginas.find((p) => p.n === n + 1);
      F.progreso.total(n, total);

      const raiz = document.getElementById('recorrido');
      const barra = h('ol', { class: 'progreso', 'aria-label': 'Escenas de esta página' });
      const cuerpo = h('div', { class: 'escena-contenedor' });
      const anunciar = h('p', { class: 'sr-only', 'aria-live': 'polite' });
      const btnAnt = h('button', { type: 'button', class: 'btn btn--claro' }, icono('flecha-izq'), 'Anterior');
      const btnSig = h('button', { type: 'button', class: 'btn btn--luz' });
      const cuenta = h('span', { class: 'controles__cuenta' });

      const pasos = escenas.map((esc, i) => {
        const b = h('button', {
          type: 'button', class: 'progreso__paso',
          'aria-label': `Ir a la escena ${esc.id}: ${esc.titulo}`,
          onclick: () => irA(i)
        });
        barra.append(h('li', {}, b));
        return b;
      });

      raiz.replaceChildren(
        h('div', { class: 'contenedor' },
          barra, cuerpo,
          h('div', { class: 'controles' }, btnAnt, cuenta, btnSig),
          anunciar));

      let idx = -1;
      let token = 0;
      const limpiezas = [];
      const limpiar = () => { limpiezas.splice(0).forEach((f) => { try { f(); } catch (e) { /* ya limpio */ } }); };

      /* Construye una escena: encabezado, escenario (la interacción) y voz. */
      function construir(esc, i) {
        const montar = [];
        const escenario = h('div', { class: 'escenario escenario--' + esc.tipo });
        const resultado = h('div', { class: 'voz__resultado', role: 'status', hidden: true });
        const samiSlot = h('div', { class: 'voz__sami' });
        const voz = h('div', { class: 'voz' });

        if (esc.narracion) {
          voz.append(h('div', { class: 'voz__narradora' },
            h('span', { class: 'voz__etiqueta' }, icono('microfono'), 'Voz narradora'),
            h('p', {}, esc.narracion)));
        }
        if (esc.sami && !esc.samiDiferido) samiSlot.append(dialogoSami(esc));
        voz.append(samiSlot);
        if (esc.texto) {
          voz.append(h('p', { class: 'voz__pantalla' },
            h('span', { class: 'voz__etiqueta voz__etiqueta--pantalla' }, 'En pantalla'), esc.texto));
        }
        voz.append(resultado);
        voz.append(h('div', { class: 'voz__guion' },
          h('p', {}, h('strong', {}, 'Escena: '), esc.escenario),
          h('p', {}, h('strong', {}, 'Intención: '), esc.intencion)));

        const ctx = {
          esc, n, indice: i,
          instantaneo: F.modo === 'teclado' || F.reducirMovimiento(),
          limpiar: (fn) => { limpiezas.push(fn); },
          espera(fn, ms) { const t = setTimeout(fn, ms); limpiezas.push(() => clearTimeout(t)); return t; },
          alMontar: (fn) => { montar.push(fn); },
          guardar: F.respuestas.guardar,
          leer: F.respuestas.leer,
          siguiente: () => irA(idx + 1),
          mostrarSami(texto) {
            if (samiSlot.childElementCount) return;
            samiSlot.append(dialogoSami(esc, texto));
            F.entrada(samiSlot.firstChild, { dy: 8, dur: 240 });
          },
          resultado(contenido, tono) {
            if (contenido === null || contenido === undefined) {
              resultado.hidden = true;
              resultado.replaceChildren();
              return;
            }
            const estabaOculto = resultado.hidden;
            resultado.hidden = false;
            resultado.dataset.tono = tono || 'ok';
            resultado.replaceChildren(
              icono(tono === 'pista' ? 'linterna' : 'check'),
              h('p', {}, contenido));
            F.entrada(resultado, { dy: estabaOculto ? 8 : 4, dur: estabaOculto ? 240 : 160 });
          }
        };

        const render = REGISTRO[esc.tipo];
        try {
          if (!render) throw new Error('No existe el tipo de escena «' + esc.tipo + '»');
          const nodo = render(esc, ctx);
          if (nodo) escenario.append(nodo);
        } catch (err) {
          console.error(err);
          escenario.append(h('p', { class: 'aviso' }, 'Esta escena no se pudo mostrar. ', err.message));
        }

        const art = h('article', { class: 'escena escena--' + esc.tipo, 'aria-labelledby': 'esc-' + esc.id.replace('.', '-') },
          h('header', { class: 'escena__cab' },
            h('span', { class: 'escena__id' }, esc.id),
            h('h2', { id: 'esc-' + esc.id.replace('.', '-'), class: 'escena__titulo' }, esc.titulo)),
          h('div', { class: 'escena__cuerpo' }, escenario, voz));
        art._montar = montar;
        art._voz = voz;
        return art;
      }

      async function irA(nuevo, { sinAnim } = {}) {
        if (nuevo < 0 || nuevo >= total || nuevo === idx) return;
        const dir = nuevo > idx ? 1 : -1;
        const t = ++token;
        const instantaneo = sinAnim || F.modo === 'teclado' || F.reducirMovimiento();
        limpiar();

        const viejo = cuerpo.firstElementChild;
        if (viejo && !instantaneo) {
          viejo.getAnimations().forEach((a) => a.cancel());
          const salida = viejo.animate(
            [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-dir * 14}px)` }],
            { duration: 150, easing: EASE, fill: 'forwards' });
          try { await salida.finished; } catch (e) { return; }
          if (t !== token) return;
        }

        idx = nuevo;
        const esc = escenas[idx];
        const art = construir(esc, idx);
        cuerpo.replaceChildren(art);

        if (!instantaneo) {
          art.animate(
            [{ opacity: 0, transform: `translateX(${dir * 20}px)` }, { opacity: 1, transform: 'none' }],
            { duration: 240, easing: EASE });
          F.escalonar(art._voz.children, { dy: 8, dur: 240 });
        }
        requestAnimationFrame(() => art._montar.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } }));

        /* Progreso y controles */
        F.progreso.marcar(n, idx);
        if (idx === total - 1) F.progreso.completar(n);
        const vistas = new Set(F.progreso.vistas(n));
        pasos.forEach((b, i) => {
          b.classList.toggle('is-vista', vistas.has(i));
          b.classList.toggle('is-actual', i === idx);
          if (i === idx) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
        });
        btnAnt.disabled = idx === 0;
        cuenta.textContent = `Escena ${idx + 1} de ${total}`;
        btnSig.replaceChildren();
        if (idx < total - 1) btnSig.append('Siguiente', icono('flecha-der'));
        else if (siguiente) btnSig.append(`Página ${siguiente.n}: ${siguiente.corto}`, icono('flecha-der'));
        else btnSig.append('Terminar', icono('check'));
        anunciar.textContent = `Escena ${esc.id}: ${esc.titulo}`;

        /* Si la escena nueva quedó por encima de lo visible, acercar el recorrido */
        const arriba = raiz.getBoundingClientRect().top;
        if (arriba < 0) raiz.scrollIntoView({ block: 'start', behavior: instantaneo ? 'auto' : 'smooth' });
      }

      btnAnt.addEventListener('click', () => irA(idx - 1));
      btnSig.addEventListener('click', () => {
        if (idx < total - 1) irA(idx + 1);
        else if (siguiente) location.href = siguiente.archivo;
      });

      /* Flechas del teclado: cambio instantáneo, salvo si se escribe en un campo */
      document.addEventListener('keydown', (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        const t = e.target;
        if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
        if (e.key === 'ArrowRight') irA(idx + 1);
        else if (e.key === 'ArrowLeft') irA(idx - 1);
      });

      await irA(0, { sinAnim: true });
    }
  };
})(window.Focalis);
