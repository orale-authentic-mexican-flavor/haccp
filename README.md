# Órale – Authentic Mexican Flavor
## HACCP Documentation Repository

**ORALE - AUTHENTIC MEXICAN FLAVOR LIMITED | CRO: 805512**

---

### ES – Español

Este repositorio contiene los scripts de generación del Plan HACCP y los Formatos de Registro de Órale – Authentic Mexican Flavor Limited, negocio de comida mexicana tradicional con sede en Limerick, Irlanda.

**Modalidad de operación:**
- Preparación en cocina doméstica (Limerick)
- Transporte en condiciones adecuadas (chafing dishes, contenedores isotérmicos)
- Venta en calle (ubicaciones autorizadas por Limerick City & County Council)

**Documentos generados:**
- Plan HACCP completo (ES/EN)
- Formatos de registro standalone (ES/EN)

**Requisitos:**
- Node.js v18 o superior
- npm v9 o superior

**Instalación:**
```bash
npm install
```

**Generación de documentos:**
```bash
npm run generate        # Genera ambas versiones (HTML)
npm run generate:es     # Solo español
npm run generate:en     # Solo inglés
npm run formatos        # Genera los 24 formatos DOCX (docs/docxs/es y docs/docxs/en)
```
Ningún script de generación se ejecuta sin autorización explícita del desarrollador.

**Configuración:**
- `_private/config.js` contiene los datos reales (sensibles) y NO se commitea (gitignored)
- `_private/config.example.js` es la plantilla commiteada: misma estructura, valores genéricos

**Outputs (raíz del repositorio, GitHub Pages publica desde la raíz):**
- `index.html` (redirige a la versión EN)
- `HACCP_Orale_v1.4_ES.html`
- `HACCP_Orale_v1.4_EN.html`
- `docs/docxs/es/HACCP-01_ES.docx` … `HACCP-12_ES.docx`
- `docs/docxs/en/HACCP-01_EN.docx` … `HACCP-12_EN.docx`

**URL pública (GitHub Pages):**
- `https://<usuario-u-organizacion>.github.io/<nombre-repo>/` (placeholder — confirmar con el desarrollador)

**Control de versiones HACCP:**

| Versión | Fecha | Cambios principales |
|---------|-------|---------------------|
| 1.0 | Abril 2026 | Versión inicial |
| 1.1 | Mayo 2026 | Operations & Compliance Manager incorporado |
| 1.2 | Agosto 2026 | Cocina doméstica como premises de preparación |
| 1.3 | Pendiente | Eliminación food truck, formatos integrados, checklist equipamiento |
| 1.4 | 17 de agosto de 2026 | Integración de FSAI Guidance Note 16 (Revision 2). Auditoría de metodología contra los siete principios HACCP del Codex. Incorporación de PCC1b (preparación sin tratamiento térmico posterior) y PCC7 (almacenamiento refrigerado de producto terminado). Nuevos formatos HACCP-10, HACCP-11 y HACCP-12. Separación de modalidades de venta continua y eventual. Armonización de límites críticos, frecuencias de monitoreo y acciones correctivas. Documentación del árbol de decisiones del Codex. |

**Contacto:**
orale.mexican.flavor@gmail.com | +353 89 961 0776

---

### EN – English

This repository contains the generation scripts for the HACCP Plan and Recording Formats of Órale – Authentic Mexican Flavor Limited, a traditional Mexican food business based in Limerick, Ireland.

**Operation model:**
- Preparation in domestic kitchen (Limerick)
- Transport in adequate conditions (chafing dishes, insulated containers)
- Street trading (locations authorised by Limerick City & County Council)

**Generated documents:**
- Full HACCP Plan (ES/EN)
- Standalone recording formats (ES/EN)

**Requirements:**
- Node.js v18 or above
- npm v9 or above

**Installation:**
```bash
npm install
```

**Document generation:**
```bash
npm run generate        # Generates both HTML versions
npm run generate:es     # Spanish only
npm run generate:en     # English only
npm run formatos        # Generates the 24 DOCX formats (docs/docxs/es and docs/docxs/en)
```
No generation script runs without the developer's explicit authorisation.

**Configuration:**
- `_private/config.js` holds the real (sensitive) data and is NOT committed (gitignored)
- `_private/config.example.js` is the committed template: same structure, generic placeholder values

**Outputs (repository root, GitHub Pages serves from the root):**
- `index.html` (redirects to the EN version)
- `HACCP_Orale_v1.4_ES.html`
- `HACCP_Orale_v1.4_EN.html`
- `docs/docxs/es/HACCP-01_ES.docx` … `HACCP-12_ES.docx`
- `docs/docxs/en/HACCP-01_EN.docx` … `HACCP-12_EN.docx`

**Public URL (GitHub Pages):**
- `https://<username-or-org>.github.io/<repo-name>/` (placeholder — confirm with the developer)

**HACCP version control:**

| Version | Date | Main changes |
|---------|------|--------------|
| 1.0 | April 2026 | Initial version |
| 1.1 | May 2026 | Operations & Compliance Manager incorporated |
| 1.2 | August 2026 | Domestic kitchen as preparation premises |
| 1.3 | Pending | Food truck removed, integrated formats, equipment checklist |
| 1.4 | August 17, 2026 | Integration of FSAI Guidance Note 16 (Revision 2). Methodology audit against the seven Codex HACCP principles. Addition of CCP1b (preparation with no subsequent heat treatment) and CCP7 (refrigerated storage of finished product). New formats HACCP-10, HACCP-11 and HACCP-12. Separation of continuous and occasional sale modalities. Harmonisation of critical limits, monitoring frequencies and corrective actions. Documentation of the Codex decision tree. |

**Contact:**
orale.mexican.flavor@gmail.com | +353 89 961 0776
