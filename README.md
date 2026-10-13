# Liga MX 1943–2026 · infografía interactiva

Creada por **Ing. Mauricio Muñoz Bravo**.

Página web estática (HTML, CSS y JavaScript sin frameworks) con la historia completa de la Liga MX: campeones, finales, sequías, comparador de clubes, dinastías, mapa, técnicos, goleadores, trofeos en 3D, logos, datos curiosos, un juego, la ruleta del campeón y el pronóstico del Apertura 2026.

## Estructura

Todos los archivos viven juntos en la raíz del repositorio:

```
index.html            la página
estilos.css           todos los estilos (claro y oscuro)
app.js                toda la lógica y los datos
three.min.js          three.js r128 (visor 3D de los trofeos)
tabla.json            tabla de posiciones que alimenta el pronóstico
himno.mp3             himno
logo-liga-mx.webp, logo-fmf-1a-div.webp   logos
*.webp                escudos de los clubes (america.webp, chivas.webp, ...)
clasico.webp, moderno.webp   fotos de los dos trofeos (respaldo si no hay WebGL)
portada.webm, portada.mp4, portada-poster.webp   video de portada
```

## Cómo verla en tu computadora

Hay que abrirla desde un servidor local, no con doble clic en `index.html`, porque el visor 3D y la tabla cargan archivos:

```
python3 -m http.server 8000
```

y entra a <http://localhost:8000>.

## Cómo publicarla (GitHub Pages)

1. Sube todo el contenido de esta carpeta a la raíz del repositorio.
2. En el repositorio: Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. La página queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

Todas las rutas son relativas, así que funciona igual en un subdirectorio.

## Cómo actualizar la tabla del pronóstico

El pronóstico y la caja «Hoy» de la portada leen `tabla.json`. Para actualizarlos, edita ese archivo y súbelo:

```json
{
  "jornada": 11,
  "actualizado": "2026-10-12T20:10:00-06:00",
  "equipos": { "AME": { "pj": 10, "pts": 21 }, "...": {} },
  "fijos": [{ "l": "AME", "v": "TIJ", "azar": true }],
  "resultados": ["Puebla 1-1 León"]
}
```

- Los 18 equipos son obligatorios: `AME TOL QRO CHI LEO ATS CAZ TIJ PUE MTY PAC PUM TIG SAN SLP ATE NEC JUA`.
- `pj` son los partidos jugados (1 a 17) y `pts` los puntos. `dg` (diferencia de gol) es opcional, pero debe venir en los 18 equipos o en ninguno.
- `fijos` son los partidos pendientes que ya se conocen. `azar: true` significa que no se sabe quién es local y se sortea.
- `actualizado` debe ser una fecha con zona horaria. Si el archivo es más viejo que los datos de respaldo de `app.js`, no se usa.
- Si el archivo falta o es inválido, la página usa los datos de respaldo de `app.js` (tabla tras la jornada 11).

## Notas

- Los escudos y logos pertenecen a sus clubes y a la FMF; se incluyen tal como los proporcionó el autor de la página. Los clubes sin archivo de escudo llevan un escudo genérico con su color.
- Las tipografías (Big Shoulders Display, IBM Plex) se cargan desde Google Fonts.
- El himno suena al abrir la página cuando el navegador lo permite; si no, al primer toque. Tiene botón de silencio y volumen.
- Las fuentes de los datos históricos están al final de la página.

## Créditos

Infografía creada por Ing. Mauricio Muñoz Bravo.
