# SIMULADOR MAAT - GitHub Pages V2

Esta versión incluye:

- Pantallas reales renderizadas del PowerPoint MAAT V2.2.16.
- Clic sobre cada pantalla para verla ampliada.
- 10 casos interactivos.
- Calificación automática.
- Resultado por tema.
- Guardado automático en Google Sheets mediante Google Apps Script.

## 1. Subir a GitHub

Sube TODO el contenido de esta carpeta conservando la estructura:

- index.html
- styles.css
- app.js
- google_apps_script.gs
- assets/
  - slides/
    - slide-05.jpg
    - ...

Importante: no subas solo los tres archivos principales. La carpeta `assets` es la que contiene las pantallas del PowerPoint.

## 2. Conectar Google Sheets

### A) Crear la hoja
1. Crea una hoja nueva de Google Sheets.
2. Ponle el nombre que quieras.

### B) Crear Apps Script
1. En la hoja: `Extensiones > Apps Script`.
2. Borra el código que aparezca.
3. Copia todo el contenido de `google_apps_script.gs`.
4. Guarda.
5. En el selector de funciones elige `prepararHoja`.
6. Pulsa `Ejecutar`.
7. Autoriza los permisos de Google.

Esto creará la pestaña `RESULTADOS_MAAT` con los encabezados.

### C) Publicar el receptor
1. En Apps Script pulsa `Implementar`.
2. `Nueva implementación`.
3. Tipo: `Aplicación web`.
4. Ejecutar como: `Yo`.
5. Quién tiene acceso: `Cualquier persona`.
6. Implementar.
7. Copia la URL que TERMINA en `/exec`.

### D) Pegar la URL en el simulador
Abre `app.js` y busca:

```javascript
const GOOGLE_SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
```

Cámbiala por tu URL:

```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/TU_ID/exec";
```

Guarda el archivo y vuelve a subir `app.js` a GitHub.

## 3. Qué se guarda

Cada intento crea una fila con:

- ID único
- Fecha y hora
- Nombre
- Pandape
- Región
- Calificación
- Correctas
- Incorrectas
- Estatus
- Temas a reforzar
- Detalle completo de respuestas

## Importante
Si después modificas `google_apps_script.gs`, debes crear una nueva versión de la implementación para que los cambios queden publicados.
