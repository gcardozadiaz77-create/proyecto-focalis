#!/usr/bin/env python3
"""
Genera js/datos-offline.js a partir de los archivos de la carpeta json/.

Para qué sirve: si abres FOCALIS con doble clic (file://), el navegador no deja
leer los JSON con fetch(). Esta copia permite que la página funcione igual.
Con un servidor local (Live Server, python -m http.server) no se usa.

Cuándo ejecutarlo: cada vez que edites un archivo de json/.
    python3 herramientas/generar-datos-offline.py
"""
import json
import pathlib

raiz = pathlib.Path(__file__).resolve().parent.parent
datos = {}
for archivo in sorted((raiz / "json").glob("*.json")):
    datos[archivo.name] = json.loads(archivo.read_text(encoding="utf-8"))

salida = raiz / "js" / "datos-offline.js"
salida.write_text(
    "/* Generado por herramientas/generar-datos-offline.py. No lo edites a mano. */\n"
    "window.FOCALIS_DATOS = " + json.dumps(datos, ensure_ascii=False, indent=1) + ";\n",
    encoding="utf-8",
)
print(f"{len(datos)} archivos JSON -> {salida.relative_to(raiz)}")
