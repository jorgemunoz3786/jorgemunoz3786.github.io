# Pokedex Web

Proyecto pequeño para practicar uso de Git.

## Comprobación rápida
- Rama principal: `main` (no hay merges aún).
- Hay `index.html`.
- El favicon actual es `recursos/images/fav.jpeg` (hay que cambiarlo a `fav.ico` si lo piden).

## Planificación
- **Tema**: una Pokedex que obtiene datos de la PokéAPI.
- **Usuarios**: visitante (busca Pokémon) y desarrollador (quien mantiene el proyecto).
- **Requisitos** básicos: buscar Pokémon, ver su información y que la página se vea bien en móvil y PC.

## Diseño
La web es cliente (HTML/JS) y pide datos a la **PokeAPI** (servidor). El navegador muestra los datos.

## Despliegue
Se puede subir a GitHub Pages. Ojo con las rutas y con las barras `\` que a veces hay en los archivos (usar `/`).

## Mantenimiento (errores y mejoras)
- Errores: el favicon es `.jpeg` y piden `.ico`; algunas rutas usan `\\` en vez de `/`.
- Mejoras: poner `fav.ico`, arreglar rutas, mejorar mensajes de error en `wiki.js`.

## Pasos para arreglar lo más importante
1. Convertir `recursos/images/fav.jpeg` a `recursos/images/fav.ico` y añadirlo al proyecto.
2. Cambiar en `index.html` y `wiki.html` la línea del icono a:

```html
<link rel="icon" href="recursos/images/fav.ico" type="image/x-icon">
```

3. Arreglar barras `\\` por `/` en las rutas.