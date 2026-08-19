# CLAUDE.md

Guía para el asistente de desarrollo (Claude Code) en el repositorio HACCP de **Órale – Authentic Mexican Flavor Limited** (CRO: 805512), un negocio de comida mexicana en Limerick, Irlanda.

## Reglas generales — NUNCA las ignores

- No generar commits, push ni pull requests. El desarrollador los genera manualmente.
- No tocar la rama `main` directamente.
- No generar ningún archivo de output (HTML, DOCX, PDF) sin autorización explícita del desarrollador.
- No ejecutar scripts de generación sin autorización explícita.
- Confirmar cada cambio antes de proceder al siguiente.
- Siempre generar los documentos en dos versiones paralelas: español (ES) e inglés (EN).

## Contexto del negocio

- **Empresa:** ORALE - AUTHENTIC MEXICAN FLAVOR LIMITED, CRO: 805512
- **Cocina de preparación:** Apt 301, Richmond Court, Mount Kennett Place, Dock Road, Limerick V94 PY76
- **Modalidad:** únicamente cocina doméstica + transporte en condiciones adecuadas + venta en calle
- **Sin referencias a "food truck"** en ningún documento
- **Autoridad reguladora:** HSE Environmental Health / FSAI, Premises Ref: 134791
- **Contacto HSE:** Joe Brennan, JoeM.Brennan@hse.ie

## Equipo HACCP

- **Director / HACCP Manager:** Vicente Rodriguez Hernandez
- **Operations & Compliance Manager:** David Enrique Ochoa Diaz
- **Chef / Responsable de Cocina:** Aracely Sansores Gongora

## Cambios pendientes para próxima versión del HACCP (v1.3)

- Versión objetivo: **1.3**
- Eliminar todas las referencias a food truck
- Operations & Compliance Manager: David Enrique Ochoa Diaz (no "Por contratar")
- En tablas de PCCs, cada elemento del monitoreo (¿Qué?, ¿Cómo?, ¿Cuándo?, ¿Quién?) en línea separada
- En celdas con múltiples elementos separados por punto, cada elemento en línea separada
- Aguas frescas retiradas temporalmente del menú
- Agregar Anexo de equipamiento mínimo requerido como checklist operativo
- Todos los formatos HACCP (01-09) integrados en el documento principal
- Generar documento secundario con solo los formatos (standalone)
- Datos sensibles (direcciones, nombres, referencias) en `config.js`, excluido de git

## Formato de outputs

- **Documentos:** HTML (no DOCX)
- **Nombres:**
  - `HACCP_Orale_v1.3_ES.html`
  - `HACCP_Orale_v1.3_EN.html`
- **Formatos standalone:**
  - `HACCP_Formatos_v1.3_ES.html`
  - `HACCP_Formatos_v1.3_EN.html`
- **Paleta de colores Órale:**
  - `#B22222` rojo chile
  - `#006847` verde nopal
  - `#FFD700` amarillo cempasúchil
  - `#0047AB` azul talavera
  - `#FBF6EC` crema

## Estructura del repositorio

Repositorio independiente. GitHub Pages publica desde la **raíz** de la rama.

```
haccp/
├── index.html                    ← redirige a HACCP_Orale_v1.4_EN.html
├── HACCP_Orale_v1.4_ES.html
├── HACCP_Orale_v1.4_EN.html
├── shared/                       ← ubicación única de styles.css y print-pagination.js
│   ├── styles.css                    (se editan aquí directamente, no son copia de nada)
│   └── print-pagination.js
├── docs/
│   └── docxs/{es,en}/            ← 24 formatos DOCX (HACCP-01 a HACCP-12)
├── src/
│   ├── shared/                   ← insumos del generador: solo base.html e i18n.js
│   ├── es/haccp_es.js
│   ├── en/haccp_en.js
│   └── generar_formatos.js
├── _private/
│   ├── config.js                 ← gitignored, datos reales
│   └── config.example.js         ← plantilla commiteada, sin datos reales
├── package.json
├── .gitignore
├── CLAUDE.md
└── README.md
```

**URL pública prevista (GitHub Pages):** `https://<usuario-u-organizacion>.github.io/<nombre-repo>/`
— placeholder pendiente de confirmar con el desarrollador según dónde se aloje el repo.

## Comandos npm

- `npm run generate` — genera ambos HTML (ES y EN) a partir de `src/es/haccp_es.js` y `src/en/haccp_en.js`
- `npm run generate:es` / `npm run generate:en` — genera solo un idioma
- `npm run formatos` — genera los 24 DOCX en `docs/docxs/{es,en}` a partir de `src/generar_formatos.js`

Ninguno de estos scripts se ejecuta sin autorización explícita del desarrollador (ver Reglas generales).

## Convenciones del script

- `_private/config.js` contiene todos los datos sensibles y configurables; NO se commitea (gitignored)
- `_private/config.example.js` es la plantilla commiteada, con la misma estructura y valores genéricos
- Separación clara entre estructura (`src/es/haccp_es.js`, `src/en/haccp_en.js`, `src/generar_formatos.js`) y datos (`_private/config.js`)
- `shared/` en la raíz es la ubicación única y definitiva de `styles.css` y `print-pagination.js` — se editan ahí directamente; no son un artefacto generado ni tienen copia fuente en otro lugar
- `src/shared/` contiene únicamente los insumos que el generador consume para construir el HTML: `base.html` (plantilla) e `i18n.js` (textos ES/EN). El generador ya no copia ningún activo a `shared/`
