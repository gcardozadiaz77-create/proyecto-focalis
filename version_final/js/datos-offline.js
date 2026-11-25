/* Generado por herramientas/generar-datos-offline.py. No lo edites a mano. */
window.FOCALIS_DATOS = {
 "pagina1.json": {
  "pagina": 1,
  "escenas": [
   {
    "id": "1.1",
    "tipo": "intro",
    "titulo": "Mismo celular, resultados distintos",
    "escenario": "Salón de clases. Sami está en su pupitre con el celular junto al cuaderno. Mira el tablero, luego el celular, luego otra vez el tablero.",
    "ilustracion": "aula",
    "expresion": "curioso",
    "sami": "Hoy mi celular me ayudó a buscar una palabra que no entendía... y también me sacó de la clase tres veces.",
    "narracion": "Mismo celular, resultados distintos. ¿Cómo es posible?",
    "intencion": "Despertar la curiosidad e introducir la idea de que el celular puede ser distractor o herramienta."
   },
   {
    "id": "1.2",
    "tipo": "linterna",
    "titulo": "Tu atención es una linterna",
    "escenario": "Sami sostiene una linterna imaginaria cuya luz ilumina la explicación del profesor. Al tocarla, la luz se mueve entre tres cosas y lo demás queda en sombra.",
    "narracion": "Tu atención es como una linterna: solo ilumina una cosa a la vez. Si la mueves todo el rato, no alcanzas a ver bien nada.",
    "texto": "Toca la linterna y mira qué pasa.",
    "interaccion": {
     "objetos": [
      {
       "id": "clase",
       "etiqueta": "La clase",
       "detalle": "Explicación del profe",
       "icono": "tablero"
      },
      {
       "id": "chat",
       "etiqueta": "Un mensaje del chat",
       "detalle": "Algo nuevo llegó",
       "icono": "chat"
      },
      {
       "id": "video",
       "etiqueta": "Un video",
       "detalle": "Solo 15 segundos",
       "icono": "play"
      }
     ],
     "alCompletar": "Lo que ilumina tu linterna se ve; todo lo demás queda en sombra."
    },
    "intencion": "Explicar qué es la atención con una imagen sencilla, partiendo de la experiencia y no de una definición."
   },
   {
    "id": "1.3",
    "tipo": "distractores",
    "titulo": "Lo que jala tu linterna",
    "escenario": "Alrededor de Sami aparecen cosas que jalan la linterna: ruido del pasillo, una vibración del celular, un bostezo, un compañero que muestra un video.",
    "narracion": "El entorno también mueve tu linterna: el ruido, los avisos, el sueño, lo que pasa en el chat.",
    "texto": "¿Cuál te pasa más seguido?",
    "interaccion": {
     "base": {
      "id": "clase",
      "etiqueta": "La clase",
      "icono": "tablero"
     },
     "distractores": [
      {
       "id": "ruido",
       "etiqueta": "Ruido del pasillo",
       "icono": "ruido",
       "efecto": "La luz se fue al pasillo."
      },
      {
       "id": "vibracion",
       "etiqueta": "Una vibración del celular",
       "icono": "celular",
       "efecto": "La luz saltó al celular."
      },
      {
       "id": "bostezo",
       "etiqueta": "Un bostezo",
       "icono": "luna",
       "efecto": "El sueño también mueve la luz."
      },
      {
       "id": "compa",
       "etiqueta": "Un compañero con un video",
       "icono": "play",
       "efecto": "La luz se fue con el video."
      }
     ],
     "alElegir": "Anotado. Distraerse no es solo cuestión de «echarle ganas»: el entorno también cuenta."
    },
    "intencion": "Mostrar que el entorno influye en la atención, de modo que distraerse no es solo cuestión de «echarle ganas»."
   },
   {
    "id": "1.4",
    "tipo": "clasificar",
    "titulo": "¿Te distrae o te ayuda?",
    "escenario": "Aparecen dos caminos: en uno Sami se distrae con redes y en el otro usa el celular para aprender. Hay una tercera opción: «Depende».",
    "narracion": "Mira estas acciones. ¿Te distraen o te ayudan? A veces... depende.",
    "texto": "Lleva cada acción al camino que creas que le corresponde.",
    "interaccion": {
     "categorias": [
      {
       "id": "distrae",
       "etiqueta": "Me distrae",
       "icono": "campana"
      },
      {
       "id": "ayuda",
       "etiqueta": "Me ayuda",
       "icono": "check"
      },
      {
       "id": "depende",
       "etiqueta": "Depende",
       "icono": "reloj"
      }
     ],
     "items": [
      {
       "id": "historias",
       "texto": "Ver historias",
       "nota": "En el recreo es un descanso; en plena explicación te saca de la clase."
      },
      {
       "id": "buscar",
       "texto": "Buscar un video que explique el tema",
       "nota": "Con permiso del profe, es una herramienta para aprender."
      },
      {
       "id": "chat",
       "texto": "Responder un chat",
       "nota": "Depende del momento: en clase suele cortar tu atención."
      },
      {
       "id": "calculadora",
       "texto": "Usar la calculadora",
       "nota": "Es una herramienta cuando la tarea la pide."
      },
      {
       "id": "cortos",
       "texto": "Ver videos cortos",
       "nota": "En plena explicación, distrae."
      },
      {
       "id": "foto",
       "texto": "Fotografiar el tablero",
       "nota": "Ayuda si luego lo revisas; depende de para qué lo uses."
      }
     ],
     "alCompletar": "Ver videos cortos en plena explicación te distrae. Buscar un video que explique el tema, con permiso del profe, te ayuda. El celular no es bueno ni malo: cuentan el momento y el propósito."
    },
    "intencion": "Distinguir el uso inapropiado del uso para aprender: el mismo celular es distractor o herramienta según el momento y el propósito."
   },
   {
    "id": "1.5",
    "tipo": "medidor",
    "titulo": "Piensa en ayer",
    "escenario": "Sami revisa en su celular el registro del tiempo de uso. Se pregunta cuánto lo usó ayer en clase o estudiando.",
    "narracion": "Piensa en ayer. ¿Cuánto tiempo crees que usaste el celular mientras estabas en clase o estudiando?",
    "texto": "Elige la respuesta que más se parece a tu caso.",
    "interaccion": {
     "opciones": [
      {
       "id": "nada",
       "etiqueta": "Casi nada",
       "nivel": 0.12
      },
      {
       "id": "rato",
       "etiqueta": "Un rato",
       "nivel": 0.42
      },
      {
       "id": "bastante",
       "etiqueta": "Bastante",
       "nivel": 0.8
      },
      {
       "id": "nose",
       "etiqueta": "No lo sé",
       "nivel": null
      }
     ],
     "respuesta": "No hay respuestas buenas ni malas. Si no lo sabes, ya tienes una pista: mirar el tiempo de uso de tu celular es un buen primer paso."
    },
    "intencion": "Autodiagnóstico: que reconozcas tu propio patrón de uso y veas la medición como una herramienta."
   },
   {
    "id": "1.6",
    "tipo": "rompecabezas",
    "titulo": "La clase sigue sin ti",
    "escenario": "Sami intenta seguir la explicación del profesor, pero cada vez que mira el celular la clase avanza. Al volver ya falta un pedazo.",
    "narracion": "Cada vez que miras el celular, la clase sigue sin ti. Cuando vuelves, ya falta un pedazo.",
    "sami": "¿Qué estaban diciendo? Ya no entiendo...",
    "samiDiferido": true,
    "texto": "Mira el celular unas cuantas veces y observa la explicación.",
    "interaccion": {
     "frase": [
      "Cada",
      "vez",
      "que",
      "miras",
      "el",
      "celular,",
      "la",
      "clase",
      "sigue",
      "sin",
      "ti."
     ],
     "boton": "Mirar el celular",
     "piezasPorVez": 2,
     "maximo": 4,
     "alTerminar": "Cuatro vistazos y la explicación quedó llena de huecos."
    },
    "intencion": "Mostrar cómo una atención fragmentada afecta lo que se aprende."
   },
   {
    "id": "1.7",
    "tipo": "guardar",
    "titulo": "Tú decides",
    "escenario": "Sami guarda el celular un momento y la linterna vuelve a iluminar la clase. Aparece la invitación a seguir.",
    "narracion": "Tu atención vale mucho y tú decides en qué la pones. Pero a veces algo la roba sin que te des cuenta. Vamos a descubrir qué.",
    "texto": "Siguiente página: qué hábitos dañan tu concentración.",
    "interaccion": {
     "boton": "Guardar el celular",
     "botonAtras": "Sacarlo otra vez"
    },
    "intencion": "Cerrar con el mensaje «tú decides» e invitar a la página 2."
   }
  ]
 },
 "pagina2.json": {
  "pagina": 2,
  "escenas": [
   {
    "id": "2.1",
    "tipo": "notificaciones",
    "titulo": "Solo iba a mirar un segundo",
    "escenario": "En plena clase, el celular de Sami vibra sobre el pupitre. Aparece una notificación, luego otra. Al abrirla, un feed de videos empieza a pasar sin parar.",
    "narracion": "Solo iba a mirar un segundo... y ya van diez minutos.",
    "texto": "¿Te ha pasado?",
    "interaccion": {
     "notificaciones": [
      {
       "app": "Chat",
       "texto": "Gabi: mira este video"
      },
      {
       "app": "Redes",
       "texto": "Tienes 3 «me gusta» nuevos"
      }
     ],
     "boton": "Abrir la notificación",
     "opciones": [
      {
       "id": "si",
       "etiqueta": "Sí, muchas veces"
      },
      {
       "id": "algo",
       "etiqueta": "A veces"
      },
      {
       "id": "no",
       "etiqueta": "Casi nunca"
      }
     ],
     "respuesta": "A casi todos nos pasa. Y no es casualidad: sigue leyendo."
    },
    "intencion": "Que reconozcas la situación y te identifiques con ella."
   },
   {
    "id": "2.2",
    "tipo": "feed",
    "titulo": "Un feed sin final",
    "escenario": "La pantalla muestra un feed de videos que no tiene final. Sami intenta volver a la clase, pero el celular vuelve a vibrar.",
    "narracion": "El scroll infinito es una lista que se renueva sola y nunca se acaba: nunca te dice «ya es suficiente».",
    "texto": "Desliza hasta llegar al final del feed. Si puedes.",
    "interaccion": {
     "titulos": [
      "Receta en 30 segundos",
      "Truco de matemáticas",
      "El gol de ayer",
      "El baile del momento",
      "Mascotas graciosas",
      "Increíble: no vas a creer esto",
      "Tutorial de peinado",
      "Lo que pasó en el partido",
      "Reto de 24 horas",
      "Datos curiosos del espacio"
     ],
     "meta": 14,
     "botonVolver": "Volver a la clase",
     "alVolver": "Otra notificación. El celular vuelve a vibrar.",
     "alCompletar": "Ya viste muchos videos y la lista sigue. No hay un «ya es suficiente»."
    },
    "intencion": "Que entiendas qué es el scroll infinito y por qué cuesta parar."
   },
   {
    "id": "2.3",
    "tipo": "lectura",
    "titulo": "Léelo hasta el final",
    "escenario": "Sami intenta leer un párrafo del libro. Cada vez que el celular vibra, la lectura se corta y hay que empezar la frase otra vez.",
    "narracion": "Una notificación es un aviso que te dice «mírame ya». Aunque no la abras, tu mente ya se fue a ver qué era.",
    "texto": "Intenta leer la frase hasta el final.",
    "interaccion": {
     "frase": "La atención sostenida es quedarte con una sola idea el tiempo suficiente para entenderla.",
     "interrupciones": [
      4,
      6,
      3
     ],
     "avisos": [
      "Nuevo mensaje",
      "Alguien comentó tu foto",
      "Tu video favorito subió algo"
     ],
     "boton": "Leer siguiente palabra",
     "alCompletar": "Con los avisos en silencio, la frase se lee de principio a fin."
    },
    "intencion": "Mostrar que las notificaciones están hechas para capturar la atención y compiten con la clase."
   },
   {
    "id": "2.4",
    "tipo": "multitarea",
    "titulo": "Dos cosas a la vez",
    "escenario": "Sami chatea con un amigo mientras copia lo que está en el tablero. Se ven dos hilos que intenta seguir al mismo tiempo y se enredan.",
    "texto": "¿Puedes seguir la clase y chatear al mismo tiempo?",
    "interaccion": {
     "copia": "La fotosíntesis convierte la luz en energía.",
     "chat": [
      "¿Vas a ir hoy?",
      "Respóndeme ya",
      "¿Viste lo de ayer?",
      "Hola???"
     ],
     "opciones": [
      {
       "id": "si",
       "etiqueta": "Sí, sin problema"
      },
      {
       "id": "mas",
       "etiqueta": "Más o menos"
      },
      {
       "id": "no",
       "etiqueta": "No mucho"
      }
     ],
     "respuesta": "Hacer dos cosas a la vez, en realidad, es saltar de una a otra. Eso se llama multitarea: cansa y hace que se te escapen detalles."
    },
    "intencion": "Explicar la multitarea como otra forma de fragmentar la atención."
   },
   {
    "id": "2.5",
    "tipo": "comparar",
    "titulo": "Compites contra algo muy bien diseñado",
    "escenario": "Dos pantallas lado a lado: a la izquierda, la explicación de la clase, tranquila; a la derecha, un video rápido con sonidos y colores fuertes. Sami mira de una a otra.",
    "narracion": "Los videos cortos y los colores fuertes están hechos para llamar tu atención rápido. La clase, a veces, va más despacio. No es que seas débil: compites contra algo muy bien diseñado.",
    "texto": "Toca cada pantalla para mirarla.",
    "interaccion": {
     "izquierda": {
      "titulo": "La clase",
      "detalle": "Explicación tranquila",
      "icono": "tablero"
     },
     "derecha": {
      "titulo": "Video rápido",
      "detalle": "Sonidos y colores fuertes",
      "icono": "play"
     },
     "alMirar": "Mira dónde estaba tu atención: la pantalla rápida llama más, por diseño."
    },
    "intencion": "Explicar que el contenido llamativo compite con la clase, sin culpar al estudiante."
   },
   {
    "id": "2.6",
    "tipo": "multiple",
    "titulo": "¿Cuáles te suenan?",
    "escenario": "El estudiante marca los hábitos que se parecen a los suyos. Sami cierra con una pregunta.",
    "narracion": "No es falta de voluntad: es un diseño pensado para que cueste soltarlo. Entonces, ¿cómo podemos solucionarlo? Primero veamos por qué, a veces, la clase no nos engancha.",
    "texto": "Marca los que te suenan.",
    "interaccion": {
     "opciones": [
      {
       "id": "suena",
       "etiqueta": "Revisar el celular apenas suena",
       "icono": "campana"
      },
      {
       "id": "segundo",
       "etiqueta": "Abrir redes «solo un segundo»",
       "icono": "celular"
      },
      {
       "id": "chatear",
       "etiqueta": "Chatear en clase",
       "icono": "chat"
      },
      {
       "id": "videos",
       "etiqueta": "Ver videos mientras estudio",
       "icono": "play"
      }
     ],
     "resultado": [
      "Ninguno te suena: ¡genial! Aun así, vale la pena seguir.",
      "Marcaste 1. Con un hábito, ya hay por dónde empezar.",
      "Marcaste {n}. Son hábitos comunes, y se pueden cambiar.",
      "Marcaste {n}. Son hábitos comunes, y se pueden cambiar.",
      "Marcaste los {n}. Tranquilo: el diseño es el culpable, no tú."
     ]
    },
    "intencion": "Que identifiques tus hábitos y plantear la pregunta «¿cómo podemos solucionarlo?» e invitar a la página 3."
   }
  ],
  "cierre": "Siguiente página: cómo motivarte en clase."
 },
 "pagina3.json": {
  "pagina": 3,
  "escenas": [
   {
    "id": "3.1",
    "tipo": "notas",
    "titulo": "Un día pierdes un tema",
    "escenario": "Salón de clases, varios días seguidos. Sami pierde el hilo de la clase una y otra vez. La libreta de notas muestra las calificaciones bajando poco a poco.",
    "narracion": "Un día pierdes un tema. Al otro, otro. Y cada vez te importa un poquito menos.",
    "sami": "Igual lo busco después… ¿para qué prestar atención?",
    "texto": "Avanza los días y mira qué pasa con la libreta.",
    "interaccion": {
     "aviso": "Ejemplo del personaje, no son datos reales.",
     "dias": [
      {
       "dia": "Lunes",
       "nota": 4.5,
       "expresion": "neutro",
       "estado": "Sigue la clase con atención."
      },
      {
       "dia": "Martes",
       "nota": 4.1,
       "expresion": "preocupado",
       "estado": "Pierde un tema."
      },
      {
       "dia": "Miércoles",
       "nota": 3.6,
       "expresion": "preocupado",
       "estado": "Pierde otro."
      },
      {
       "dia": "Jueves",
       "nota": 3.1,
       "expresion": "indiferente",
       "estado": "Le importa un poco menos."
      },
      {
       "dia": "Viernes",
       "nota": 2.7,
       "expresion": "indiferente",
       "estado": "«¿Para qué prestar atención?»"
      }
     ],
     "alCompletar": "La distracción constante se acumula: menos atención, menos interés y notas más bajas."
    },
    "intencion": "Mostrar que la distracción constante se acumula: menos atención, menos interés y notas más bajas."
   },
   {
    "id": "3.2",
    "tipo": "multiple",
    "titulo": "Cuando algo cuesta, hay una razón",
    "escenario": "Aparecen cuatro tarjetas con causas comunes del desánimo. El estudiante toca las que le pasan; puede marcar varias.",
    "narracion": "Cuando algo cuesta, hay una razón. ¿Cuál te pasa a ti?",
    "texto": "Toca las que te pasan. Puedes marcar varias.",
    "interaccion": {
     "opciones": [
      {
       "id": "aburrida",
       "etiqueta": "La clase me parece aburrida al lado de las redes",
       "icono": "celular"
      },
      {
       "id": "sirve",
       "etiqueta": "Siento que esto no me sirve para nada",
       "icono": "x"
      },
      {
       "id": "cansado",
       "etiqueta": "Estoy cansado o con sueño",
       "icono": "luna"
      },
      {
       "id": "metas",
       "etiqueta": "No tengo metas claras",
       "icono": "meta"
      }
     ],
     "resultado": [
      "Todas son normales. Y todas se pueden cambiar."
     ],
     "fijo": true
    },
    "intencion": "Que reconozcas la causa de tu desmotivación sin sentirte culpable."
   },
   {
    "id": "3.3",
    "tipo": "relojes",
    "titulo": "Dos relojes",
    "escenario": "Dos relojes: uno rápido, que marca videos de pocos segundos, y uno lento, que marca una explicación larga. Sami mira el rápido y suspira.",
    "narracion": "Después de un video que se resuelve en segundos, una explicación larga parece lenta. No es que la clase sea mala: compite con algo hecho para ser rápido.",
    "texto": "Pulsa para arrancar los dos relojes.",
    "interaccion": {
     "rapido": {
      "etiqueta": "Videos cortos",
      "contador": "Videos vistos"
     },
     "lento": {
      "etiqueta": "Explicación de la clase",
      "contador": "Ideas explicadas"
     },
     "boton": "Arrancar relojes",
     "duracion": 12,
     "alCompletar": "Mismo tiempo, ritmos distintos. La clase no es mala: va a otro ritmo."
    },
    "intencion": "Explicar por qué la clase puede parecer aburrida frente a las redes."
   },
   {
    "id": "3.4",
    "tipo": "clasificar",
    "titulo": "Viene de afuera, viene de adentro",
    "escenario": "Tres frases flotan frente a Sami. El estudiante las lleva a «Viene de afuera» o «Viene de adentro».",
    "narracion": "La motivación externa viene de afuera: una nota, un premio, evitar un regaño. La interna viene de adentro: curiosidad, sentirte capaz, querer lograr algo.",
    "texto": "Lleva cada frase a donde creas que pertenece.",
    "interaccion": {
     "evaluar": true,
     "categorias": [
      {
       "id": "afuera",
       "etiqueta": "Viene de afuera",
       "icono": "flecha-izq"
      },
      {
       "id": "adentro",
       "etiqueta": "Viene de adentro",
       "icono": "estrella"
      }
     ],
     "items": [
      {
       "id": "regano",
       "texto": "Estudio para que no me regañen",
       "correcta": "afuera",
       "nota": "Es externa: la mueve evitar un regaño."
      },
      {
       "id": "curiosidad",
       "texto": "Quiero entender cómo funciona esto",
       "correcta": "adentro",
       "nota": "Es interna: nace de tu curiosidad."
      },
      {
       "id": "permiso",
       "texto": "Si saco buena nota me dan permiso",
       "correcta": "afuera",
       "nota": "Es externa: la mueve un premio."
      }
     ],
     "alCompletar": "La externa puede empujarte un rato. La interna es la que puedes construir tú."
    },
    "intencion": "Distinguir motivación externa e interna y mostrar que la interna se puede cultivar."
   },
   {
    "id": "3.5",
    "tipo": "completar",
    "titulo": "Cambio 1: busca tu «para qué»",
    "escenario": "Sami mira una tarea de porcentajes y se pregunta para qué sirve. Se le ocurre conectarla con algo suyo.",
    "sami": "¿Porcentajes? ¿Para qué? … Ah, para saber cuánto me ahorro en un descuento.",
    "narracion": "Cambio 1: busca tu para qué.",
    "texto": "Completa: Esto me puede servir para ______",
    "interaccion": {
     "inicio": "Esto me puede servir para",
     "opciones": [
      "saber cuánto me ahorro en un descuento",
      "entender las estadísticas de mi deporte favorito",
      "repartir bien mi mesada"
     ],
     "otra": "Escribe tu propio «para qué»",
     "clave": "paraQue"
    },
    "intencion": "Primer cambio pequeño: encontrar un sentido propio a lo que se aprende."
   },
   {
    "id": "3.6",
    "tipo": "meta",
    "titulo": "Cambio 2: una meta pequeña",
    "escenario": "Sami escribe en una nota una meta mínima para hoy y luego se estira un momento. El estudiante elige su meta pequeña entre tres opciones.",
    "narracion": "Cambio 2: cuando la meta es enorme, cansa. Elige una pequeña: entender una sola idea de la clase de hoy.",
    "texto": "Y si estás agotado, descansar también cuenta: con el cuerpo cansado cuesta concentrarse.",
    "interaccion": {
     "opciones": [
      {
       "id": "duda",
       "etiqueta": "Anotar una duda para preguntarla"
      },
      {
       "id": "explicar",
       "etiqueta": "Explicarme el tema con mis propias palabras"
      },
      {
       "id": "ejercicio",
       "etiqueta": "Resolver un ejercicio"
      }
     ],
     "notaTitulo": "Mi meta mínima de hoy",
     "clave": "metaMinima"
    },
    "intencion": "Segundo cambio pequeño: metas realistas y descanso frente al cansancio y la falta de metas."
   },
   {
    "id": "3.7",
    "tipo": "participar",
    "titulo": "Cambio 3: participa",
    "escenario": "Sami levanta la mano y pregunta algo al profesor; el profesor le repite el ejemplo. La voz narradora cierra la página.",
    "sami": "Profe, ¿me puede repetir ese ejemplo?",
    "narracion": "Cambio 3: cuando participas, la clase deja de ser solo para escuchar y se vuelve más tuya. Motivarte no es sentirte feliz todo el tiempo: es tener un motivo propio y pasos pequeños.",
    "texto": "Siguiente página: técnicas para potenciar tu estudio.",
    "interaccion": {
     "boton": "Levantar la mano",
     "profe": "El profe vuelve a explicar el ejemplo.",
     "cambios": [
      {
       "n": 1,
       "titulo": "Busca tu «para qué»",
       "clave": "paraQue",
       "vacio": "Lo defines en la escena 3.5"
      },
      {
       "n": 2,
       "titulo": "Elige una meta pequeña",
       "clave": "metaMinima",
       "vacio": "Lo eliges en la escena 3.6"
      },
      {
       "n": 3,
       "titulo": "Participa en clase",
       "fijo": "Levanta la mano cuando algo no te quede claro"
      }
     ]
    },
    "intencion": "Tercer cambio pequeño: participar para sentirte parte de la clase; cierre e invitación a la página 4."
   }
  ]
 },
 "pagina4.json": {
  "pagina": 4,
  "escenas": [
   {
    "id": "4.1",
    "tipo": "intro",
    "titulo": "Estudiar en casa",
    "escenario": "En la casa de Sami, por la tarde. Sami se sienta a hacer una tarea y el celular vibra a su lado. Sami lo mira con duda.",
    "ilustracion": "casa",
    "expresion": "preocupado",
    "sami": "Si me conozco, voy a terminar en el feed.",
    "narracion": "Estudiar en casa es más difícil de cuidar: nadie te mira y el celular está ahí. Estas cuatro técnicas son para eso.",
    "intencion": "Pasar del problema a las estrategias y ubicar el estudio fuera del colegio."
   },
   {
    "id": "4.2",
    "tipo": "tecnica",
    "titulo": "Bloques de estudio con descansos",
    "escenario": "Una tarjeta explica la técnica y el estudiante toca cada uno de los tres pasos para verlos. Sami la aplica con una lectura de sociales.",
    "texto": "Toca cada paso para verlo.",
    "interaccion": {
     "numero": 1,
     "nombre": "Bloques de estudio con descansos",
     "queEs": "Estudiar en bloques cortos con pausas planeadas, para que tu mente no se agote.",
     "pasos": [
      {
       "corto": "Elige",
       "texto": "Elige una tarea concreta."
      },
      {
       "corto": "Estudia",
       "texto": "Estudia un bloque corto (por ejemplo, 25 minutos) sin mirar el celular."
      },
      {
       "corto": "Descansa",
       "texto": "Descansa 5 minutos: estírate o toma agua, sin redes."
      }
     ],
     "ejemplo": "Sami lee el capítulo de sociales en un bloque de 25 minutos y descansa 5 antes de hacer el resumen.",
     "visual": "bloques"
    },
    "intencion": "Dar una primera acción sencilla para sostener el enfoque."
   },
   {
    "id": "4.3",
    "tipo": "tecnica",
    "titulo": "Plan de estudio simple",
    "escenario": "Misma tarjeta, nueva técnica. Sami escribe su lista del día en una hoja y le pone una hora a cada tarea.",
    "texto": "Toca cada paso para verlo.",
    "interaccion": {
     "numero": 2,
     "nombre": "Plan de estudio simple",
     "queEs": "Decidir qué vas a estudiar antes de sentarte, para no improvisar.",
     "pasos": [
      {
       "corto": "Anota",
       "texto": "Anota las tareas del día."
      },
      {
       "corto": "Ordena",
       "texto": "Ordénalas de la más urgente a la menos urgente."
      },
      {
       "corto": "Pon hora",
       "texto": "Ponle una hora a cada una."
      }
     ],
     "ejemplo": "Sami anota: taller de ciencias a las 4:00, lectura de español a las 5:00, repaso de inglés a las 6:00.",
     "visual": "plan",
     "plan": [
      {
       "hora": "4:00",
       "tarea": "Taller de ciencias"
      },
      {
       "hora": "5:00",
       "tarea": "Lectura de español"
      },
      {
       "hora": "6:00",
       "tarea": "Repaso de inglés"
      }
     ]
    },
    "intencion": "Mostrar que planear reduce la tentación de improvisar con el celular."
   },
   {
    "id": "4.4",
    "tipo": "tecnica",
    "titulo": "Entorno sin distracciones",
    "escenario": "Sami prepara su espacio: activa «No molestar», guarda el celular en la mochila y lo deja lejos de su vista. Solo lo saca en el momento que su plan indica.",
    "texto": "Toca cada paso para verlo.",
    "interaccion": {
     "numero": 3,
     "nombre": "Entorno sin distracciones",
     "queEs": "Preparar tu espacio para que la distracción no esté al alcance.",
     "pasos": [
      {
       "corto": "Silencia",
       "texto": "Activa «No molestar» en tu celular."
      },
      {
       "corto": "Guarda",
       "texto": "Guárdalo fuera de tu vista (en la mochila o en otro cuarto)."
      },
      {
       "corto": "Solo si toca",
       "texto": "Úsalo solo cuando tu plan lo indique."
      }
     ],
     "ejemplo": "Sami deja el celular en la mochila durante su bloque y lo saca en el descanso para responder un mensaje.",
     "visual": "entorno"
    },
    "intencion": "Que veas que puedes regular tu atención silenciando notificaciones y usando el celular solo en momentos específicos."
   },
   {
    "id": "4.5",
    "tipo": "tecnica",
    "titulo": "Autoevaluación",
    "escenario": "Al terminar su tarea, Sami hace un pequeño balance en su cuaderno: qué logró y cuántas veces miró el celular sin querer.",
    "texto": "Toca cada paso para verlo.",
    "interaccion": {
     "numero": 4,
     "nombre": "Autoevaluación",
     "queEs": "Revisar al final si lograste lo que te propusiste y qué te distrajo.",
     "pasos": [
      {
       "corto": "Marca",
       "texto": "Marca si cumpliste la tarea."
      },
      {
       "corto": "Cuenta",
       "texto": "Anota cuántas veces miraste el celular sin querer."
      },
      {
       "corto": "Ajusta",
       "texto": "Decide un ajuste para mañana."
      }
     ],
     "ejemplo": "Sami escribe: «Terminé el taller. Miré el celular dos veces. Mañana lo dejo en otro cuarto».",
     "visual": "autoevaluacion"
    },
    "intencion": "Introducir la medición de resultados como parte de la autorregulación."
   },
   {
    "id": "4.6",
    "tipo": "hojas",
    "titulo": "Antes y después",
    "escenario": "Sami coloca lado a lado dos hojas de registro: la de antes y la de después de probar las técnicas. Este es un ejemplo del personaje.",
    "sami": "Antes miraba el celular sin darme cuenta. Ahora lo uso cuando toca, y avanzo más.",
    "narracion": "Medir te muestra si funciona. Si funciona, repítelo. Si no, cambia una sola cosa y vuelve a probar.",
    "texto": "Elige con qué hoja te quedas.",
    "interaccion": {
     "aviso": "Ejemplo del personaje, no son datos reales.",
     "hojas": [
      {
       "id": "antes",
       "titulo": "Antes",
       "distracciones": 6,
       "tareas": 1
      },
      {
       "id": "despues",
       "titulo": "Después",
       "distracciones": 2,
       "tareas": 4
      }
     ],
     "respuestas": {
      "antes": "Es un buen punto de partida. Lo importante es medir para poder comparar.",
      "despues": "Esa es la hoja de alguien que midió, ajustó y volvió a probar."
     }
    },
    "intencion": "La medición final confirma que la propuesta funciona: puedes regular tu atención y comprobar tu mejora."
   },
   {
    "id": "4.7",
    "tipo": "intro",
    "titulo": "Tú puedes regular tu atención",
    "escenario": "Sami cierra el cuaderno con el celular guardado. La voz narradora invita a seguir.",
    "ilustracion": "cuaderno",
    "expresion": "alegre",
    "narracion": "Tú puedes regular tu atención. Mira los videos para repasar y luego arma tus propias metas.",
    "texto": "Siguiente página: videos.",
    "intencion": "Cerrar con el mensaje «tú puedes regular tu atención» e invitar a la página 5."
   }
  ]
 },
 "pagina5.json": {
  "pagina": 5,
  "intro": {
   "id": "5.1",
   "narracion": "Elige un video para repasar. Cada uno dura menos de un minuto.",
   "escenario": "El estudiante ve cuatro tarjetas, una por video, y elige cuál mirar."
  },
  "videos": [
   {
    "id": "v1",
    "archivo": "../videos_tarjetas/video1.mp4",
    "titulo": "Tu atención es una linterna",
    "repasa": "Página 1",
    "resumen": "Una linterna que salta entre la clase y el celular muestra cómo la atención fragmentada deja la clase a oscuras.",
    "escenas": [
     {
      "id": "5.2",
      "seg": 12,
      "visual": {
       "tipo": "haz",
       "foco": [
        0
       ]
      },
      "descripcion": "Salón de clases. Sami sostiene una linterna imaginaria que ilumina la explicación del profesor.",
      "voz": "Tu atención es como una linterna: solo ilumina una cosa a la vez."
     },
     {
      "id": "5.3",
      "seg": 14,
      "visual": {
       "tipo": "haz",
       "foco": [
        0,
        1,
        0,
        1
       ]
      },
      "descripcion": "La luz salta de la clase al celular, vuelve a la clase y salta otra vez. En la explicación quedan huecos oscuros.",
      "voz": "Cada salto deja un pedazo de clase a oscuras. Y esos pedazos se acumulan."
     },
     {
      "id": "5.4",
      "seg": 14,
      "visual": {
       "tipo": "haz",
       "foco": [
        0
       ],
       "celularAbajo": true
      },
      "descripcion": "Sami deja el celular boca abajo. La luz vuelve a la clase y se queda ahí.",
      "sami": "Mismo celular. Yo decido hacia dónde apunto mi luz.",
      "voz": "Tú decides dónde poner tu atención."
     }
    ]
   },
   {
    "id": "v2",
    "archivo": "../videos_tarjetas/video2.mp4",
    "titulo": "¿Por qué es tan difícil parar?",
    "repasa": "Página 2",
    "resumen": "Vibraciones y un feed sin final muestran que no es falta de voluntad, sino un diseño que compite por tu atención.",
    "escenas": [
     {
      "id": "5.5",
      "seg": 12,
      "visual": {
       "tipo": "vibra"
      },
      "descripcion": "Clase en silencio. El celular de Sami vibra; aparece una notificación y luego otra.",
      "voz": "Una notificación te dice: «mírame ya»."
     },
     {
      "id": "5.6",
      "seg": 15,
      "visual": {
       "tipo": "feed"
      },
      "descripcion": "Sami abre una notificación y un feed de videos pasa sin parar mientras el reloj del salón avanza.",
      "sami": "Solo iba a mirar un segundo…",
      "voz": "El scroll infinito nunca termina: no te dice «ya es suficiente»."
     },
     {
      "id": "5.7",
      "seg": 13,
      "visual": {
       "tipo": "silencio"
      },
      "descripcion": "Sami respira, apaga los avisos y guarda el celular. El salón vuelve a la calma.",
      "voz": "No es falta de voluntad: es un diseño hecho para atraparte. Y puedes frenarlo."
     }
    ]
   },
   {
    "id": "v3",
    "archivo": "../videos_tarjetas/video3.mp4",
    "titulo": "El día que dejó de importarme",
    "repasa": "Página 3",
    "resumen": "Sami muestra cómo la distracción acumulada baja el interés y las notas, y cómo recupera un motivo propio.",
    "escenas": [
     {
      "id": "5.8",
      "seg": 10,
      "visual": {
       "tipo": "notas",
       "valores": [
        4.5,
        4.1
       ]
      },
      "descripcion": "Varios días de clase. Sami pierde un tema, luego otro.",
      "sami": "Me perdí un tema… luego otro…",
      "voz": ""
     },
     {
      "id": "5.9",
      "seg": 15,
      "visual": {
       "tipo": "notas",
       "valores": [
        4.5,
        4.1,
        3.6,
        3.1,
        2.7
       ]
      },
      "descripcion": "La libreta de notas de Sami baja poco a poco. Sami ya no levanta la mirada.",
      "sami": "Entre menos entendía, menos ganas tenía.",
      "voz": "La distracción constante se acumula: menos atención, menos interés, notas más bajas."
     },
     {
      "id": "5.10",
      "seg": 15,
      "visual": {
       "tipo": "meta"
      },
      "descripcion": "Sami se pregunta para qué le sirve el tema, lo conecta con algo suyo y escribe una meta pequeña.",
      "sami": "¿Para qué me sirve esto? … Hoy solo quiero entender una idea.",
      "voz": "Un motivo propio y una meta pequeña cambian el rumbo."
     }
    ]
   },
   {
    "id": "v4",
    "archivo": "../videos_tarjetas/video4.mp4",
    "titulo": "Mi reto de una semana",
    "repasa": "Página 4",
    "resumen": "Sami activa «No molestar», guarda el celular, estudia en bloques y mide si funciona.",
    "escenas": [
     {
      "id": "5.11",
      "seg": 12,
      "visual": {
       "tipo": "silencio",
       "mochila": true
      },
      "descripcion": "En casa, Sami activa «No molestar» y guarda el celular en la mochila.",
      "voz": "Paso uno: silencia y guarda."
     },
     {
      "id": "5.12",
      "seg": 13,
      "visual": {
       "tipo": "bloque"
      },
      "descripcion": "Sami estudia un bloque corto, descansa y saca el celular solo durante el descanso.",
      "voz": "Úsalo cuando te toca, no cuando suena."
     },
     {
      "id": "5.13",
      "seg": 15,
      "visual": {
       "tipo": "registro"
      },
      "descripcion": "Sami revisa su registro: hay más tareas cumplidas y menos distracciones.",
      "sami": "¡Sí funciona!",
      "voz": "Medir te muestra el cambio. Tú puedes regular tu atención."
     }
    ]
   }
  ],
  "cierre": {
   "id": "5.14",
   "narracion": "Ahora es tu turno: arma tus propias metas.",
   "texto": "Siguiente página: cómo hacer listas de objetivos."
  }
 },
 "pagina6.json": {
  "pagina": 6,
  "intro": {
   "id": "6.1",
   "narracion": "Una meta clara se cumple más fácil que una idea vaga. Aquí tienes tres plantillas para armar las tuyas.",
   "escenario": "El estudiante ve tres plantillas y elige con cuál empezar. Sami aparece con una hoja en blanco."
  },
  "plantillas": [
   {
    "id": "dia",
    "numero": 1,
    "titulo": "Mi objetivo del día",
    "icono": "check",
    "escena": "6.2",
    "instrucciones": [
     "Escribe UNA cosa que quieres lograr hoy.",
     "Escribe cómo sabrás que lo lograste.",
     "Escribe cuándo lo harás.",
     "Al final del día, marca si lo cumpliste."
    ],
    "campos": [
     {
      "id": "quiero",
      "tipo": "texto",
      "etiqueta": "Hoy quiero",
      "ayuda": "Una sola cosa",
      "ejemplo": "Terminar el taller de ciencias"
     },
     {
      "id": "sabre",
      "tipo": "texto",
      "etiqueta": "Sabré que lo logré cuando",
      "ayuda": "Algo que puedas comprobar",
      "ejemplo": "Tenga las 5 preguntas respondidas"
     },
     {
      "id": "cuando",
      "tipo": "texto",
      "etiqueta": "Lo haré",
      "ayuda": "Hora y lugar",
      "ejemplo": "De 4:00 a 4:30 p. m., con el celular guardado en la mochila"
     },
     {
      "id": "cumplido",
      "tipo": "check",
      "etiqueta": "Al final del día: cumplido",
      "ejemplo": true
     }
    ],
    "autor": "Ejemplo de Sami (9.º)"
   },
   {
    "id": "semana",
    "numero": 2,
    "titulo": "Mi objetivo de la semana",
    "icono": "calendario",
    "escena": "6.3",
    "instrucciones": [
     "Elige una meta para la semana.",
     "Divídela en tres pasos pequeños.",
     "Ponle un día a cada paso.",
     "El viernes revisa cuántos pasos cumpliste."
    ],
    "campos": [
     {
      "id": "meta",
      "tipo": "texto",
      "etiqueta": "Meta de la semana",
      "ayuda": "Algo que quieras lograr",
      "ejemplo": "Prepararme para la evaluación de matemáticas del viernes"
     },
     {
      "id": "p1",
      "tipo": "paso",
      "etiqueta": "Paso 1",
      "ayuda": "Un paso pequeño",
      "ejemplo": "Repasar mis apuntes",
      "dia": "Lunes"
     },
     {
      "id": "p2",
      "tipo": "paso",
      "etiqueta": "Paso 2",
      "ayuda": "Otro paso pequeño",
      "ejemplo": "Resolver diez ejercicios",
      "dia": "Miércoles"
     },
     {
      "id": "p3",
      "tipo": "paso",
      "etiqueta": "Paso 3",
      "ayuda": "El último paso",
      "ejemplo": "Hacerme un mini examen",
      "dia": "Jueves"
     },
     {
      "id": "c1",
      "tipo": "check",
      "etiqueta": "Cumplí el paso 1",
      "ejemplo": true
     },
     {
      "id": "c2",
      "tipo": "check",
      "etiqueta": "Cumplí el paso 2",
      "ejemplo": true
     },
     {
      "id": "c3",
      "tipo": "check",
      "etiqueta": "Cumplí el paso 3",
      "ejemplo": false
     },
     {
      "id": "ajuste",
      "tipo": "texto",
      "etiqueta": "Revisión del viernes",
      "ayuda": "¿Qué ajustarías la próxima semana?",
      "ejemplo": "Cumplí 2 de 3 pasos. El jueves se me complicó; la próxima semana lo hago el martes"
     }
    ],
    "autor": "Ejemplo de Sami"
   },
   {
    "id": "reto",
    "numero": 3,
    "titulo": "Mi reto de atención",
    "icono": "linterna",
    "escena": "6.4",
    "instrucciones": [
     "Elige una acción para cuidar tu atención (por ejemplo, «No molestar» mientras estudias).",
     "Decide durante cuántos días la harás.",
     "Cada día anota cuántos bloques de estudio lograste sin mirar el celular.",
     "Al final, compara con cómo estabas al empezar."
    ],
    "campos": [
     {
      "id": "accion",
      "tipo": "texto",
      "etiqueta": "Mi acción",
      "ayuda": "Algo que cuide tu atención",
      "ejemplo": "Estudiar con «No molestar» y el celular guardado"
     },
     {
      "id": "dias",
      "tipo": "texto",
      "etiqueta": "Durante cuántos días",
      "ayuda": "Por ejemplo: 5 días",
      "ejemplo": "5 días"
     },
     {
      "id": "registro",
      "tipo": "registro",
      "etiqueta": "Bloques sin mirar el celular",
      "dias": [
       "Lunes",
       "Martes",
       "Miércoles",
       "Jueves",
       "Viernes"
      ],
      "ejemplo": [
       "1",
       "",
       "2",
       "",
       "3"
      ]
     },
     {
      "id": "final",
      "tipo": "texto",
      "etiqueta": "Al final comparo",
      "ayuda": "¿Cómo empecé y cómo terminé?",
      "ejemplo": "Empecé con 1 bloque y terminé con 3. Sí puedo regular mi atención"
     }
    ],
    "autor": "Ejemplo de Sami"
   }
  ],
  "cierre": {
   "id": "6.5",
   "narracion": "Tu atención es tuya, y tú decides cómo usarla. Empieza hoy con una meta pequeña.",
   "texto": "Vuelve al inicio cuando quieras repasar."
  }
 },
 "sitio.json": {
  "marca": {
   "nombre": "FOCALIS",
   "lema": "recupera tu atención",
   "mensaje": "Tú puedes decidir cómo usar tu atención: con acciones sencillas puedes silenciar lo que te distrae y comprobar que tu concentración mejora.",
   "error404": {
    "titulo": "Error 404: Atención no encontrada.",
    "lema": "Desconecta para Conectar."
   }
  },
  "equipo": {
   "institucion": "Universidad de Córdoba",
   "curso": "Producción Multimedia · Grupo 2",
   "fecha": "30/10/2026",
   "integrantes": [
    "Gabriel Cardoza",
    "Cristian Ibañez",
    "Carlos Hernández",
    "Daniel Peluffo"
   ]
  },
  "producto": {
   "tematica": "La interferencia de las redes sociales en los ambientes escolares: cómo el celular, las notificaciones y el contenido constante fragmentan la concentración de los estudiantes y qué pueden hacer ellos mismos para sostener su atención al aprender.",
   "publico": "Estudiantes de secundaria, grados 8.º a 11.º (aproximadamente 13 a 17 años), en entornos escolares e híbridos. No necesitas conocimientos previos para recorrer la herramienta.",
   "objetivoGeneral": "Tomar conciencia crítica del papel de la atención en el aprendizaje autónomo y adquirir estrategias prácticas de autorregulación para sostener tu enfoque.",
   "objetivos": [
    "Reconocer tu propio patrón de uso del celular y distinguir cuándo es un distractor y cuándo es una herramienta para aprender.",
    "Comprender cómo las notificaciones, el scroll infinito, la multitarea y el contenido llamativo capturan la atención, y cómo la distracción acumulada afecta el interés y el rendimiento.",
    "Aplicar técnicas sencillas de autorregulación (silenciar notificaciones, estudiar en bloques, guardar el celular, medir resultados) y armar tus propias metas con plantillas."
   ],
   "duracionTotal": "Aprox. 15 minutos"
  },
  "brief": [
   {
    "titulo": "Problema educativo",
    "texto": "Alta interferencia de las redes sociales en el entorno escolar, actuando como distractor que fragmenta la concentración.",
    "icono": "campana"
   },
   {
    "titulo": "¿Quién experimenta el problema?",
    "texto": "Estudiantes de educación secundaria (grados 8.º a 11.º) influenciados por la hiperconectividad digital.",
    "icono": "celular"
   },
   {
    "titulo": "Contexto y restricciones",
    "texto": "Entornos escolares con acceso a dispositivos y notificaciones que reducen la atención sostenida. Requiere dinámicas breves e interactivas.",
    "icono": "tablero"
   },
   {
    "titulo": "Qué deberías aprender o cambiar",
    "texto": "Generar conciencia sobre el rol de la atención y brindar estrategias de autorregulación para sostener el enfoque en clase.",
    "icono": "linterna"
   }
  ],
  "paginas": [
   {
    "n": 1,
    "archivo": "pagina1.html",
    "corto": "Atención",
    "titulo": "Cómo mejorar tu atención",
    "idea": "Tu atención es limitada y tú decides en qué la inviertes: el mismo celular puede distraerte o ayudarte.",
    "ruta": "Escena 1 «Redes sociales en el aula» y escena 3 «Efectos en el aprendizaje»",
    "segundos": 100,
    "icono": "linterna"
   },
   {
    "n": 2,
    "archivo": "pagina2.html",
    "corto": "Hábitos",
    "titulo": "Qué hábitos dañan tu concentración",
    "idea": "El celular está diseñado para que cueste soltarlo: no es falta de voluntad.",
    "ruta": "Escena 2 «Captura de la atención»",
    "segundos": 95,
    "icono": "campana"
   },
   {
    "n": 3,
    "archivo": "pagina3.html",
    "corto": "Motivación",
    "titulo": "Cómo motivarte en clase",
    "idea": "La motivación se puede construir con cambios pequeños, empezando por entender de dónde viene el desánimo.",
    "ruta": "Escena 3 «Efectos en el aprendizaje»",
    "segundos": 105,
    "icono": "estrella"
   },
   {
    "n": 4,
    "archivo": "pagina4.html",
    "corto": "Técnicas",
    "titulo": "Técnicas para potenciar el estudio",
    "idea": "Con acciones sencillas puedes regular tu atención y comprobar que mejora.",
    "ruta": "Escena 4 «Estrategias de autorregulación»",
    "segundos": 115,
    "icono": "reloj"
   },
   {
    "n": 5,
    "archivo": "pagina5.html",
    "corto": "Videos",
    "titulo": "Videos",
    "idea": "Cuatro videos muy breves repasan lo que viste en cada página.",
    "ruta": "Refuerzo de las escenas 1 a 4 (un video por cada página 1 a 4)",
    "segundos": 150,
    "icono": "play"
   },
   {
    "n": 6,
    "archivo": "pagina6.html",
    "corto": "Objetivos",
    "titulo": "Cómo hacer listas de objetivos",
    "idea": "Lo que escribes y mides es más fácil de cumplir.",
    "ruta": "Escena 4 «Estrategias de autorregulación»",
    "segundos": 90,
    "icono": "meta"
   }
  ],
  "videoPresentacion": {
   "titulo": "Error 404: Atención no encontrada",
   "subtitulo": "Video de presentación del profesor de informática para toda la comunidad",
   "escenas": [
    {
     "id": "E1",
     "seg": 15,
     "visual": {
      "tipo": "pantallas"
     },
     "plano": "Plano general del aula, dolly in lento hacia el centro. Etalonaje frío.",
     "voz": "Como su profesor de informática, saben que me apasiona la tecnología. Nos da acceso al código fuente del mundo entero. Pero últimamente, he notado un bug masivo en nuestro sistema: estamos físicamente en el salón, pero con la mente en la nube."
    },
    {
     "id": "E2",
     "seg": 20,
     "visual": {
      "tipo": "bateria"
     },
     "plano": "Primer plano de Andrés y plano detalle del celular oculto. Cámara al hombro. VFX: «Batería de Atención» en pixel art.",
     "voz": "Muchos creen que tienen procesadores de múltiples núcleos, capaces de entender una explicación compleja y responder un chat al mismo tiempo. Alerta de spoiler: el cerebro no funciona así. Cuando divides tu atención, solo estás saturando tu memoria RAM. Y el resultado siempre es el mismo: un lag tremendo en tu aprendizaje."
    },
    {
     "id": "E3",
     "seg": 20,
     "visual": {
      "tipo": "montaje"
     },
     "plano": "Serie de planos medios cortos con jump cuts. Swoosh en cada corte.",
     "voz": "Esos algoritmos están programados por las mentes más brillantes de Silicon Valley para secuestrar tu dopamina. ¿Las consecuencias? No solo bajan tus notas. Lo más grave es que te estás perdiendo los mejores momentos de tu vida escolar, y esos no tienen botón de reinicio."
    },
    {
     "id": "E4",
     "seg": 20,
     "visual": {
      "tipo": "calido"
     },
     "plano": "Plano detalle de la mochila que se cierra; tracking shot con gimbal en la sala de sistemas. Luz cálida y música lo-fi.",
     "voz": "Pero podemos reprogramar este hábito. Imagina una jornada donde tú tienes el control de tu atención, no una aplicación. Menos ansiedad, ideas más creativas y conexiones humanas en alta definición. La verdadera innovación hoy en día es saber cuándo apagar la pantalla."
    },
    {
     "id": "E5",
     "seg": 15,
     "visual": {
      "tipo": "terminal"
     },
     "plano": "El profesor mira a cámara y gira su portátil para mostrar el home de la nueva página. Pantalla negra con código verde que se transforma en el texto final.",
     "voz": "La tecnología debe ser nuestra herramienta, no nuestra dueña. Por eso, mis estudiantes y yo hemos diseñado una nueva página web para toda la comunidad. Allí compartiremos los hacks necesarios para vivir una educación más sana. Entren, exploren y aprendamos a recuperar nuestra atención. Los espero en línea... pero solo un rato. Luego, a vivir en el mundo real."
    }
   ]
  }
 }
};
