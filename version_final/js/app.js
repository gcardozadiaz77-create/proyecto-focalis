/* ==========================================================
   FOCALIS · app.js
   Arranque: lee sitio.json, monta la cabecera y el pie, y
   le entrega la página al módulo que corresponde.
   ========================================================== */
(async function () {
  'use strict';
  const F = window.Focalis;
  const id = document.body.dataset.pagina;

  try {
    F.sitio = await F.cargar('sitio.json');
    F.Shell.montar(id);

    if (id === 'inicio') await F.Inicio.montar();
    else if (id === '404') F.Error404.montar();
    else {
      const n = Number(id);
      if (n >= 1 && n <= 4) await F.Motor.iniciar(n);
      else if (n === 5) await F.Pagina5.montar();
      else if (n === 6) await F.Pagina6.montar();
    }
  } catch (err) {
    F.Shell.error(err);
  }
})();
