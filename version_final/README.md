# FOCALIS · Recupera tu atención

Sitio educativo multimedia (grados 8.º a 11.º) · Universidad de Córdoba · Producción Multimedia · Grupo 2.
Autores: Gabriel Cardoza, Cristian Ibañez, Carlos Hernández, Daniel Peluffo.

## Cómo abrirlo
- **Más fácil:** doble clic en `index.html` (funciona sin servidor gracias a `js/datos-offline.js`).
- **Con servidor (recomendado para editar):** en esta carpeta ejecuta `python -m http.server 8000` y abre http://localhost:8000
  (o usa la extensión Live Server de VS Code).

## Estructura
| Carpeta | Contenido |
| --- | --- |
| `html/` | Páginas: `inicio`, `pagina1` … `pagina6`, `404`. Son carcasas delgadas; el contenido viene del JSON. |
| `css/` | `base`, `layout`, `componentes`, `escenas`, `paginas`. |
| `js/` | `util` (helpers `Focalis.*`), `shell`, `motor` (motor de escenas), `escenas-comunes`, `escenas-p1…p4`, `reproductor`, `pagina5`, `pagina6`, `inicio`, `error404`, `app`. |
| `json/` | `sitio.json` (marca, equipo, ruta, video de presentación) y `pagina1…6.json` (escenas y textos). |
| `videos_tarjetas/` | Videos MP4 de las tarjetas de la página 5. |
| `herramientas/` | `generar-datos-offline.py`. |

## Cómo editar contenido
1. Cambia textos y escenas en `json/`.
2. Si quieres que también se vea al abrir con doble clic, ejecuta `python herramientas/generar-datos-offline.py` para regenerar `js/datos-offline.js`.

## Notas
- Lo que el estudiante escribe y su progreso se guardan solo en su navegador (localStorage).
- **Página 5:** cada tarjeta reproduce su video desde `videos_tarjetas/` (`video1.mp4` … `video4.mp4`; ver `videos_tarjetas/LEEME.txt`). El campo `archivo` de cada video está en `json/pagina5.json`. Si un archivo no está o no carga, esa tarjeta muestra el «animatic» hecho con las escenas del guion.
- El video de inicio sigue siendo un «animatic»; para usar video real agrega `archivo` (y `poster`) en `json/sitio.json`.
- Los datos de Sami (notas, hojas de registro) son ejemplos del personaje, no datos reales.
- Fuentes: Google Fonts (Bricolage Grotesque, Figtree, JetBrains Mono); sin conexión se usan fuentes del sistema.
