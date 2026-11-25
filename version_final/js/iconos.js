/* ==========================================================
   FOCALIS · iconos.js
   Iconos de línea (SVG), el personaje Sami y las ilustraciones
   de las escenas. Todo es dibujo propio hecho con formas simples.
   ========================================================== */
(function (F) {
  'use strict';

  const P = {
    linterna: '<path d="M7 3h10l-2 6H9z"/><rect x="9" y="9" width="6" height="12" rx="1.6"/><path d="M12 13v2"/>',
    celular: '<rect x="7" y="2" width="10" height="20" rx="2.6"/><path d="M11 18.5h2"/>',
    campana: '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7z"/><path d="M10 19.5a2 2 0 0 0 4 0"/>',
    silencio: '<path d="M6 9a6 6 0 0 1 9.5-4.8M18 9c0 3 .6 4.8 1.2 5.9M4 16s2-1 2-7"/><path d="M4 16h13"/><path d="M10 19.5a2 2 0 0 0 4 0"/><path d="M3 3l18 18"/>',
    libro: '<path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3z"/><path d="M21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    play: '<path d="M7 4.5l13 7.5-13 7.5z"/>',
    pausa: '<path d="M8 5v14M16 5v14"/>',
    tablero: '<rect x="3" y="4" width="18" height="12" rx="1.6"/><path d="M8 20l2-4M16 20l-2-4"/>',
    ruido: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11"/>',
    luna: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    estrella: '<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 3 1.1-6.2L3 9.7l6.2-.9z"/>',
    'flecha-der': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'flecha-izq': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    mano: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2.6-4.2a1.5 1.5 0 0 1 2.5-1.7L8 14"/>',
    mochila: '<path d="M7 8a5 5 0 0 1 10 0v12H7z"/><path d="M10 3.5h4M9 14h6"/>',
    calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    lapiz: '<path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M14 6l4 4"/>',
    repetir: '<path d="M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5"/>',
    candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    imprimir: '<path d="M7 9V3h10v6"/><path d="M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/>',
    bateria: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/>',
    ojo: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    rayo: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    meta: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
    grafica: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
    microfono: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    menos: '<path d="M5 12h14"/>',
    ayuda: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
    casa: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
    expandir: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    teclado: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    guion: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
    borrar: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'
  };

  F.iconoHTML = function (n, clase) {
    return `<svg class="ico ${clase || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[n] || ''}</svg>`;
  };
  F.icono = function (n, clase) {
    const t = document.createElement('template');
    t.innerHTML = F.iconoHTML(n, clase);
    return t.content.firstChild;
  };

  /* ---------- Sami ----------
     Estudiante protagonista. Dibujo propio, viewBox 56x56. */
  const T = '#2b1a12';
  const CARAS = {
    neutro:      `<circle cx="22.5" cy="26.5" r="1.7" fill="${T}"/><circle cx="33.5" cy="26.5" r="1.7" fill="${T}"/><path d="M24.5 32.5h7" stroke="${T}" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
    curioso:     `<circle cx="22.5" cy="26.5" r="1.8" fill="${T}"/><circle cx="33.5" cy="26.5" r="1.8" fill="${T}"/><path d="M31 21.4q3-2.2 5.4-.4" stroke="${T}" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="28" cy="33" r="1.9" fill="none" stroke="${T}" stroke-width="1.5"/>`,
    preocupado:  `<circle cx="22.5" cy="27" r="1.7" fill="${T}"/><circle cx="33.5" cy="27" r="1.7" fill="${T}"/><path d="M19.5 22.4l5 1.8M36.5 22.4l-5 1.8" stroke="${T}" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M24.5 34.2q3.5-3 7 0" stroke="${T}" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
    indiferente: `<path d="M20.6 26.8h3.8M31.6 26.8h3.8" stroke="${T}" stroke-width="1.8" stroke-linecap="round"/><path d="M24.5 33h7" stroke="${T}" stroke-width="1.6" stroke-linecap="round"/>`,
    alegre:      `<path d="M20.8 27.4q1.7-2.6 3.4 0M31.8 27.4q1.7-2.6 3.4 0" stroke="${T}" stroke-width="1.7" stroke-linecap="round" fill="none"/><path d="M23.4 31.4q4.6 5.2 9.2 0z" fill="${T}"/>`
  };

  F.samiInterior = function (exp) {
    return `<path d="M5 56c0-13 10-19 23-19s23 6 23 19z" fill="#1d7a3e"/>
      <path d="M24 41v7M32 41v7" stroke="#cfeed8" stroke-width="1.6" stroke-linecap="round"/>
      <rect x="24" y="33" width="8" height="8" rx="3" fill="#c98f5e"/>
      <circle cx="28" cy="25" r="13" fill="#e2a874"/>
      <path d="M14.6 24c-1.6-10 5.4-16 13.4-16s15 6 13.4 16c-1.4-5.4-6.6-8-13.4-8s-12 2.6-13.4 8z" fill="${T}"/>
      ${CARAS[exp] || CARAS.neutro}`;
  };

  F.sami = function (exp, tam) {
    const t = document.createElement('template');
    const s = tam || 52;
    t.innerHTML = `<svg viewBox="0 0 56 56" width="${s}" height="${s}" role="img" aria-label="Sami" focusable="false">${F.samiInterior(exp)}</svg>`;
    return t.content.firstChild;
  };

  /* ---------- Ilustraciones de escena ---------- */
  const VIBRA = `<path class="ilu__ondas" d="M254 139q5 6 0 12M260 135q8 10 0 20" fill="none" stroke="#ff5f52" stroke-width="2.4" stroke-linecap="round"/>`;

  const ILU = {
    aula() {
      return `<svg class="ilu" viewBox="0 0 360 220" role="img" aria-label="Sami en su pupitre, entre el tablero y el celular" focusable="false">
        <rect width="360" height="220" fill="#e8f6ec"/>
        <rect y="172" width="360" height="48" fill="#d3e7d8"/>
        <rect x="48" y="12" width="264" height="82" rx="8" fill="#14532d" stroke="#b98a4c" stroke-width="6"/>
        <path d="M72 38h96M72 56h150M72 74h72" stroke="#e8f6ec" stroke-width="3.5" stroke-linecap="round" opacity=".85"/>
        <circle cx="268" cy="53" r="17" fill="none" stroke="#ffd24a" stroke-width="3.5"/>
        <path d="M268 42v22M257 53h22" stroke="#ffd24a" stroke-width="3" stroke-linecap="round"/>
        <svg x="136" y="86" width="88" height="88" viewBox="0 0 56 56">${F.samiInterior('curioso')}</svg>
        <rect x="52" y="152" width="256" height="16" rx="5" fill="#c9a26a"/>
        <rect x="76" y="168" width="9" height="40" rx="2" fill="#9b7a48"/>
        <rect x="275" y="168" width="9" height="40" rx="2" fill="#9b7a48"/>
        <rect x="96" y="141" width="62" height="13" rx="3" fill="#fff" stroke="#c4d6c8" stroke-width="1.5"/>
        <path d="M104 147.5h40" stroke="#a9dcb8" stroke-width="2.4" stroke-linecap="round"/>
        <g class="ilu__cel"><rect x="214" y="136" width="34" height="18" rx="4" fill="#0d1a14"/><rect x="217" y="139" width="28" height="12" rx="2.5" fill="#4aa3ff"/></g>
        ${VIBRA}
      </svg>`;
    },
    casa() {
      return `<svg class="ilu" viewBox="0 0 360 220" role="img" aria-label="Sami haciendo la tarea en casa mientras el celular vibra" focusable="false">
        <rect width="360" height="220" fill="#fff1cf"/>
        <rect y="172" width="360" height="48" fill="#f0dcae"/>
        <rect x="26" y="20" width="96" height="86" rx="8" fill="#b8d9f5" stroke="#b98a4c" stroke-width="6"/>
        <circle cx="94" cy="78" r="17" fill="#ffd24a"/>
        <path d="M74 20v86M26 63h96" stroke="#b98a4c" stroke-width="4"/>
        <path d="M296 40l-10 44h40z" fill="#14532d"/>
        <rect x="304" y="84" width="4" height="62" fill="#5a4630"/>
        <ellipse cx="306" cy="148" rx="16" ry="4" fill="#5a4630"/>
        <circle cx="306" cy="88" r="46" fill="#ffd24a" opacity=".18"/>
        <svg x="136" y="86" width="88" height="88" viewBox="0 0 56 56">${F.samiInterior('preocupado')}</svg>
        <rect x="52" y="152" width="256" height="16" rx="5" fill="#c9a26a"/>
        <rect x="76" y="168" width="9" height="40" rx="2" fill="#9b7a48"/>
        <rect x="275" y="168" width="9" height="40" rx="2" fill="#9b7a48"/>
        <rect x="96" y="141" width="62" height="13" rx="3" fill="#fff" stroke="#c4d6c8" stroke-width="1.5"/>
        <path d="M104 147.5h40M104 151h26" stroke="#a9dcb8" stroke-width="2" stroke-linecap="round"/>
        <g class="ilu__cel"><rect x="214" y="136" width="34" height="18" rx="4" fill="#0d1a14"/><rect x="217" y="139" width="28" height="12" rx="2.5" fill="#4aa3ff"/></g>
        ${VIBRA}
      </svg>`;
    },
    cuaderno() {
      return `<svg class="ilu" viewBox="0 0 360 220" role="img" aria-label="Sami con el cuaderno cerrado y el celular guardado en la mochila" focusable="false">
        <rect width="360" height="220" fill="#e8f6ec"/>
        <rect y="172" width="360" height="48" fill="#d3e7d8"/>
        <svg x="40" y="62" width="110" height="110" viewBox="0 0 56 56">${F.samiInterior('alegre')}</svg>
        <rect x="150" y="124" width="94" height="58" rx="6" fill="#155a2e"/>
        <rect x="150" y="124" width="12" height="58" rx="4" fill="#0f3b1f"/>
        <path d="M184 150l9 9 17-18" fill="none" stroke="#ffd24a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M262 74a34 34 0 0 1 68 0v108h-68z" fill="#2f9a52"/>
        <rect x="272" y="124" width="48" height="36" rx="8" fill="#1d7a3e"/>
        <path d="M284 110h24" stroke="#0f3b1f" stroke-width="5" stroke-linecap="round"/>
        <path d="M262 74a34 34 0 0 1 68 0" fill="none" stroke="#0f3b1f" stroke-width="5"/>
        <rect x="288" y="136" width="16" height="9" rx="2.5" fill="#0d1a14"/>
        <path d="M282 88q14-10 28 0" fill="none" stroke="#ffd24a" stroke-width="3" stroke-linecap="round" opacity=".0"/>
      </svg>`;
    }
  };

  F.ilustracion = function (nombre) {
    const t = document.createElement('template');
    t.innerHTML = (ILU[nombre] || ILU.aula)();
    return t.content.firstChild;
  };

})(window.Focalis);
