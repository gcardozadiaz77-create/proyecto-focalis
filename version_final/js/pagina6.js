/* ==========================================================
   FOCALIS · pagina6.js  ·  Página 6: Cómo hacer listas de objetivos
   Tres plantillas que se pueden llenar, descargar e imprimir.
   Lo que escribes se guarda solo en este navegador.
   ========================================================== */
(function (F) {
  'use strict';
  const { h, icono } = F;
  const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  F.Pagina6 = {
    async montar() {
      const d = await F.cargar('pagina6.json');
      const raiz = document.getElementById('recorrido');
      const inicio = F.sitio.paginas[0];
      F.progreso.total(6, 2);
      F.progreso.marcar(6, 0);

      const panelesPorId = {};
      const tabs = d.plantillas.map((p, i) => {
        const t = h('button', {
          type: 'button', class: 'pestana', role: 'tab',
          id: 'tab-' + p.id, 'aria-controls': 'panel-' + p.id,
          'aria-selected': 'false', tabindex: '-1'
        }, icono(p.icono), `${p.numero}. ${p.titulo}`);
        t.addEventListener('click', () => elegir(i));
        t.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') { elegir((i + 1) % d.plantillas.length); tabs[(i + 1) % d.plantillas.length].focus(); }
          if (e.key === 'ArrowLeft') { elegir((i - 1 + d.plantillas.length) % d.plantillas.length); tabs[(i - 1 + d.plantillas.length) % d.plantillas.length].focus(); }
        });
        return t;
      });

      function elegir(i) {
        tabs.forEach((t, j) => {
          t.setAttribute('aria-selected', String(j === i));
          t.tabIndex = j === i ? 0 : -1;
        });
        d.plantillas.forEach((p, j) => {
          const el = panelesPorId[p.id];
          const eraOculto = el.hidden;
          el.hidden = j !== i;
          if (j === i && eraOculto) F.entrada(el, { dy: 8 });
        });
      }

      /* ---- Una plantilla ---- */
      function construir(p) {
        const clave = 'plantilla-' + p.id;
        const valores = F.respuestas.leer(clave, {});
        const estado = h('p', { class: 'plantilla__estado', 'aria-live': 'polite' });
        let temporizador = 0;

        function guardar() {
          F.respuestas.guardar(clave, valores);
          estado.textContent = 'Guardado en este navegador.';
          clearTimeout(temporizador);
          temporizador = setTimeout(() => { estado.textContent = ''; }, 2200);
          F.progreso.completar(6);
        }

        const resumenReto = h('p', { class: 'resumen-reto', hidden: true, 'aria-live': 'polite' });
        function actualizarResumen() {
          if (p.id !== 'reto') return;
          const reg = (valores.registro || []).filter((x) => x !== '' && x !== undefined);
          if (reg.length >= 2) {
            resumenReto.hidden = false;
            resumenReto.textContent = `Empezaste con ${reg[0]} y vas en ${reg[reg.length - 1]} bloques sin mirar el celular.`;
          } else resumenReto.hidden = true;
        }

        function campo(c) {
          const id = `${p.id}-${c.id}`;
          if (c.tipo === 'check') {
            const i = h('input', { type: 'checkbox', id });
            i.checked = !!valores[c.id];
            i.addEventListener('change', () => { valores[c.id] = i.checked; guardar(); });
            return h('div', { class: 'fld' }, h('label', { class: 'fld__marca', for: id }, i, c.etiqueta));
          }
          if (c.tipo === 'registro') {
            const arr = valores[c.id] || c.dias.map(() => '');
            valores[c.id] = arr;
            return h('div', { class: 'fld' },
              h('p', { class: 'fld__et' }, c.etiqueta),
              h('div', { class: 'registro' }, c.dias.map((dia, k) => {
                const i = h('input', { type: 'text', class: 'campo', inputmode: 'numeric', maxlength: '2', id: `${id}-${k}`, value: arr[k] || '' });
                i.addEventListener('input', () => { arr[k] = i.value.replace(/\D/g, ''); i.value = arr[k]; guardar(); actualizarResumen(); });
                return h('label', { for: `${id}-${k}` }, dia.slice(0, 3), i);
              })));
          }
          const i = h('input', { type: 'text', class: 'campo', id, maxlength: '140', placeholder: c.ayuda || '', value: valores[c.id] || '' });
          i.addEventListener('input', () => { valores[c.id] = i.value; guardar(); });
          if (c.tipo === 'paso') {
            const sel = h('select', { class: 'campo', 'aria-label': `Día del ${c.etiqueta.toLowerCase()}` },
              h('option', { value: '' }, 'Día…'),
              DIAS.map((x) => h('option', { value: x }, x)));
            sel.value = valores[c.id + '_dia'] || '';
            sel.addEventListener('change', () => { valores[c.id + '_dia'] = sel.value; guardar(); });
            return h('div', { class: 'fld' }, h('label', { for: id }, c.etiqueta), h('div', { class: 'fld__paso' }, i, sel));
          }
          return h('div', { class: 'fld' }, h('label', { for: id }, c.etiqueta), i,
            c.ayuda ? h('span', { class: 'fld__ayuda' }, c.ayuda) : null);
        }

        /* Ejemplo de Sami (solo lectura) */
        function campoEjemplo(c) {
          const id = `ej-${p.id}-${c.id}`;
          if (c.tipo === 'check') {
            const i = h('input', { type: 'checkbox', id, disabled: true });
            i.checked = !!c.ejemplo;
            return h('div', { class: 'fld' }, h('label', { class: 'fld__marca', for: id }, i, c.etiqueta));
          }
          if (c.tipo === 'registro') {
            return h('div', { class: 'fld' }, h('p', { class: 'fld__et' }, c.etiqueta),
              h('div', { class: 'registro' }, c.dias.map((dia, k) =>
                h('label', {}, dia.slice(0, 3), h('input', { type: 'text', class: 'campo', disabled: true, value: c.ejemplo[k] || '' })))));
          }
          const i = h('input', { type: 'text', class: 'campo', id, disabled: true, value: c.ejemplo });
          if (c.tipo === 'paso') {
            const sel = h('select', { class: 'campo', disabled: true, 'aria-label': 'Día del paso' }, h('option', {}, c.dia));
            return h('div', { class: 'fld' }, h('label', { for: id }, c.etiqueta), h('div', { class: 'fld__paso' }, i, sel));
          }
          return h('div', { class: 'fld' }, h('label', { for: id }, c.etiqueta), i);
        }

        /* Texto para descargar */
        function comoTexto() {
          const lineas = [`FOCALIS · ${p.titulo}`, ''];
          p.campos.forEach((c) => {
            if (c.tipo === 'check') lineas.push(`${c.etiqueta}: ${valores[c.id] ? 'sí' : 'no'}`);
            else if (c.tipo === 'registro') {
              lineas.push(c.etiqueta + ':');
              c.dias.forEach((dia, k) => lineas.push(`  ${dia}: ${(valores[c.id] || [])[k] || '-'}`));
            } else if (c.tipo === 'paso') lineas.push(`${c.etiqueta}: ${valores[c.id] || '-'} (${valores[c.id + '_dia'] || 'sin día'})`);
            else lineas.push(`${c.etiqueta}: ${valores[c.id] || '-'}`);
          });
          return lineas.join('\n') + '\n';
        }

        const descargar = h('button', { type: 'button', class: 'btn btn--luz btn--chico' }, icono('guion'), 'Descargar (.txt)');
        descargar.addEventListener('click', () => {
          const url = URL.createObjectURL(new Blob([comoTexto()], { type: 'text/plain;charset=utf-8' }));
          const a = h('a', { href: url, download: `focalis-${p.id}.txt` });
          document.body.append(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
        const imprimir = h('button', { type: 'button', class: 'btn btn--claro btn--chico' }, icono('imprimir'), 'Imprimir');
        imprimir.addEventListener('click', () => window.print());
        const borrar = h('button', { type: 'button', class: 'btn btn--claro btn--chico' }, icono('borrar'), 'Borrar lo que escribí');
        borrar.addEventListener('click', () => {
          if (!confirm('¿Borrar lo que escribiste en esta plantilla?')) return;
          F.respuestas.guardar(clave, {});
          panelesPorId[p.id].replaceWith(construirYRegistrar(p));
          elegir(d.plantillas.indexOf(p));
        });

        const panel = h('div', { class: 'plantilla', role: 'tabpanel', id: 'panel-' + p.id, 'aria-labelledby': 'tab-' + p.id, hidden: true },
          h('ol', { class: 'plantilla__pasos' }, p.instrucciones.map((t) => h('li', {}, t))),
          h('div', { class: 'plantilla__cols' },
            h('section', { class: 'hoja-plantilla', 'aria-label': 'Tu plantilla' },
              h('p', { class: 'hoja-plantilla__tit' }, icono('lapiz'), 'Tu plantilla'),
              p.campos.map(campo), resumenReto,
              h('div', { class: 'plantilla__acciones' }, descargar, imprimir, borrar),
              estado),
            h('section', { class: 'hoja-plantilla hoja-plantilla--ejemplo', 'aria-label': p.autor },
              h('p', { class: 'hoja-plantilla__tit' }, icono('estrella'), p.autor),
              p.campos.map(campoEjemplo))));
        actualizarResumen();
        return panel;
      }

      function construirYRegistrar(p) {
        const el = construir(p);
        panelesPorId[p.id] = el;
        return el;
      }
      const paneles = d.plantillas.map(construirYRegistrar);

      const voz = h('div', { class: 'voz' },
        h('div', { class: 'voz__narradora' },
          h('span', { class: 'voz__etiqueta' }, icono('microfono'), 'Voz narradora'),
          h('p', {}, d.intro.narracion)),
        h('div', { class: 'voz__guion' }, h('p', {}, h('strong', {}, 'Escena: '), d.intro.escenario)));

      const panel = h('article', { class: 'panel', 'aria-labelledby': 'esc-6-1' },
        h('header', { class: 'escena__cab' },
          h('span', { class: 'escena__id' }, d.intro.id + ' a 6.4'),
          h('h2', { id: 'esc-6-1', class: 'escena__titulo' }, 'Arma tus propias metas')),
        voz,
        h('div', { class: 'plantillas__tabs', role: 'tablist', 'aria-label': 'Plantillas' }, tabs),
        paneles);

      const cierre = h('article', { class: 'panel cierre', 'aria-labelledby': 'esc-6-5' },
        h('header', { class: 'escena__cab' },
          h('span', { class: 'escena__id' }, d.cierre.id),
          h('h2', { id: 'esc-6-5', class: 'escena__titulo' }, 'Empieza hoy')),
        h('div', { class: 'voz__narradora' },
          h('span', { class: 'voz__etiqueta' }, icono('microfono'), 'Voz narradora'),
          h('p', {}, d.cierre.narracion)),
        h('p', { class: 'voz__pantalla' },
          h('span', { class: 'voz__etiqueta voz__etiqueta--pantalla' }, 'En pantalla'), d.cierre.texto),
        h('div', { class: 'cierre__acciones' },
          h('a', { class: 'btn btn--luz btn--grande', href: 'inicio.html', onclick: () => F.progreso.completar(6) }, icono('casa'), 'Volver al inicio'),
          h('a', { class: 'btn btn--claro btn--grande', href: inicio.archivo }, 'Repasar desde la página 1')));

      raiz.replaceChildren(h('div', { class: 'contenedor' }, panel, cierre));
      elegir(0);
    }
  };
})(window.Focalis);
